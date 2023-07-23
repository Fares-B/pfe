import express from "express";
import { createToken } from "../lib/jwt";
import { UserController } from "../controllers";
import { UserModel } from "../models";

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
			res.status(401).json({ username: "Invalid credentials" });
		}
	} catch (err) {
		res.status(500).json({ message: "Internal issues" });
	}
});

router.post("/register", UserController.post);

export default router;
