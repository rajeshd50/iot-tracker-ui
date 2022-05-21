import { BaseModel } from "./base.model";

export interface User extends BaseModel {
  title?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName: string;
  email: string;
  role: "admin" | "user";
  isActive: boolean;
  isAdmin: boolean;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  primaryContactNumber?: string;
  secondaryContactNumber?: string;
  alternateEmailAddress?: string;
  maxDevice: number;
  maxFencePerDevice: number;
}
