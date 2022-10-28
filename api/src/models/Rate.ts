import mongoose from "mongoose";
import {
  getModelForClass,
  index,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { SubUserClass } from "./subdoc/SubUser";

// unique rate for user and (product or comment)
@index({ "user.id": 1, product: 1, comment: 1 }, { unique: true })
@modelOptions({ schemaOptions: { collection: "rates" } })
export class RateClass {
  @prop({ min: 1, max: 5 })
  public rate!: number;

  @prop()
  public user: SubUserClass;

  @prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    default: null,
  })
  public product: mongoose.Schema.Types.ObjectId;

  @prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
    default: null,
  })
  public comment: mongoose.Schema.Types.ObjectId;

  @prop({ default: Date.now })
  public createdAt: Date;
}

export const RateModel = getModelForClass(RateClass);
