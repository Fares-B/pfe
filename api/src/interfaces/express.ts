import express from "express";

export interface UserToken {
  id?: string;
  _id?: string;
  phone?: string;
  email: string;
  role: string;
  verified: boolean;
  username: string;
  image?: string;
}

export interface Request extends express.Request {
  user: UserToken;
}

export type Response = express.Response
