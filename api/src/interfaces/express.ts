import express from "express";

export interface UserToken {
  id?: string;
  _id?: string;
  phone: string;
  role: string;
  verified: boolean;
}

export interface Request extends express.Request {
  user: UserToken;
}

export type Response = express.Response
