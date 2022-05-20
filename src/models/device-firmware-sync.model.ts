import { BaseModel } from "./base.model";
import { User } from "./user.model";

export interface DeviceFirmwareSync extends BaseModel {
  syncJobId: string;
  completedAt?: Date | string;
  isAllDeviceSelected: boolean;
  confirmedCount: number;
  totalDeviceCount: number;
  syncBy: User;
}
