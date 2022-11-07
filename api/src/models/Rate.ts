import mongoose from "mongoose";
import {
	getModelForClass,
	index,
	modelOptions,
	prop,
} from "@typegoose/typegoose";
import { SubUserClass } from "./subdoc/SubUser";

// unique rate for user and (product or comment)
@index({ "user.id": 1, "productId": 1, "commentId": -1 }, { unique: true })
@index({ "user.id": 1, "productId": -1, "commentId": 1 }, { unique: true })
// timestam
@modelOptions({
  schemaOptions: {
    collection: "rates",
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
})
export class RateClass {
  @prop({ enum: [-1, 1, 2, 3, 4, 5] })
	public rate!: number;

  @prop()
  public user!: SubUserClass;

  @prop({
  	type: mongoose.Schema.Types.ObjectId,
  	ref: "products",
  	default: null,
  })
  public productId?: mongoose.Schema.Types.ObjectId;

  @prop({
  	type: mongoose.Schema.Types.ObjectId,
  	ref: "comments",
  	default: null,
  })
  public commentId?: mongoose.Schema.Types.ObjectId;
}

export const RateModel = getModelForClass(RateClass);
