const jwt = require("jsonwebtoken");


export interface Token {
  id: String;
  phone: String;
  role: String;
}


export function createToken (user: any): string {
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
