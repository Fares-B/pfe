import { verifyToken } from "../lib/jwt";
import logger from "../lib/logger";

export default async (req: any, res: any, next: any) => {
	const auth = req.headers.authorization;
	console.log("auth", auth);
	if (!auth) {
		res.sendStatus(401);
	} else {
		try {
			const [type, token] = auth.split(/\s+/);
			if (type !== "Bearer") throw new Error();
			const decoded = await verifyToken(token);
			// logger().silly("decoded", decoded);
			// console.log("decoded", decoded);
			req.user = decoded;
			next();
		} catch (err) {
			console.error(err);
			res.sendStatus(401);
		}
	}
};
