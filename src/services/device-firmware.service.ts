import { APIS } from "../constants";
import { BaseApi } from "./base-api";
import { getErrorMessage } from "./common";
import {
  PaginatedResponse,
  DeviceFirmware,
  DeviceFirmwareSyncStatus,
} from "../models";

export interface AddFirmwareDto {
  version: string;
}

export interface DeleteFirmwareDto {
  id: string;
}

export interface FetchDeviceFirmwareDto {
  page: number;
  perPage: number;
  version?: string;
  syncStatus?: DeviceFirmwareSyncStatus;
}

export interface SyncFirmwareDto {
  id: string;
}

const add = async (file: File, data: AddFirmwareDto) => {
  try {
    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("version", data.version);
    const resp = await BaseApi.post(APIS.DEVICE_FIRMWARE.ADD, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    if (resp && resp.status === 201 && resp.data.data) {
      const respData: DeviceFirmware = resp.data.data;

      return respData;
    }
    throw new Error(getErrorMessage(resp, "Unable to add firmware"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const remove = async (data: DeleteFirmwareDto) => {
  try {
    const resp = await BaseApi.post(APIS.DEVICE_FIRMWARE.DELETE, data);
    if (resp && resp.status === 200) {
      return true;
    }
    throw new Error(getErrorMessage(resp, "Unable to delete firmware"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const fetch = async (data: FetchDeviceFirmwareDto) => {
  try {
    const resp = await BaseApi.post(APIS.DEVICE_FIRMWARE.FETCH, data);
    if (resp && resp.status === 200 && resp.data.data) {
      const respData: PaginatedResponse<DeviceFirmware> = resp.data.data;

      return respData;
    }
    throw new Error(
      getErrorMessage(resp, "Unable to fetch all firmware entries")
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const sync = async (data: SyncFirmwareDto) => {
  try {
    const resp = await BaseApi.post(APIS.DEVICE_FIRMWARE.SYNC, data);
    if (resp && resp.status === 200 && resp.data.data) {
      const respData: DeviceFirmware = resp.data.data;

      return respData;
    }
    throw new Error(
      getErrorMessage(resp, "Unable to sync devices with firmware")
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const DeviceFirmwareService = {
  add,
  remove,
  fetch,
  sync,
};
