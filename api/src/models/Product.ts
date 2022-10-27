import { prop, pre, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { CommentClass } from "./Comment";

@pre<ProductClass>("save", async function (next) {
    this.updatedAt = new Date();
    next();
})

@modelOptions({ schemaOptions: { collection: 'products' } })
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

    @prop({ default: [] })
    public comments!: CommentClass[];

    @prop({ default: Date.now })
    public createdAt: Date;

    @prop({ default: Date.now })
    public updatedAt: Date;

    @prop({ default: false })
    public deleted: boolean;
}

export const ProductModel = getModelForClass(ProductClass);