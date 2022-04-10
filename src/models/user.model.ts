import { BaseModel } from "./base.model";

export interface User extends BaseModel {
  name: string;
  email: string;
  role: "admin" | "user";
}
