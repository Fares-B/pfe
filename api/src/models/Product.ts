import {
	prop,
	getModelForClass,
	modelOptions,
	Ref,
} from "@typegoose/typegoose";
import { CommentClass } from "./Comment";
import BannedSchema from "./subdoc/SubBanned";


@modelOptions({
	schemaOptions: {
		collection: "products",
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
export class ProductClass {
  @prop()
	public name!: string;

  @prop()
  public barcode!: string;

  @prop({ default: 0 })
  public rate!: number;

  @prop({ default: 0 })
  public userRated!: number;

  @prop()
  public image: string;

  @prop({ ref: () => CommentClass }) // for an array of references
  public comments: Ref<CommentClass>[];

  @prop({ default: false, description: "if product is deleted by moderation" })
  public deleted!: boolean;

  @prop({ default: false, description: "if true, this product is visible on site" })
  public visible!: boolean;

  @prop()
  public banned?: BannedSchema;
}

export const ProductModel = getModelForClass(ProductClass);
