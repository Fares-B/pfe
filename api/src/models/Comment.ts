import { prop, modelOptions } from "@typegoose/typegoose";
import { SubUserClass } from "./subdoc/SubUser";

@modelOptions({ schemaOptions: { _id: false } })
export class CommentClass {
    @prop()
    public content!: string;

    @prop()
    public user!: SubUserClass;

    @prop()
    public reports: SubUserClass[];

    @prop({ default: Date.now })
    public createdAt: Date;
}
