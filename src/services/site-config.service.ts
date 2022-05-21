import { APIS } from "../constants";
import { PaginatedResponse, SiteConfig, SITE_CONFIG_TYPES } from "../models";
import { BaseApi } from "./base-api";
import { getErrorMessage } from "./common";

export interface UpdateSiteConfigDto {
  key: string;
  value: string;
  type?: SITE_CONFIG_TYPES;
  description?: string;
}

export interface FetchAllSiteConfigDto {
  searchText?: string;
  page: number;
  perPage: number;
}

export interface FetchSiteConfigDetailsDto {
  key: string;
}

const update = async (data: UpdateSiteConfigDto) => {
  try {
    const response = await BaseApi.post(APIS.SITE_CONFIG.UPDATE, data);
    if (response && response.status === 201 && response.data.data) {
      const data: SiteConfig = response.data.data;

      return data;
    }
    throw new Error(getErrorMessage(response, "Unable to update site config"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const fetchAll = async (data: FetchAllSiteConfigDto) => {
  try {
    const response = await BaseApi.post(APIS.SITE_CONFIG.FETCH, data);
    if (response && response.status === 200 && response.data.data) {
      const data: PaginatedResponse<SiteConfig> = response.data.data;

      return data;
    }
    throw new Error(getErrorMessage(response, "Unable to fetch site configs"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const details = async (data: FetchSiteConfigDetailsDto) => {
  try {
    const response = await BaseApi.post(APIS.SITE_CONFIG.DETAILS, data);
    if (response && response.status === 200 && response.data.data) {
      const data: SiteConfig = response.data.data;

      return data;
    }
    throw new Error(getErrorMessage(response, "Unable to fetch site config"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const SiteConfigService = {
  update,
  fetchAll,
  details,
};
