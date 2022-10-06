import bcrypt from "bcrypt";
import { prop, pre, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { bannedReasonEnum, userRolesEnum } from "./type";

const SALT_ROUNDS = 10;


export class BannedSchema {
    @prop({ enum: bannedReasonEnum, default: bannedReasonEnum.OTHER })
    reason!: bannedReasonEnum;

    @prop({ default: Date.now })
    date!: Date;
}

@pre<UserClass>("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }
    this.updatedAt = new Date();
    next();
})

@modelOptions({ schemaOptions: { collection: 'users' }})
export class UserClass {
    @prop()
    public username!: string;
    
    @prop()
    public email?: string;

    @prop({ unique: true })
    public phone!: string;

    @prop()
    public password!: string;

    @prop({ enum: userRolesEnum, default: userRolesEnum.USER })
    public role!: string;

    @prop({ default: false })
    public verified!: boolean;

    @prop()
    banned?: BannedSchema

    @prop({ default: Date.now })
    public createdAt: Date;

    @prop({ default: Date.now })
    public updatedAt: Date;

    @prop({ default: Date.now })
    public lastLogin: Date;

    comparePassword: (candidatePassword: string) => Promise<boolean>;
}


UserClass.prototype.comparePassword = async function (candidatePassword: string) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        return false;
    }
};

export const UserModel = getModelForClass(UserClass);
