import { BaseModel } from "./base.model";

export enum SITE_CONFIG_TYPES {
  TEXT = "text",
  NUMBER = "number",
  BOOLEAN = "boolean",
  DATE = "date",
  DATE_TIME = "date-time",
}

export const UNLIMITED_NUMBER = -1;

export interface SiteConfig extends BaseModel {
  key: string;
  value?: string;
  type: SITE_CONFIG_TYPES;
  description?: string;
  isActive: boolean;
  isMultipleEntry: boolean;
}
