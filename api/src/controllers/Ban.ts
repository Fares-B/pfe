import mongoose from "mongoose";
import { UserModel } from "../models";
import { bannedReasonEnum } from "../models/type";


export default {
  cget: async (req: any, res: any) => {
    try {
      const users = await UserModel.find({ ...req.query, banned: { $ne: null } });
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json({ message: "Internal issues" });
    }
  },

  post: async (req: any, res: any) => {
    const reason: bannedReasonEnum|null = req.body.reason;
    try {
      const user = await UserModel.findOne({
        _id: new mongoose.Types.ObjectId(req.params.id),
        banned: null,
      });
      if (user === null || reason === null) throw new Error('User not found');
      user.banned = { reason, date: new Date() };
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: "Internal issues" });
    }
  },

  get: async (req: any, res: any) => {
    try {
      const user = await UserModel.findOne({
        _id: new mongoose.Types.ObjectId(req.params.id),
        //banned not equals null
        banned: { $ne: null },
      });
      if (!user) return res.status(400).json({ message: "User not found" });
      // banned info
      res.status(200).json({
        _id: user._id,
        username: user.username,
        reason: user.banned.reason,
        date: user.banned.date,
      });
    } catch (err) {
      
      res.status(400).json({ message: "Internal issues" });
    }
  },

  delete: async (req: any, res: any) => {
    try {
      const user = await UserModel.findOne({
        _id: new mongoose.Types.ObjectId(req.params.id),
        banned: { $ne: null },
      });
      if (user === null) throw new Error('User not found');
      user.banned = null;
      await user.save();
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ message: "Internal issues" });
    }
  },
}