import { BaseModel } from "./base.model";

export enum DevicePoolStatus {
  CREATED = "created",
  CONFIGURED = "configured",
}

export interface DevicePool extends BaseModel {
  serial: string;
  status: DevicePoolStatus;
}
