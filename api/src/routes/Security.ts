import express from "express";
import { createToken } from "../lib/jwt";
import { UserController } from "../controllers";
import { UserClass, UserModel } from "../models";

const router = express.Router();


router.post("/login", async (req, res) => {
	try {
		const user: UserClass = await UserModel.findOne({
			phone: req.body.phone,
		});

		if (user && (await user.comparePassword(req.body.password))) {
			const token = createToken(user);
			res.json({ token });
		} else {
			res.status(401).json({ username: "Invalid credentials" });
		}
	} catch (err) {
		console.error(err.message);
		res.status(400).json({ message: "Internal issues" });
	}
});

router.post("/register", UserController.post);

export default router;
