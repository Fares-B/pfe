import bcrypt from "bcrypt";
import {
	prop,
	pre,
	getModelForClass,
	modelOptions,
} from "@typegoose/typegoose";
import { bannedReasonEnum, userRolesEnum } from "./type";
import BannedSchema from "./subdoc/SubBanned";

const SALT_ROUNDS = 10;


@pre<UserClass>("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
	}
	next();
})
@modelOptions({
	schemaOptions: {
		collection: "users",
		timestamps: true,
		toJSON: {
			transform: (doc, ret) => {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
				delete ret.password;
			},
		},
	},
})
export class UserClass {
  @prop()
	public username!: string;

  @prop()
  public email?: string;

  @prop({ unique: true })
  public phone!: string;

  @prop()
  public password!: string;

	@prop()
	public image!: string;

  @prop({ enum: userRolesEnum, default: userRolesEnum.USER })
  public role!: string;

  @prop({ default: false })
  public verified!: boolean;

  @prop()
  public banned?: BannedSchema;

  @prop({ default: Date.now })
  public lastLogin: Date;

  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

UserClass.prototype.comparePassword = async function (
	candidatePassword: string,
) {
	try {
		return await bcrypt.compare(candidatePassword, this.password);
	} catch (err) {
		return false;
	}
};

export const UserModel = getModelForClass(UserClass);
