import mongoose from "mongoose";
import {
	getModelForClass,
	index,
	modelOptions,
	prop,
} from "@typegoose/typegoose";

// timestam
@modelOptions({
  schemaOptions: {
    collection: "groups",
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
export class GroupClass {
  @prop({ index: true })
	public name!: string;
}

export const GroupModel = getModelForClass(GroupClass);
