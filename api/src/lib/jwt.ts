import jwt from "jsonwebtoken";
import { UserToken } from "../interfaces/express";


export function createToken(user: UserToken): string {
	const token = jwt.sign(
		{
			id: user._id,
			phone: user.phone,
			role: user.role,
			verified: user.verified,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "1y",
		},
	);
	return token;
}

export function verifyToken(token: string): Promise<UserToken> {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: UserToken) => {
			if (err) {
				reject(err);
			} else {
				resolve(decoded);
			}
		});
	});
}
