import { BaseModel } from "./base.model";
import { User } from "./user.model";

export enum DeviceLiveStatus {
  NA = "na",
  ONLINE = "online",
  OFFLINE = "offline",
}

export enum DeviceAssignStatus {
  NOT_ASSIGNED = "not_assigned",
  PENDING_APPROVAL = "pending_approval",
  ASSIGNED = "assigned",
}

export enum DeviceStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface Device extends BaseModel {
  serial: string;
  liveStatus: DeviceLiveStatus;
  assignStatus: DeviceAssignStatus;
  status: DeviceStatus;
  user?: User;
  approvedBy?: User;
  approvedAt?: string;
  name?: string;
  vehicleName?: string;
  vehicleNumber?: string;
  approvalRequestedAt?: string;
  lastSeenAt?: string;
  firmwareVersion?: string;
  driverName?: string;
  driverContact?: string;
  driverOtherDetails?: string;
}
