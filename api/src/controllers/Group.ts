import mongoose from "mongoose";
import { Request, Response } from "../interfaces/express";
import db from "../lib/db";
import { CommentModel, ProductModel, GroupModel, UserModel } from "../models";


export default {
  cget: async (req: Request, res: Response) => {
    try {
      const groups = await GroupModel.find({ ...req.query });
      res.json({
        data: groups,
        total: groups.length,
      });
    } catch (err) {
      let message = "Internal issues";
      if (err.message) message = err.message;
      res.status(400).json({ message });
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const group = await GroupModel.findById(req.params.id);
      if (!group) throw new Error("Group not found");
      res.status(200).json(group);
    } catch (err) {
      let message = "Internal issues";
      if (err.message) message = err.message;
      res.status(400).json({ message });
    }
  },
  post: async (req: Request, res: Response) => {
    const session = await db.startSession();
    try {
      session.startTransaction();
      const { name } = req.body;
      const _group = new GroupModel({ name }, { session });
      await _group.validate();
      await _group.save();

      await session.commitTransaction();
      res.status(201).json(_group);
    } catch (err) {
      await session.abortTransaction();
      let message: string = "Internal issues";
      if (err.message) message = err.message;
      res.status(400).json({ message });
    }
    session.endSession();
  },
  put: async (req: Request, res: Response) => {
    const session = await db.startSession();
    try {
      session.startTransaction();
      const { name: nextName } = req.body;
      if (!nextName) throw new Error("Name is required in body");

      const _group = await GroupModel.findOne(
        {
          _id: new mongoose.Types.ObjectId(req.params.id),
        },
        null,
        { session },
      );
      if (!_group) throw new Error("Group not found or you are not owner");
      _group.name = nextName;
      await _group.validate();
      await _group.save();

      await session.commitTransaction();
      res.status(200).json(_group);
    } catch (err) {
      await session.abortTransaction();
      let message: string = "Internal issues";
      if (err.message) message = err.message;
      res.status(400).json({ message });
    }
    session.endSession();
  },
  delete: async (req: Request, res: Response) => {
    const session = await db.startSession();
    try {
      session.startTransaction();
      const _group = await GroupModel.findById(req.params.id, null, { session });
      if (!_group) throw new Error("Group not found");
      await _group.remove();
      await session.commitTransaction();
      res.status(200).json(_group);
    } catch (err) {
      await session.abortTransaction();
      let message: string = "Internal issues";
      if (err.message) message = err.message;
      res.status(400).json({ message });
    }
    session.endSession();
  },
};

