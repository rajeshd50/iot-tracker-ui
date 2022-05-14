import { BaseModel } from "./base.model";
import { User } from "./user.model";

export interface GeoFenceCoordinateMongoModel {
  type: "Polygon";
  coordinates: number[][][];
}

export interface GeoFence extends BaseModel {
  name: string;
  isActive: boolean;
  user: User;
  fence: GeoFenceCoordinateMongoModel;
  attachedDeviceSerials: string[];
  totalDevicesAttached: number;
}
