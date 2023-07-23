import { prop, modelOptions, mongoose, getModelForClass, Ref } from "@typegoose/typegoose";
import { bannedReasonEnum, docTypeEnum } from "./type";
import SubUserClass from "./subdoc/SubUser";
import { CommentClass } from "./Comment";
import { ProductClass } from "./Product";
import { UserClass } from "./User";

@modelOptions({
  schemaOptions: {
    collection: "reports",
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
})
export class ReportClass {
  @prop()
	public who!: SubUserClass;

  @prop({ enum: bannedReasonEnum })
  public reason!: bannedReasonEnum;

  @prop({ default: false })
  public resolved!: boolean;

  @prop({ enum: docTypeEnum })
  public documentType!: docTypeEnum;

  @prop({ type: mongoose.Schema.Types.ObjectId })
  public documentId!: mongoose.Schema.Types.ObjectId;

  @prop({ ref: () => CommentClass, type: () => String })
  public commentId?: Ref<CommentClass, string>;

  @prop({ ref: () => ProductClass, type: () => String })
  public productId?: Ref<ProductClass, string>;

  @prop({ ref: () => UserClass, type: () => String })
  public userId?: Ref<UserClass, string>;
}

export const ReportModel = getModelForClass(ReportClass);
