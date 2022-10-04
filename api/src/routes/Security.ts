import { createToken } from "../lib/jwt";
import { UserController } from "../controllers";
import { UserClass, UserModel } from "../models";
import express from 'express';
const router = express.Router();

router.get("/", (req, res) => { res.json("ok") });

router.post("/login", async (req, res) => {
  try {
    const user: UserClass = await UserModel.findOne({ email: req.body.email, banned: null });

    if (user && (await user.comparePassword(req.body.password))) {
      const token = createToken(user);
      res.json({ token });
    } else {
      res.status(401).json({ username: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/register", UserController.post);

export default router;
