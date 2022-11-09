import { prop, modelOptions } from "@typegoose/typegoose";
import { bannedReasonEnum } from "../type";
import { SubUserClass } from "./SubUser";

@modelOptions({
  schemaOptions: {
    _id: false,
    timestamps: true,
  }
})
export class SubReportClass {
  @prop()
	public user!: SubUserClass;

  @prop({ enum: bannedReasonEnum })
  public why!: bannedReasonEnum;

  @prop({ default: false })
  public resolved!: boolean;
}
