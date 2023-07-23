import mongoose from "mongoose";
import { Request, Response } from "../interfaces/express";
import logger from "../lib/logger";
import { ProductModel } from "../models";
import {
	USER_ROLE,
	MESSAGE_ERROR,
} from "../models/type";


function getQueryVerifyWithRole(role: string) {
	if (role !== USER_ROLE.MODERATOR) {
		return {
			deleted: false,
			visible: true,
			verified: true,
		};
	}
	return {};
}

export default {
	cget: async (req: Request, res: Response) => {
		try {
			const products = await ProductModel.find({
				...req.query,
				...getQueryVerifyWithRole(req?.user?.role)
			});
			res.json({
				data: products,
				total: products.length,
			});
		} catch (err) {
			res.status(500).json({ message: "Internal issues" });
		}
	},

	get: async (req: Request, res: Response) => {
		try {
			const product = await ProductModel
				.findOne({ _id: req.params.id, ...getQueryVerifyWithRole(req?.user?.role) })
				.populate("comments");
			if (!product) throw new Error("Product not found");
			res.status(200).json(product);
		} catch ({ message }) {
			logger().info(message);
			if (message === "Product not found")
				return res.status(404).json({ message });
			res.status(500).json({ message: "Internal issues" });
		}
	},

	post: async (req: Request, res: Response) => {
		try {
			const author = {
				id: req.user.id,
				username: req.user.username,
				image: req.user.image,
			};
			const product = new ProductModel({ ...req.body, author });
			const error = product.validateSync();
			if (error) throw new Error(MESSAGE_ERROR.FIELDS_REQUIRED_OR_INVALID);
			await product.save();
			res.status(201).json({ data: product });
		} catch ({ message }) {
			if (message === MESSAGE_ERROR.FIELDS_REQUIRED_OR_INVALID)
				return res.status(400).json({ message });
			res.status(500).json({ message: "Internal issues" });
		}
	},

	put: async (req: Request, res: Response) => {
		try {
			const product = await ProductModel.findOneAndUpdate(
				{ _id: new mongoose.Types.ObjectId(req.params.id) },
				{ ...req.body },
			);
			if (!product) throw new Error("Product not found");
			const error = product.validateSync();
			if (error) throw new Error(MESSAGE_ERROR.FIELDS_REQUIRED_OR_INVALID);
			await product.save();
			res.json({ data: product });
		} catch (err) {
			if (err.message === MESSAGE_ERROR.FIELDS_REQUIRED_OR_INVALID)
				return res.status(400).json({ message: err.message });
			res.status(500).json({ message: "Internal issues" });
		}
	},

	delete: async (req: Request, res: Response) => {
		try {
			const product = await ProductModel.findOneAndUpdate(
				{
					_id: new mongoose.Types.ObjectId(req.params.id),
					deleted: false,
				},
				{ deleted: true },
			);
			if (!product) throw new Error("Product not found");
			res.status(204).end();
		} catch (err) {
			res.status(500).json({ message: "Internal issues" });
		}
	},
};
