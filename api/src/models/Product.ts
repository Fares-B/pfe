import {
	prop,
	pre,
	getModelForClass,
	modelOptions,
	Ref,
} from "@typegoose/typegoose";
import { CommentClass } from "./Comment";
import { SubReportClass } from "./subdoc/SubReport";

@pre<ProductClass>("save", async function (next) {
	this.updatedAt = new Date();
	next();
})
@modelOptions({
	schemaOptions: {
		collection: "products",
		toJSON: {
			transform: (doc, ret) => {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	},
})
@modelOptions({ schemaOptions: { collection: "products" } })
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

  @prop({ default: Date.now })
  public createdAt: Date;

  @prop({ default: Date.now })
  public updatedAt: Date;

  @prop({ default: false })
  public deleted: boolean;

  @prop({ default: false })
  public visible: boolean;

  @prop()
  public reports: SubReportClass[];
}

export const ProductModel = getModelForClass(ProductClass);
