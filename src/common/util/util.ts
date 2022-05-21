import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import { SITE_CONFIG_TYPES } from "../../models";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

export const formatCurrency = (value: number) => {
  return currencyFormatter.format(value);
};

export const formatNumber = (value: number) => {
  return numberFormatter.format(value);
};

export const formatDate = (
  value: Date | string,
  formatString = "dd, MMM yyyy, EEE"
) => {
  const date = typeof value === "string" ? new Date(value) : value;
  return format(date, formatString);
};

export const formatMonthYear = (
  value: Date | string,
  formatString = "MMMM yyyy"
) => {
  const date = typeof value === "string" ? new Date(value) : value;
  return format(date, formatString);
};

export const formatDateTime = (
  value: Date | string,
  formatString = "dd, MMM yyyy, EEE, hh:mm aaa"
) => {
  const date = typeof value === "string" ? new Date(value) : value;
  return format(date, formatString);
};

export const getReadableDateDifferenceWithCurrentDate = (
  startDate: Date | string
) => {
  const sDate = typeof startDate === "string" ? new Date(startDate) : startDate;
  const eDate = new Date();
  return formatDistance(sDate, eDate, {
    includeSeconds: true,
    addSuffix: true,
  });
};

export const encodeDeviceSerial = (serial: string) => {
  return btoa(serial.toLocaleUpperCase());
};

export const decodeDeviceSerial = (inputString: string) => {
  return atob(inputString);
};

export const encodeGeoFenceId = (id: string) => {
  return btoa(id);
};

export const decodeGeoFenceId = (inputString: string) => {
  return atob(inputString);
};

export const truncateText = (text: string, maxLength: number) => {
  if (!text || !maxLength || text.length < maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

export const globalDialogClose = (closeFun: any) => {
  return (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    closeFun();
  };
};

export const getSiteConfigValueByType = (
  value: any,
  type: SITE_CONFIG_TYPES
) => {
  try {
    switch (type) {
      case SITE_CONFIG_TYPES.BOOLEAN:
        if (!value) {
          return false;
        }
        if (value === "true") {
          return true;
        }
        if (value === "false") {
          return false;
        }
        return !!value;
      case SITE_CONFIG_TYPES.TEXT:
        return value || "";
      case SITE_CONFIG_TYPES.NUMBER:
        return parseInt(String(value), 10);
      case SITE_CONFIG_TYPES.DATE:
      case SITE_CONFIG_TYPES.DATE_TIME:
        return value ? new Date(value) : null;
      default:
        return value || "";
    }
  } catch (error) {
    return null;
  }
};
