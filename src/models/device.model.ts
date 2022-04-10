import { BaseModel } from "./base.model";

export enum DeviceStatus {
  online = "online",
  offline = "offline",
  warning = "warning",
  critical = "critical",
}

export interface DeviceDetails {
  status: DeviceStatus;
  lastSeen?: string;
}

export interface Device extends BaseModel {
  serialNumber: string;
  model: string;
  name: string;
  isActive: boolean;
  description?: string;
  details: DeviceDetails;
}
