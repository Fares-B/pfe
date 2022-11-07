import {
	prop,
	modelOptions,
	getModelForClass,
	pre,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { SubReportClass } from "./subdoc/SubReport";
import { SubUserClass } from "./subdoc/SubUser";


@modelOptions({
	schemaOptions: {
		collection: "comments",
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
export class CommentClass {
  @prop()
	public content!: string;

  @prop()
  public user!: SubUserClass;

  @prop({ type: mongoose.Schema.Types.ObjectId, ref: "products" })
  public productId!: mongoose.Schema.Types.ObjectId;

  @prop()
  public reports: SubReportClass[];

	@prop({ default: 0 })
	public rate!: number;

	@prop({ default: 0 })
	public userRated!: number;
}

export const CommentModel = getModelForClass(CommentClass);
