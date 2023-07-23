import { verifyToken } from "../lib/jwt";
import logger from "../lib/logger";

interface Options {
	optional?: boolean;
}

export default function (options: Options) {
	const { optional = false } = options;
	return async (req: any, res: any, next: any) => {
		const auth = req.headers.authorization;
		// needs header authorization with Bearer token 
		if (!auth && !optional) {
			res.sendStatus(401);
		} else {
			try {
				const [type, token] = auth.split(/\s+/);
				if (type !== "Bearer") throw new Error();
				// token isValid and not expired decode token
				const decoded = await verifyToken(token);
				// logger().silly("decoded", decoded);
				// console.log("decoded", decoded);
				req.user = decoded;
			} catch (err) {
				// console.error(err);
				if(!optional)
					res.sendStatus(401);
			}
		}
		next();
	};
};
