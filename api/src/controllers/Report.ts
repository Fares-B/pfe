import mongoose from "mongoose";
import logger from "../lib/logger";
import { Request, Response } from "../interfaces/express";
import { ProductModel, CommentModel, UserModel } from "../models";
import { bannedReasonEnum, ReportType } from "../models/type";

// next feature: add report min query param
const REPORT_MIN = 1;

function getReports(docs: any[], type: string, reportMin: number = REPORT_MIN) {
	const datas = [];
	const doc_reports = docs.filter((doc) => doc.reports.map((r: ReportType) => r.resolved === false).length >= reportMin);

	for (const doc of doc_reports) {
		let item: any = {
			id: doc._id,
			type,
			reports: [],
			content: "",
		};
		if(type === "comment"|| type === "user") {
			item.user = doc.user;
		}
		if(type === "user") {
			item.content = doc.user.username;
		}
		if(type === "comment") {
			item.content = doc.content;
		}
		if(type === "product") {
			item.content = doc.name;
		}
		for (const report of doc.reports) {
			if (report.resolved === false) {
				item.reports.push({
					why: report.why,
					by: report.by,
					createdAt: report.createdAt,
				});
			}
		}
		datas.push(item);
	}
	return datas;
}

export default {
	cget: async (req: Request, res: Response) => {
		try {
			const { type, id = null, user: userId = null } = req.query;
			delete req.query.type;
			delete req.query.id;
			delete req.query.user;
			const filter: any = {
				...req.query,
				// return only with report length > 0
				reports: { $gt: [] },
			};
			if (id !== null && typeof id === "string")
				filter._id = new mongoose.Types.ObjectId(id);
			if (userId !== null && typeof userId === "string")
				filter["reports.user.id"] = new mongoose.Types.ObjectId(userId);

			const aggregate = [
				{ $match: filter },
				// { $unwind: "" },
				// { $group: { _id: "$_id", reports: { $push: "" } } },
			];
			// aggregate to get only subfield of reports on each document and add field type of document
			let data = [];
			switch (type) {
			case "products":
				const products = await ProductModel.aggregate(aggregate);
				data = getReports(products, "product");
				break;
			case "comments":
				const comments = await CommentModel.aggregate(aggregate);
				data = getReports(comments, "comment");
				break;
			case "users":
				const users = await UserModel.aggregate(aggregate);
				data = getReports(users, "user");
				break;
			default:
				const products2 = await ProductModel.aggregate(aggregate);
				const comments2 = await CommentModel.aggregate(aggregate);
				const users2 = await UserModel.aggregate(aggregate);
				data = [
					...getReports(comments2, "comment"),
					...getReports(users2, "user"),
					...getReports(products2, "product"),
				];
				break;
			}
			// order data by report createdAt
			data = data.sort((a, b) => a.createdAt - b.createdAt);
			res.json({
				data: data,
				total: data.length,
			});
		} catch (error) {}
	},
	post: async (req: Request, res: Response) => {
		try {
			const { type, id, why } = req.body;
			if (!type || !id || !why) throw new Error("Missing id or type or why");
			// if why not in enum
			if (!Object.values(bannedReasonEnum).includes(why))
				throw new Error("Invalid reason for report");

			const user = await UserModel.findById(req.user.id);
			if (!user) throw new Error("User not found for post comment");

			let document;
			switch (type) {
			case "products":
				document = await ProductModel.findById(id);
				break;
			case "comments":
				document = await CommentModel.findById(id);
				// if (document && document.user.id.equals(user._id)) throw new Error("You can't report your own comment");
				break;
			case "users":
				document = await UserModel.findById(id);
				if (document && document._id.equals(user._id))
					throw new Error("You can't report yourself");
				break;
			}
			if (!document) throw new Error(`Document ${type} not found`);
			const report = {
				user: {
					id: user._id,
					username: user.username,
				},
				why,
				createdAt: new Date(),
				resolved: false,
			};
			document.reports.push(report);
			await document.save();
			res.status(201).json({
				data: document,
			});
		} catch (error) {
			console.log(error);
			if (error.message)
				return res.status(400).json({ message: error.message });
			res.status(400).json({ message: "Internal issues" });
		}
	},
	get: async (req: Request, res: Response) => {},
	put: async (req: Request, res: Response) => {},
	delete: async (req: Request, res: Response) => {},
};
