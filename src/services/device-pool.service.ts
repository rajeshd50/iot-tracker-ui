import { APIS } from "../constants";
import { DevicePool, DevicePoolStatus, PaginatedResponse } from "../models";
import { BaseApi } from "./base-api";
import { getErrorMessage } from "./common";

export interface MarkDevicePoolConfiguredDto {
  serial: string;
}

export interface FetchDevicePoolDto {
  serial?: string;
  status?: DevicePoolStatus;
  search?: string;
  page: number;
  perPage: number;
}

export interface DeleteDeviceFromPoolDto {
  serial?: string;
  id?: string;
}

const create = async () => {
  try {
    const resp = await BaseApi.post(APIS.DEVICE_POOL.CREATE);
    if (resp && resp.status === 201 && resp.data.data) {
      const devicePool: DevicePool = resp.data.data;

      return devicePool;
    }
    throw new Error(getErrorMessage(resp, "Unable to create a device pool"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const markConfigured = async (data: MarkDevicePoolConfiguredDto) => {
  try {
    const resp = await BaseApi.post(APIS.DEVICE_POOL.MARK_CONFIGURED, data);
    if (resp && resp.status === 201 && resp.data.data) {
      const devicePool: DevicePool = resp.data.data;

      return devicePool;
    }
    throw new Error(getErrorMessage(resp, "Unable to mark as configured"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const fetch = async (data: FetchDevicePoolDto) => {
  try {
    const resp = await BaseApi.post(APIS.DEVICE_POOL.FETCH, data);
    if (resp && resp.status === 200 && resp.data.data) {
      const devicePools: PaginatedResponse<DevicePool> = resp.data.data;

      return devicePools;
    }
    throw new Error(getErrorMessage(resp, "Unable to fetch data"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const remove = async (data: DeleteDeviceFromPoolDto) => {
  try {
    const resp = await BaseApi.post(APIS.DEVICE_POOL.DELETE, data);
    if (resp && resp.status === 200) {
      return true;
    }
    throw new Error(
      getErrorMessage(resp, "Unable to delete the device from pool")
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const DevicePoolService = {
  create,
  markConfigured,
  fetch,
  remove,
};
