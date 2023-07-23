import mongoose from "mongoose";
import logger from "../lib/logger";
import { Request, Response } from "../interfaces/express";
import { CommentModel, ProductModel, UserModel } from "../models";
import { USER_ROLE } from "../models/type";
import db from "../lib/db";


const COMMENT_NOT_FOUND_STRING = "Comment not found";


export default {
	cget: async (req: Request, res: Response) => {
		// if moderator, return all comments else return only comments with deleted = false
		const isModerator = req.user.role === USER_ROLE.MODERATOR
		let filter: any = {};

		if (req.query.userId && typeof req.query.userId === "string") {

			filter["user.id"] = new mongoose.Types.ObjectId(req.query.userId);
		}
		console.log("FILTER", filter);

		try {
			// console.log("QUERY", filter);
		
			// const comments = await CommentModel.find({ ...req.query, ...options });
			const comments = await CommentModel.aggregate([
				{
					$match: {
						// if is moderator, return all comments else return only comments with deleted = false

						...filter,
					},
				},
				// group by date and add field count equals to all comments
				{
					$group: {
						_id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
						comments: { $push: "$$ROOT" },
						sum: { $sum: 1 },
					},
				},
				// replace _id with id
				{
					$project: {
						_id: 0,
						id: "$_id",
						comments: 1,
						sum: 1,
					},
				},
			]);

			res.json({
				data: comments,
				total: comments.length,
			});
		} catch (err) {
			res.status(500).json({ message: "Internal issues" });
		}
	},
	get: async (req: Request, res: Response) => {
		try {
			const comment = await CommentModel.findById(req.params.id);
			if (!comment) throw new Error(COMMENT_NOT_FOUND_STRING);
			res.status(200).json(comment);
		} catch (err) {
			let message = "Internal issues";
			if (err.message === COMMENT_NOT_FOUND_STRING) message = err.message;
			res.status(400).json({ message });
		}
	},
	post: async (req: Request, res: Response) => {
		const session = await db.startSession();
		try {
			session.startTransaction();
			const user = await UserModel.findById(req.user.id);
			if (!user) throw new Error("User not found for post comment");

			const product = await ProductModel.findById(req.body.productId, null, { session });
			if (!product) throw new Error("Product Id not found for post comment");

			const comment = new CommentModel({
				user: {
					id: user._id,
					username: user.username,
				},
				...req.body,
			}, { session });
			await comment.save();

			product.comments.push(comment._id);
			await product.save();

			await session.commitTransaction();
			res.status(201).json({
				data: comment,
			});
		} catch (err) {
			await session.abortTransaction();
			let message = "Internal issues";
			if (err.message) message = err.message;
			res.status(400).json({ message });
		}
		session.endSession();
	},
	put: async (req: Request, res: Response) => {
		try {
			const comment = await CommentModel.findOneAndUpdate(
				{ _id: req.params.id },
				{ ...req.body },
			);

			if (comment === null) throw new Error(COMMENT_NOT_FOUND_STRING);

			await comment.save();
			res.json({
				data: comment,
			});
		} catch (err) {
			let message = "Internal issues";
			if (err.message === COMMENT_NOT_FOUND_STRING) message = err.message;
			res.status(400).json({ message: "Internal issues" });
		}
	},
	delete: async (req: Request, res: Response) => {
		const session = await mongoose.startSession();
		try {
			session.startTransaction();
			const comment = await CommentModel.findOneAndRemove({
				_id: new mongoose.Types.ObjectId(req.params.id),
			}, { session });
			if (comment === null) throw new Error(COMMENT_NOT_FOUND_STRING);
			// and remove comment from product
			await ProductModel.findOneAndUpdate(
				{ _id: comment.productId },
				{ $pull: { comments: comment._id } },
				{ session },
			);
			await session.commitTransaction();
			res.status(204).end();
		} catch (err) {
			await session.abortTransaction();
			let message = "Internal issues";
			if (err.message === COMMENT_NOT_FOUND_STRING) message = err.message;
			res.status(400).json({ message });
		}
		session.endSession();
	},
};
