import {
	prop,
	modelOptions,
	getModelForClass,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import BannedSchema from "./subdoc/SubBanned";
import SubUserClass from "./subdoc/SubUser";


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

	@prop({ default: 0 })
	public rate!: number;

	@prop({ default: 0 })
	public userRated!: number;

	@prop({ default: false, description: "if comment is deleted by user" })
	public deleted!: boolean;

	@prop()
	public banned?: BannedSchema;
}

export const CommentModel = getModelForClass(CommentClass);
