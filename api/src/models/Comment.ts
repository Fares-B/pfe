import {
	prop,
	modelOptions,
	getModelForClass,
	pre,
	Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { ProductClass } from "./Product";
import { SubReportClass } from "./subdoc/SubReport";
import { SubUserClass } from "./subdoc/SubUser";

@pre<CommentClass>("save", async function (next) {
	this.updatedAt = new Date();
	next();
})
@modelOptions({
	schemaOptions: {
		collection: "comments",
		toJSON: {
			transform: (doc, ret) => {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	},
})
@modelOptions({ schemaOptions: { collection: "comments" } })
export class CommentClass {
  @prop()
	public content!: string;

  @prop()
  public user!: SubUserClass;

  @prop({ type: mongoose.Schema.Types.ObjectId, ref: "products" })
  public productId!: mongoose.Schema.Types.ObjectId;

  @prop()
  public reports: SubReportClass[];

  @prop({ default: Date.now })
  public createdAt: Date;

  @prop({ default: Date.now })
  public updatedAt: Date;
}

export const CommentModel = getModelForClass(CommentClass);
