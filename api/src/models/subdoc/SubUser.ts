import { prop, modelOptions } from "@typegoose/typegoose";
import mongoose from "mongoose";

@modelOptions({ schemaOptions: { _id: false } })
export class SubUserClass {
  @prop({ type: mongoose.Schema.Types.ObjectId, ref: "users" })
	public id!: mongoose.Schema.Types.ObjectId;

  @prop()
  public username!: string;

  @prop()
  public image: string;
}
