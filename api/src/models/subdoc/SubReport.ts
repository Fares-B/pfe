import { prop, modelOptions } from "@typegoose/typegoose";
import { bannedReasonEnum } from "../type";
import { SubUserClass } from "./SubUser";

@modelOptions({ schemaOptions: { _id: false } })
export class SubReportClass {
  @prop()
	public user!: SubUserClass;

  @prop({ enum: bannedReasonEnum })
  public why!: bannedReasonEnum;

  @prop({ default: false })
  public resolved!: boolean;

  @prop({ default: Date.now })
  public createdAt!: Date;
}
