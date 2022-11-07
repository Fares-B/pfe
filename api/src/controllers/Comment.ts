import mongoose from "mongoose";
import logger from "../lib/logger";
import { Request, Response } from "../interfaces/express";
import { CommentModel, ProductModel, UserModel } from "../models";
import { USER_ROLE } from "../models/type";

export default {
	cget: async (req: Request, res: Response) => {
		// if moderator, return all comments else return only comments with deleted = false
		const options =
      req.user.role === USER_ROLE.MODERATOR ? {} : { deleted: false };
		try {
			const comments = await CommentModel.find({ ...req.query, ...options });
			res.json({
				data: comments,
				total: comments.length,
			});
		} catch (err) {
			res.status(500).json({ message: "Internal issues" });
		}
	},

	post: async (req: Request, res: Response) => {
		try {
			const user = await UserModel.findById(req.user.id);
			if (!user) throw new Error("User not found for post comment");

			const product = await ProductModel.findById(req.body.productId);
			if (!product) throw new Error("Product Id not found for post comment");

			const comment = new CommentModel({
				user: {
					id: user._id,
					username: user.username,
				},
				...req.body,
			});
			await comment.save();

			product.comments.push(comment._id);
			await product.save();

			res.status(201).json({
				data: comment,
			});
		} catch (err) {
			res.status(400).json({ message: "Internal issues" });
		}
	},

	get: async (req: Request, res: Response) => {
		try {
			const comment = await CommentModel.findById(req.params.id);
			if (!comment) throw new Error("Comment not found");
			res.status(200).json(comment);
		} catch (err) {
			logger().info(err);
			res.status(400).json({ message: "Internal issues" });
		}
	},

	put: async (req: Request, res: Response) => {
		try {
			const comment = await CommentModel.findOneAndUpdate(
				{
					_id: new mongoose.Types.ObjectId(req.params.id),
				},
				{ ...req.body },
			);

			if (comment === null) throw new Error("Comment not found");

			await comment.save();
			res.json({
				data: comment,
			});
		} catch (err) {
			res.status(400).json({ message: "Internal issues" });
		}
	},

	delete: async (req: Request, res: Response) => {
		try {
			const comment = await CommentModel.findOneAndRemove({
				_id: new mongoose.Types.ObjectId(req.params.id),
			});
			if (comment === null) throw new Error("Comment not found");
			// and remove comment from product
			await ProductModel.findOneAndUpdate(
				{
					_id: comment.productId,
				},
				{ $pull: { comments: comment._id } },
			);
			res.status(204).end();
		} catch (err) {
			res.status(400).json({ message: "Internal issues" });
		}
	},
};
