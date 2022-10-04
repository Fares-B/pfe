const jwt = require("jsonwebtoken");
import { UserModel } from "../models";


export interface Token {
  id: String;
  phone: String;
  role: String;
}


export function createToken (user: any): Token {
  const token = jwt.sign(
    {
      id: user._id,
      phone: user.phone,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
}

export function verifyToken (token: string): Promise<Token> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: Token) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}
