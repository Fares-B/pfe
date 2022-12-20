import mongoose from "mongoose";
import { Request, Response } from "../interfaces/express";
import logger from "../lib/logger";
import { sendRateToArduino } from "../middlewares/qrcode";
import { ProductModel } from "../models";
import { USER_ROLE } from "../models/type";

export default {
	cget: async (req: Request, res: Response) => {
		// if moderator, return all products else return only products with deleted = false
		const options =
      req.user.role === USER_ROLE.MODERATOR ? {} : { deleted: false };
		try {
			const products = await ProductModel.find({ ...req.query, ...options });
			res.json({
				data: products,
				total: products.length,
			});
		} catch (err) {
			res.status(500).json({ message: "Internal issues" });
		}
	},

	post: async (req: Request, res: Response) => {
		try {
			const product = new ProductModel({ ...req.body });
			await product.save();
			res.status(201).json({
				data: product,
			});
		} catch (err) {
			res.status(400).json({ message: "Internal issues" });
		}
	},

	get: async (req: Request, res: Response) => {
		const { id, barcode = null } = req.params;
		try {
			// product_name_fr
			// quantity
			// brands

			// selected_images.front.display.fr
			// selected_images.front.thumb.fr
			let product = null;
			// find and populate comments
			const result = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
				.then((res) => res.json());
			res.json(result);
				// if (barcode) {
			// 	product = await ProductModel.findOne({ barcode }).populate("comments");
			// } else {
			// 	product = await ProductModel.findById(id).populate("comments");
			// }
			// if (!product)
			// 	return res.status(403).json({ message: "Product not found" });
			// sendRateToArduino(Math.round(product.rate));
			// res.status(200).json(product);
		} catch (err) {
			logger().info(err);
			res.status(400).json({ message: "Internal issues" });
		}
	},

	put: async (req: Request, res: Response) => {
		try {
			const product = await ProductModel.findOneAndUpdate(
				{
					_id: new mongoose.Types.ObjectId(req.params.id),
				},
				{ ...req.body },
			);

			if (product === null) throw new Error("Product not found");

			await product.save();
			res.json({
				data: product,
			});
		} catch (err) {
			res.status(400).json({ message: "Internal issues" });
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
			if (product === null) throw new Error("Product not found");
			res.status(204).end();
		} catch (err) {
			res.status(400).json({ message: "Internal issues" });
		}
	},
};
