import { verifyToken } from "../lib/jwt";

export default async (req: any, res: any, next: any) => {
  const auth = req.headers.authorization;
  if (!auth) {
    res.sendStatus(401);
  } else {
    try {
      const [type, token] = auth.split(/\s+/);
      if (type !== "Bearer") throw new Error();
      const decoded = await verifyToken(token);
      console.log("decoded", decoded);
      req.user = decoded;
      next();
    } catch (err) {
      res.sendStatus(401);
    }
  }
};
