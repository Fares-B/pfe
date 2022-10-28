import mongoose from "mongoose";
import logger from "../lib/logger";
import { sendRateToArduino } from "../middlewares/qrcode";
import { ProductModel } from "../models";


export default {
  cget: async (req: any, res: any) => {
    try {
      const products = await ProductModel.find({ ...req.query });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: "Internal issues" });
    }
  },

  post: async (req: any, res: any) => {
    try {
      const product = new ProductModel({ ...req.body });
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ message: "Internal issues" });
    }
  },

  get: async (req: any, res: any) => {
    const { id, barcode = null } = req.params;
    try {
      let product = null;
      if (barcode) {
        product = await ProductModel.findOne({ barcode });
      } else {
        product = await ProductModel.findById(id);
      }
      if (!product) return res.status(403).json({ message: "Product not found" });
      sendRateToArduino(Math.round(product.rate));
      res.status(200).json(product);
    } catch (err) {
      logger.error(err);
      res.status(400).json({ message: "Internal issues" });
    }
  },

  put: async (req: any, res: any) => {
    try {
      let product = await ProductModel.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(req.product.id),
      }, { ...req.body });

      if (product === null) throw new Error('Product not found');

      await product.save();
      res.json(product);
    } catch (err) {
      res.status(400).json({ message: "Internal issues" });
    }
  },

  delete: async (req, res) => {
    try {
      const product = await ProductModel.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(req.params.id),
        productType: req.product.productType,
        deleted: false,
      }, { deleted: true });
      if (product === null) throw new Error('Product not found');
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ message: "Internal issues" });
    }
  },
}
