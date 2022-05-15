import { BaseModel } from "./base.model";
import { User } from "./user.model";

export interface GeoFenceCoordinateModel {
  lat: number;
  lng: number;
}

export enum GeoFenceType {
  CIRCLE = "circle",
  RECTANGLE = "rectangle",
  POLYGON = "polygon",
}
export interface GeoBound {
  north: number;
  south: number;
  east: number;
  west: number;
}

export enum GeoFenceStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface GeoFence extends BaseModel {
  name: string;
  description?: string;
  isActive: boolean;
  user: User;
  coordinates: GeoFenceCoordinateModel[];
  attachedDeviceSerials: string[];
  totalDevicesAttached: number;
  bound: GeoBound;
  type: GeoFenceType;
  circleCenter?: GeoFenceCoordinateModel;
  circleRadius?: number;
  rectangleBound?: GeoBound;
}
