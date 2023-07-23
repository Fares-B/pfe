import express from "express";
import { createToken } from "../lib/jwt";
import { UserController } from "../controllers";
import { ForgotPasswordModel, UserModel } from "../models";
import { generateCodeNumeric } from "../lib/functions";

const router = express.Router();

router.post("/login", async (req, res) => {
	try {
		const {
			username = null,
			email = null,
			phone = null,
		} = req.body;

		const user = await UserModel.findOne({
			banned: null,
			$or: [
				{ username },
				{ email },
				{ phone },
			],
		});

		if (user && (await user.comparePassword(req.body.password))) {
			const token = createToken(user);
			user.lastLogin = new Date();
			await user.save();
			res.json({ token });
		} else {
			res.status(401).json({ message: "Invalid credentials" });
		}
	} catch (err) {
		res.status(500).json({ message: "Internal issues" });
	}
});

router.post("/register", UserController.post);

router.post("/forgot-password", async (req, res) => {
	try {
		const { email } = req.body;
		// find user with email
		const user = await UserModel.findOne({ email });
		if (!user) { return res.status(404).json({ message: "User not found" }); }
		// generate reset password code
		const code = generateCodeNumeric();
		// save reset password code with email
		const forgotPassword = new ForgotPasswordModel({
			code,
			email,
			expiredAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiration time
		});

		await forgotPassword.save();

		console.log("code", code);
		// A FAIRE
		// send email with code to reset password
		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ message: "Internal issues" });
	}
});

router.post("/reset-password", async (req, res) => {
	try {
		const { email, code, password } = req.body;
	
		// find last reset password code with email and expiredAt > now
		const forgotPassword = await ForgotPasswordModel.findOne({
			email,
			code,
			expiredAt: { $gt: new Date() },
		});
		if (!forgotPassword) { return res.status(404).json({ message: "Code not found" }); }

		// find user with email
		const user = await UserModel.findOne({ email });
		if (!user) { return res.status(404).json({ message: "User not found" }); }

		await user.save();
	
		// remove all reset password codes with email
		// await ForgotPasswordModel.remove({ email });

		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ message: "Internal issues" });
	}
});

export default router;
