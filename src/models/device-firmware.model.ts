import { BaseModel } from "./base.model";
import { User } from "./user.model";

export enum DeviceFirmwareSyncStatus {
  NOT_SYNCED = "not_synced",
  SYNCED = "synced",
}

export interface DeviceFirmware extends BaseModel {
  version: string;
  filePath: string;
  fileUrl: string;
  syncStatus: DeviceFirmwareSyncStatus;
  isLatest: boolean;
  syncAt?: string;
  createdBy?: User;
  signedUrl?: string;
  signedUrlExpiresAt?: string;
}
