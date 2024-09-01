import { Request } from "express";

export interface IGetUserAuthInfoRequest extends Request {
  user?: {
    _id: string;
    username: string;
  };
}
