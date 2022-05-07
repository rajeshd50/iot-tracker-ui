import { User } from "./user.model";

export interface UserWithDevice extends User {
  totalDevice: number;
  activeDevice: number;
  inactiveDevice: number;
  pendingDevice: number;
}
