import mongoose from "mongoose";
import { Request, Response } from "../interfaces/express";
import db from "../lib/db";
import { ReportModel, UserModel } from "../models";
import { bannedReasonEnum } from "../models/type";

export default {
	cget: async (req: Request, res: Response) => {
		try {
			const users = await UserModel.find({
				...req.query,
				banned: { $ne: null },
			});

			res.json({
				data: users,
				total: users.length,
			});
		} catch (err) {
			res.status(400).json({ message: "Internal issues" });
		}
	},
	post: async (req: Request, res: Response) => {
		const session = await db.startSession();


		const reason: bannedReasonEnum | null = req.body.reason;
		const userId = new mongoose.Types.ObjectId(req.params.id)
		try {
			session.startTransaction();

			const user = await UserModel.findOne({
				_id: userId,
				banned: null,
			}, null, { session });
			if (user === null || reason === null) throw new Error("User not found");
			
			// aggregate find all reports with user id
			const reports = await ReportModel.aggregate([
				{
					$match: {
						resolved: false,

						// $or: [
							// { userId: userId },
							// { commentId: userId },
						// ],
					},
				},
				// populate with commentId
				{
					$lookup: {
						from: "comments",
						localField: "commentId",
						foreignField: "_id",
						as: "comment",
					},
				},
			], { session });

			// update all reports with user id
			for (const report of reports) {
				if (userId.equals(report.userId)) {
					report.resolved = true;
				}
				else if (report.comment.length > 0 && userId.equals(report.comment[0].user.id)) {
					report.resolved = true;
				}
				if (report.resolved) {
					await ReportModel.updateOne({ _id: report._id }, { resolved: true }, { session });
				}
			}
			user.banned = { reason, date: new Date() };
			user.allBans.push(user.banned);
			await user.save();
			await session.commitTransaction();
			res.status(201).json({ data: user });
		} catch (err) {
			await session.abortTransaction();
			console.error(err);
			res.status(400).json({ message: "Internal issues" });
		}
		session.endSession();
	},
	get: async (req: Request, res: Response) => {
		try {
			const user = await UserModel.findOne({
				_id: new mongoose.Types.ObjectId(req.params.id),
				banned: { $ne: null }, // not equals null
			});
			if (!user) return res.status(400).json({ message: "User not found" });

			// const data = {...};
			res.json(user)
			// res.json({ data });
		} catch (err) {
			res.status(400).json({ message: "Internal issues" });
		}
	},
	put: async (req: Request, res: Response) => {
		try {
			const user = await UserModel.findOne({
				_id: new mongoose.Types.ObjectId(req.params.id),
				banned: { $ne: null },
			});
			if (user === null) throw new Error("User not found");
			user.allBans.push({
				reason: user.banned.reason,
				date: user.banned.date,
				unbanDate: new Date(),
			});
			user.banned = null;
			await user.save();
			res.json({ data: { id: user._id } });
		} catch (err) {
			res.status(400).json({ message: "Internal issues" });
		}
	},
	delete: async (req: Request, res: Response) => {
		try {
			const user = await UserModel.findOne({
				_id: new mongoose.Types.ObjectId(req.params.id),
				banned: { $ne: null },
			});
			if (user === null) throw new Error("User not found");
			user.banned = null;
			await user.save();
			res.status(204).end();
		} catch (err) {
			res.status(400).json({ message: "Internal issues" });
		}
	},
};
