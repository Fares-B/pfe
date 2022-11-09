import mongoose from "mongoose";
import { Request, Response } from "../interfaces/express";
import db from "../lib/db";
import { CommentModel, ProductModel, RateModel, UserModel } from "../models";


export default {
  cget: async (req: Request, res: Response) => {
    try {
      const rates = await RateModel.find({ ...req.query });
      res.json({
        data: rates,
        total: rates.length,
      });
    } catch (err) {
      let message = "Internal issues";
      if (err.message) message = err.message;
      res.status(400).json({ message });
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const rate = await RateModel.findById(req.params.id);
      if (!rate) throw new Error("Rate not found");
      res.status(200).json(rate);
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
      const { productId = null, commentId = null, rate = null } = req.body;
      const _user = await UserModel.findById(req.user.id);
      if (!_user) throw new Error("User not found");
      const _rate = new RateModel({
        rate,
        productId,
        commentId,
        user: {
          id: _user._id,
          username: _user.username,
          image: _user.image,
        },
      }, { session });
      if(productId){
        if(rate > 5 || rate < 1) throw new Error("Rate must be between 1 and 5");
        await ProductModel.findByIdAndUpdate(productId, {
          $inc: { rate: _rate.rate, userRated: 1 },
        }, { session });
      }
      else if( commentId){
        if(rate !== 1 && rate !== -1) throw new Error("Rate must be 1 or -1");
        const _comment = await CommentModel.findById(commentId, null, { session });
        if(!_comment) throw new Error("Comment not found");
        if(_comment.user.id.toString() === req.user.id.toString()) throw new Error("You can't rate your comment");
        _comment.rate += rate;
        _comment.userRated += 1;
        await _comment.save();
      }
      
      await _rate.save();
      await session.commitTransaction();
      res.status(201).json(_rate);
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
      const { rate: nextRate } = req.body;
      if(!nextRate) throw new Error("Rate is required in body");

      const _rate = await RateModel.findOne(
        {
          _id: new mongoose.Types.ObjectId(req.params.id),
          "user.id": new mongoose.Types.ObjectId(req.user.id),
        },
        null,
        { session },
      );
      if (!_rate) throw new Error("Rate not found or you are not owner");

      if(nextRate === _rate.rate) throw new Error("You already rated");
      const rateDiff = nextRate - _rate.rate; // next rate - current rate

      _rate.rate = nextRate;
      // validate
      await _rate.validate();
      await _rate.save();

      if (_rate.productId) {
        await ProductModel.findByIdAndUpdate(
          _rate.productId,
          { $inc: { rate: rateDiff } },
          { session },
        );
      }
      else if (_rate.commentId) {
        if (![-1, 1].includes(nextRate)) throw new Error("Rate must be 1 or -1");

        const _comment = await CommentModel.findOneAndUpdate(
          { 
            _id: _rate.commentId,
            "user.id": { $ne: new mongoose.Types.ObjectId(req.user.id) },
          },
          { $inc: { rate: nextRate * 2 } },
          { session },
        );
        if (!_comment) throw new Error("Comment not found or you can't rate your comment");
      }
      await session.commitTransaction();
      res.status(200).json(_rate);
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
    const { productId = null, commentId = null } = req.body;
    try {
      session.startTransaction();
      const _rate = await RateModel.findById(req.params.id, null, { session });
      if (!_rate) throw new Error("Rate not found");

      // rate user id not equals to current user id
      if (_rate.user.id.toString() !== req.user.id) {
        throw new Error("You are not authorized to delete this rate");
      }

      if (productId) {
        await ProductModel.findByIdAndUpdate(productId, {
          $inc: { rate: -_rate.rate, userRated: -1 },
        }, { session });
      }
      else if (commentId) {
        await CommentModel.findByIdAndUpdate(commentId, {
          $inc: { rate: -_rate.rate, userRated: -1 },
        }, { session });
      }
      await _rate.remove();
      await session.commitTransaction();
      res.status(200).json(_rate);
    } catch (err) {
      await session.abortTransaction();
      let message: string = "Internal issues";
      if (err.message) message = err.message;
      res.status(400).json({ message });
    }
    session.endSession();
  },
};

