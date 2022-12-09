import mongoose from "mongoose";
import logger from "../lib/logger";
import { Request, Response } from "../interfaces/express";
import { UserModel, ReportModel, ProductModel, CommentModel } from "../models";
import { bannedReasonEnum, docTypeEnum } from "../models/type";

// next feature: add report min query param
const REPORT_MIN = 1;
enum actionEnum {
	DELETE = "delete",
	FREE = "free",
	BAN = "ban",
}

export default {
	cget: async (req: Request, res: Response) => {
		try {
			const reports = await ReportModel.aggregate([
				{
					$match: {
						resolved: false,
					},
				},
				{
					$group: {
						_id: {
							documentId: "$documentId",
							documentType: "$documentType",
						},
						reason: {
							$push: "$reason",
						},
						count: {
							$sum: 1,
						},
					},
				},
				{
					$match: {
						count: {
							$gte: REPORT_MIN,
						},
					},
				},
				{
					$project: {
						_id: 0,
						id: "$_id.documentId",
						documentType: "$_id.documentType",
						reason: 1,
						count: 1,
					},
				},
			]);

			res.json({
				data: reports,
				total: reports.length,
			});
		} catch (error) {
			// logger().error(error);
			console.log(error);
			res.status(400).json({ message: "Internal issues" });
		}
	},
	get: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			// const { type } = req.query;
			if(!id) throw new Error("Invalid params");
			const filter = {
				documentId: id,
				resolved: false,
			};
			const _reports = await ReportModel.find(filter);
			if (!_reports || _reports.length <= 0) throw new Error("Report not found");
			let document: any = { id, reports: _reports };
			const type = _reports[0].documentType;
			if(type === docTypeEnum.PRODUCT) {
				const _product = await ProductModel.findById(id);
				if(!_product) throw new Error("Product not found");
				document = { ...document, ..._product.toJSON() };
			} else if(type === docTypeEnum.USER) {
				const _user = await UserModel.findById(id);
				if(!_user) throw new Error("User not found");
				document = {
					...document,
					..._user.toJSON(),
					user: { id: _user._id, username: _user.username}
				};
			} else if (type === docTypeEnum.COMMENT) {
				const _comment = await CommentModel.findById(id);
				if(!_comment) throw new Error("Comment not found");
				document = { ...document, ..._comment.toJSON() };
			}
			res.json(document);
		} catch (error) {
			console.log(error);
			let message = "Internal issues";
			if (error.message === "Report not found") message = error.message;
			res.status(400).json({ message });
		}
	},
	post: async (req: Request, res: Response) => {
		try {
			const { id, type, reason } = req.body;
			if (!id || !type || !reason) throw new Error("Missing reason or type or id");
			// if reason not in enum
			if (!Object.values(bannedReasonEnum).includes(reason))
				throw new Error("Invalid reason for report");

			const _userConnected = await UserModel.findById(req.user.id);
			if (!_userConnected) throw new Error("User not found for post report");

			const report = new ReportModel({
				reason,
				who: {
					id: _userConnected._id,
					username: _userConnected.username,
					image: _userConnected.image
				},
				documentType: type,
				documentId: new mongoose.Types.ObjectId(id),
				// productId, commentId, userId
				[type + "Id"]: new mongoose.Types.ObjectId(id),
			});

			await report.save();
			res.status(201).json({
				data: report,
			});
		} catch (error) {
			console.log(error);
			if (error.message)
				return res.status(400).json({ message: error.message });
			res.status(400).json({ message: "Internal issues" });
		}
	},
	put: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { action = "delete" } = req.body;
			// if action not in enum
			if (!id) throw new Error("Invalid params");
			if (!Object.values(actionEnum).includes(action)) throw new Error("Invalid action");			

			const reportsDoc = await ReportModel.find({ documentId: id });
			if (!reportsDoc) throw new Error("Report not found");


		
			switch (action) {
				case actionEnum.DELETE:
					await ReportModel.deleteMany({
						documentId: id,
						resolved: false,
					});
					break;
				case actionEnum.FREE:
					await ReportModel.updateMany(
						{ documentId: id, resolved: false },
						{ resolved: true }
					);
					break;
			}
			res.json({ data: { id } });
		} catch (error) {
			if (error.message)
				return res.status(400).json({ message: error.message });
			res.status(400).json({ message: "Internal issues" });
		}
	},
	delete: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const report = await ReportModel.findByIdAndDelete(id);
			if (!report) throw new Error("Report not found");
			res.json(report);
		} catch (error) {
			if (error.message)
				return res.status(400).json({ message: error.message });
			res.status(400).json({ message: "Internal issues" });
		}
	},
};
