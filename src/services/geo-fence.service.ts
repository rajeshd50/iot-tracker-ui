import { APIS } from "../constants";
import { BaseApi } from "./base-api";
import { getErrorMessage } from "./common";
import {
  PaginatedResponse,
  GeoFence,
  GeoFenceType,
  GeoFenceCoordinateModel,
  GeoBound,
  GeoFenceStatus,
} from "../models";

export interface GeoFenceCoordinates {
  lat: number;
  lng: number;
}

export interface AddGeoFenceDto {
  name: string;
  bound?: GeoBound;
  description?: string;
  coordinates: GeoFenceCoordinates[];
  type: GeoFenceType;
  circleCenter?: GeoFenceCoordinateModel;
  circleRadius?: number;
  rectangleBound?: GeoBound;
}

export interface UpdateGeoFenceDto extends AddGeoFenceDto {
  id: string;
}

export interface FetchGeoFenceDetailsDto {
  id: string;
}

export interface FetchGeoFencesDto {
  page: number;
  perPage: number;
  searchText?: string;
  status?: GeoFenceStatus | string;
  deviceSerial?: string;
  withoutDeviceSerial?: string;
}

export interface DeleteGeoFenceDto {
  id: string;
}

export interface UpdateGeoFenceDeviceDto {
  fenceId: string;
  deviceId: string;
}

export interface ChangeGeoFenceStatusDto {
  id: string;
  isActive: boolean;
}

const add = async (data: AddGeoFenceDto) => {
  try {
    const resp = await BaseApi.post(APIS.GEO_FENCE.ADD, data);
    if (resp && resp.status === 201 && resp.data.data) {
      const respData: GeoFence = resp.data.data;

      return respData;
    }
    throw new Error(getErrorMessage(resp, "Unable to add geo fence"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const addToDevice = async (data: UpdateGeoFenceDeviceDto) => {
  try {
    const resp = await BaseApi.post(APIS.GEO_FENCE.ADD_TO_DEVICE, data);
    if (resp && resp.status === 200 && resp.data.data) {
      const respData: GeoFence = resp.data.data;

      return respData;
    }
    throw new Error(
      getErrorMessage(resp, "Unable to add geo fence to the device")
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const remove = async (data: DeleteGeoFenceDto) => {
  try {
    const resp = await BaseApi.post(APIS.GEO_FENCE.DELETE, data);
    if (resp && resp.status === 200) {
      return true;
    }
    throw new Error(getErrorMessage(resp, "Unable to delete geo fence"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const details = async (data: FetchGeoFenceDetailsDto) => {
  try {
    const resp = await BaseApi.post(APIS.GEO_FENCE.DETAILS, data);
    if (resp && resp.status === 200 && resp.data.data) {
      const respData: GeoFence = resp.data.data;

      return respData;
    }
    throw new Error(getErrorMessage(resp, "Unable to fetch geo fence"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const fetch = async (data: FetchGeoFencesDto) => {
  try {
    const resp = await BaseApi.post(APIS.GEO_FENCE.FETCH, data);
    if (resp && resp.status === 200 && resp.data.data) {
      const respData: PaginatedResponse<GeoFence> = resp.data.data;

      return respData;
    }
    throw new Error(getErrorMessage(resp, "Unable to fetch all geo fences"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const removeFromDevice = async (data: UpdateGeoFenceDeviceDto) => {
  try {
    const resp = await BaseApi.post(APIS.GEO_FENCE.REMOVE_FROM_DEVICE, data);
    if (resp && resp.status === 200 && resp.data.data) {
      const respData: GeoFence = resp.data.data;

      return respData;
    }
    throw new Error(
      getErrorMessage(resp, "Unable to remove geo fence from device")
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const update = async (data: UpdateGeoFenceDto) => {
  try {
    const resp = await BaseApi.post(APIS.GEO_FENCE.UPDATE, data);
    if (resp && resp.status === 201 && resp.data.data) {
      const respData: GeoFence = resp.data.data;

      return respData;
    }
    throw new Error(getErrorMessage(resp, "Unable to update geo fence"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const changeStatus = async (data: ChangeGeoFenceStatusDto) => {
  try {
    const resp = await BaseApi.post(APIS.GEO_FENCE.CHANGE_STATUS, data);
    if (resp && resp.status === 201 && resp.data.data) {
      const respData: GeoFence = resp.data.data;

      return respData;
    }
    throw new Error(getErrorMessage(resp, "Unable to change geo fence status"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const GeoFenceService = {
  add,
  addToDevice,
  remove,
  details,
  fetch,
  removeFromDevice,
  update,
  changeStatus,
};
