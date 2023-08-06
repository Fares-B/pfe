import mongoose from "mongoose";
import {
	getModelForClass,
	index,
	modelOptions,
	prop,
} from "@typegoose/typegoose";

// unique rate for user and (product or comment)
// timestam
@modelOptions({
  schemaOptions: {
    collection: "forgotPassword",
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
export class ForgotPasswordClass {

  @prop({ required: true })
  public code!: string;

  @prop({ required: true })
  public expiredAt!: Date;

  @prop()
  public email!: string;
}

export const ForgotPasswordModel = getModelForClass(ForgotPasswordClass);
