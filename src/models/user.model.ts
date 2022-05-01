import { BaseModel } from "./base.model";

export interface User extends BaseModel {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: "admin" | "user";
  isActive: boolean;
  isAdmin: boolean;
}
