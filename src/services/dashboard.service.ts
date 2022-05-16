import { APIS } from "../constants";
import { DashboardDeviceCount, DashboardUserCount } from "../models";
import { BaseApi } from "./base-api";
import { getErrorMessage } from "./common";

const deviceCount = async () => {
  try {
    const resp = await BaseApi.post(APIS.DASHBOARD_REPORT.DEVICE_COUNT);
    if (resp && resp.status === 200 && resp.data.data) {
      const response: DashboardDeviceCount = resp.data.data;

      return response;
    }
    throw new Error(getErrorMessage(resp, "Unable to fetch dashboard data"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const userCount = async () => {
  try {
    const resp = await BaseApi.post(APIS.DASHBOARD_REPORT.USER_COUNT);
    if (resp && resp.status === 200 && resp.data.data) {
      const response: DashboardUserCount = resp.data.data;

      return response;
    }
    throw new Error(getErrorMessage(resp, "Unable to fetch dashboard data"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const DashboardService = {
  deviceCount,
  userCount,
};
