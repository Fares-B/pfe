import mongoose from "mongoose";
import { UserModel } from "../models";


export default {
  cget: async (req: any, res: any) => {
    try {
      const users = await UserModel.find({ ...req.query });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Internal issues" });
    }
  },

  post: async (req: any, res: any) => {
    try {
      const user = new UserModel({ ...req.body });
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: "Internal issues" });
    }
  },

  get: async (req: any, res: any) => {
    try {
      const user = await UserModel.findByIdAndUpdate(req.params.id, { ...req.body });
      if (!user) return res.status(403).json({ message: "User not found" });
      res.status(200).json({
        _id: user._id,
        email: user.email,
        phone: user.phone,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (err) {
      
      res.status(400).json({ message: "Internal issues" });
    }
  },

  put: async (req: any, res: any) => {
    try {
      let user = await UserModel.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(req.user.id),
        banned: null,
      }, { ...req.body });

      if (user === null) throw new Error('User not found');

      await user.save();
      res.json({
        user: {
          _id: user._id,
          username: user.username,
          phone: user.phone,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
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
}
