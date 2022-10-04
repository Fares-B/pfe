import mongoose from "mongoose";
import { UserModel } from "../models";


export default {
  cget: async (req: any, res: any) => {
    try {
      const users = await UserModel.find({ ...req.body, banned: null });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  post: async (req: any, res: any) => {
    res.json("ok");
    // try {
    //   const userData = { username: req.body.username, email: req.body.email, phone: req.body.phone, password: req.body.password };
    //   console.log("passed 1");
    //   const user = new UserModel(userData);
    //   console.log("passed 2");
    //   await user.savePassword(req.body.password);
    //   console.log("passed 3");
    //   await user.save();
    //   console.log("passed 4");
    //   res.status(201).json(user);
    // } catch (err) {
    //   res.status(500).json({ message: err.message });
    // }
  },

  get: async (req: any, res: any) => {
    return res.json(req.user);
    try {
      const user = await UserModel.findOne({
        _id: new mongoose.Types.ObjectId(req.user._id),
        deleted: null,
      });
      if (!user) {
        return res.status(403).json({ message: "User not found" });
      }
      res.json({
        _id: user._id,
        email: user.email,
        phone: user.phone,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  put: async (req: any, res: any) => {
    try {
      let user = await UserModel.findOne({
        _id: new mongoose.Types.ObjectId(req.user.id),
        banned: null,
      });

      if (user === null) throw new Error('User not found');
      if (req.body.username) user.username = req.body.username;
      if (req.body.phone) user.phone = req.body.phone;
      if (req.body.email) user.email = req.body.email;
      if (req.body.password) user.savePassword(req.body.password);

      user.updatedAt = new Date();

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
      res.status(500).json({ message: err.message });
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
  ban: async (req: any, res: any) => {
    const { reason, id } = req.body;
    try {
      const user = await UserModel.findOne({
        _id: new mongoose.Types.ObjectId(id),
        banned: null,
      });
      if (user === null) throw new Error('User not found');
      user.banned = {
        reason: reason,
        date: new Date(),
      };
      await user.save();
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
}
