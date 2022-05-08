import { APIS } from "../constants";
import {
  Device,
  DeviceAssignStatus,
  DeviceLiveStatus,
  DeviceStatus,
  PaginatedResponse,
} from "../models";
import { BaseApi } from "./base-api";
import { getErrorMessage, OrderByDirection } from "./common";

interface UpdateDeviceGeneralDto {
  name?: string;
  vehicleName?: string;
  vehicleNumber?: string;
  driverName?: string;
  driverContact?: string;
  driverOtherDetails?: string;
}

export interface UpdateDeviceDto extends UpdateDeviceGeneralDto {
  id: string;
}

export interface RequestDeviceAssignmentDto extends UpdateDeviceGeneralDto {
  serial: string;
}

export enum DeviceOrderBy {
  CREATED_AT = "createdAt",
  APPROVED_AT = "approvedAt",
  APPROVAL_REQUESTED_AT = "approvalRequestedAt",
  LAST_SEEN_AT = "lastSeenAt",
}

export interface FetchDeviceDto {
  serial?: string;
  status?: DeviceStatus | string;
  searchText?: string;
  assignStatus?: DeviceAssignStatus | string;
  liveStatus?: DeviceLiveStatus | string;
  user?: string;
  page: number;
  perPage: number;
  orderBy?: DeviceOrderBy;
  orderByDirection?: OrderByDirection;
}

export interface UpdateDeviceAssignmentApprovalDto {
  serial: string;
  isApproved: boolean;
}

export interface UpdateDeviceStatusDto {
  serial: string;
  status: DeviceStatus;
}

export interface DeviceDetailsDto {
  id?: string;
  serial?: string;
}

export interface DeleteDeviceDto {
  serial?: string;
  id?: string;
}

export interface AssignDeviceDto {
  deviceId: string;
  userId: string;
}

const requestAssignment = async (data: RequestDeviceAssignmentDto) => {
  try {
    const resp = await BaseApi.post(APIS.DEVICE.REQUEST_ASSIGNMENT, data);
    if (resp && resp.status === 200 && resp.data.data) {
      const deviceData: Device = resp.data.data;

      return deviceData;
    }
    throw new Error(
      getErrorMessage(resp, "Unable to request for device assignment")
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const fetch = async (data: FetchDeviceDto) => {
  try {
    const resp = await BaseApi.post(APIS.DEVICE.FETCH, data);
    if (resp && resp.status === 200 && resp.data.data) {
      const deviceData: PaginatedResponse<Device> = resp.data.data;

      return deviceData;
    }
    throw new Error(getErrorMessage(resp, "Unable to fetch devices"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const update = async (data: UpdateDeviceDto) => {
  try {
    const resp = await BaseApi.post(APIS.DEVICE.UPDATE, data);
    if (resp && resp.status === 201 && resp.data.data) {
      const deviceData: Device = resp.data.data;

      return deviceData;
    }
    throw new Error(getErrorMessage(resp, "Unable to update device"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const updateApproval = async (data: UpdateDeviceAssignmentApprovalDto) => {
  try {
    const resp = await BaseApi.post(APIS.DEVICE.UPDATE_APPROVAL, data);
    if (resp && resp.status === 200 && resp.data.data) {
      const deviceData: Device = resp.data.data;

      return deviceData;
    }
    throw new Error(getErrorMessage(resp, "Unable to update approval request"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const updateStatus = async (data: UpdateDeviceStatusDto) => {
  try {
    const resp = await BaseApi.post(APIS.DEVICE.UPDATE_STATUS, data);
    if (resp && resp.status === 201 && resp.data.data) {
      const deviceData: Device = resp.data.data;

      return deviceData;
    }
    throw new Error(getErrorMessage(resp, "Unable to update device status"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const details = async (data: DeviceDetailsDto) => {
  try {
    const resp = await BaseApi.post(APIS.DEVICE.DETAILS, data);
    if (resp && resp.status === 200 && resp.data.data) {
      const deviceData: Device = resp.data.data;

      return deviceData;
    }
    throw new Error(getErrorMessage(resp, "Unable to fetch device details"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const remove = async (data: DeleteDeviceDto) => {
  try {
    const resp = await BaseApi.post(APIS.DEVICE.DELETE, data);
    if (resp && resp.status === 200) {
      return true;
    }
    throw new Error(getErrorMessage(resp, "Unable to delete the device"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const assign = async (data: AssignDeviceDto) => {
  try {
    const resp = await BaseApi.post(APIS.DEVICE.ASSIGN, data);
    if (resp && resp.status === 200 && resp.data.data) {
      const deviceData: Device = resp.data.data;

      return deviceData;
    }
    throw new Error(getErrorMessage(resp, "Unable to assign device"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const DeviceService = {
  requestAssignment,
  fetch,
  update,
  updateApproval,
  updateStatus,
  details,
  remove,
  assign,
};
