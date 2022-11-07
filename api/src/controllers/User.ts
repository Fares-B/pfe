import mongoose from "mongoose";
import { Request, Response } from "../interfaces/express";
import logger from "../lib/logger";
import { UserModel } from "../models";
import { USER_ROLE } from "../models/type";

export default {
	cget: async (req: Request, res: Response) => {
		try {
			// not current user and not admin
			const users = await UserModel.find({
				...req.query,
				_id: { $ne: req.user.id },
				role: { $ne: USER_ROLE.ADMIN },
			});
			res.json({
				data: users,
				total: users.length,
			});
		} catch (err) {
			res.status(500).json({ message: "Internal issues" });
		}
	},

	post: async (req: Request, res: Response) => {
		const urlPath = req.originalUrl;
		try {
			const user = new UserModel({ ...req.body });
			await user.save();
			if (urlPath === "/register")
				logger().info({
					message: `User ${user._id} registered`,
					labels: { user: "register" },
				});
			res.status(201).json(user);
		} catch (err) {
			// logger().error(err);
			if (urlPath === "/register")
				logger().error({
					message: `User ${req.body.phone} failed to register`,
					labels: { user: "register" },
				});
			res.status(400).json({ message: "Internal issues" });
		}
	},

	get: async (req: Request, res: Response) => {
		try {
			let userId = req.params.id;
			if (!req.params.id) userId = req.user.id;

			const user = await UserModel.findById(userId);

			if (!user) throw new Error("User not found");

			res.status(200).json(user);
		} catch (err) {
			if (err.message) return res.status(400).json({ message: err.message });
			res.status(400).json({ message: "Internal issues" });
		}
	},

	put: async (req: Request, res: Response) => {
		try {
			const user = await UserModel.findOneAndUpdate(
				{
					_id: new mongoose.Types.ObjectId(req.user.id),
				},
				{ ...req.body },
			);

			if (user === null) throw new Error("User not found");

			await user.save();
			res.json({
				data: user,
			});
		} catch (err) {
			res.status(500).json({ message: "Internal issues" });
		}
	},

	// delete: async (req, res) => {
	//   try {
	//     const user = await UserModel.findOne({
	//       _id: mongoose.Types.ObjectId(req.params.id),
	//       userType: req.user.userType,
	//       deleted: false,
	//     });
	//     if (user === null) throw new Error('User not found');
	//     user.deleted = true;
	//     await order.save();
	//     res.status(204).end();
	//   } catch (err) {
	//     res.status(500).json({ message: err.message });
	//   }
	// },
};
