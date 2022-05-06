import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";

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

export const formatCalorie = (value: number) => {
  return `${formatNumber(value)} cal`;
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
