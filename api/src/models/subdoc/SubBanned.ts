import { modelOptions, prop } from "@typegoose/typegoose";
import { bannedReasonEnum } from "../type";


@modelOptions({ schemaOptions: { _id: null } })
export default class BannedSchema {
  @prop({ enum: bannedReasonEnum, default: bannedReasonEnum.OTHER })
  reason!: bannedReasonEnum;

  @prop({ default: Date.now })
  date!: Date;
}
