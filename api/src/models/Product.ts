import {
	prop,
	getModelForClass,
	modelOptions,
	Ref,
} from "@typegoose/typegoose";
import BannedSchema from "./subdoc/SubBanned";
import SubUserClass from "./subdoc/SubUser";
import { CommentClass } from "./Comment";
import { UserClass } from "./User";
import { GroupClass } from "./Group";


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

// location
// description
export class ProductClass {
  @prop({ required: true })
  public title!: string;

  @prop()
  public description!: string;

  @prop({ required: true })
  public author!: SubUserClass;

  @prop()
  public price!: number;

  @prop()
  public oldPrice!: number;

  @prop({ required: true })
  public link!: string;

  @prop({ ref: () => GroupClass })
  public groups: Ref<CommentClass>[];

  @prop({ required: true })
  public image!: string;

  // @prop()
  // public thumb: string;

  @prop({ default: 0 })
  public rate!: number;

  @prop({ default: 0 })
  public userRated!: number;

  @prop({ default: 0 })
  public views!: number;

  @prop({ ref: () => CommentClass }) // for an array of references
  public comments: Ref<CommentClass>[];

  @prop({ default: false, description: "if product is deleted by moderation" })
  public deleted!: boolean;

  @prop({ default: false, description: "if true, this product is visible on site" })
  public visible!: boolean;

  @prop({ default: null, description: "if not null, this product is verified by moderator and this is the moderator id" })
  public verifiedBy: Ref<UserClass>;

  @prop()
  public banned?: BannedSchema;
}

export const ProductModel = getModelForClass(ProductClass);
