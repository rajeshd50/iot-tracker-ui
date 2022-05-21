import { Box, Chip, Tooltip, Typography } from "@mui/material";
import React from "react";
import {
  formatDate,
  formatDateTime,
  getSiteConfigValueByType,
  truncateText,
} from "../../../../../common/util/util";
import {
  SiteConfig,
  SITE_CONFIG_TYPES,
  UNLIMITED_NUMBER,
} from "../../../../../models";

export interface IAdminSiteConfigValueCellProps {
  siteConfig: SiteConfig;
}

interface IAdminSiteConfigValueCellTextProps {
  value: string;
}
function AdminSiteConfigValueCellText({
  value,
}: IAdminSiteConfigValueCellTextProps) {
  return (
    <Tooltip title={value}>
      <Typography>{truncateText(value, 60)}</Typography>
    </Tooltip>
  );
}

interface IAdminSiteConfigValueCellBooleanProps {
  value: boolean;
}
function AdminSiteConfigValueCellBoolean({
  value,
}: IAdminSiteConfigValueCellBooleanProps) {
  if (value) {
    return (
      <Chip label="true" color="success" variant="outlined" size="small" />
    );
  }
  return <Chip label="false" color="warning" variant="outlined" size="small" />;
}

interface IAdminSiteConfigValueCellDateProps {
  value: Date;
}
function AdminSiteConfigValueCellDate({
  value,
}: IAdminSiteConfigValueCellDateProps) {
  return <Typography>{formatDate(value)}</Typography>;
}

interface IAdminSiteConfigValueCellDateTimeProps {
  value: Date;
}
function AdminSiteConfigValueCellDateTime({
  value,
}: IAdminSiteConfigValueCellDateTimeProps) {
  return <Typography>{formatDateTime(value)}</Typography>;
}

interface IAdminSiteConfigValueCellNumberProps {
  value: number;
}
function AdminSiteConfigValueCellNumber({
  value,
}: IAdminSiteConfigValueCellNumberProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Typography>{value}</Typography>
      {value === UNLIMITED_NUMBER ? (
        <Chip
          label="Unlimited"
          color="primary"
          variant="outlined"
          size="small"
          sx={{
            marginLeft: "4px",
          }}
        />
      ) : null}
    </Box>
  );
}

function AdminSiteConfigValueCell({
  siteConfig,
}: IAdminSiteConfigValueCellProps) {
  const value = getSiteConfigValueByType(siteConfig.value, siteConfig.type);

  if (value === undefined || value === null) {
    return null;
  }

  switch (siteConfig.type) {
    case SITE_CONFIG_TYPES.BOOLEAN:
      return <AdminSiteConfigValueCellBoolean value={value} />;
    case SITE_CONFIG_TYPES.DATE:
      return <AdminSiteConfigValueCellDate value={value} />;
    case SITE_CONFIG_TYPES.DATE_TIME:
      return <AdminSiteConfigValueCellDateTime value={value} />;
    case SITE_CONFIG_TYPES.NUMBER:
      return <AdminSiteConfigValueCellNumber value={value} />;
    case SITE_CONFIG_TYPES.TEXT:
      return <AdminSiteConfigValueCellText value={value} />;
    default:
      return <Typography>{value}</Typography>;
  }
}

export default AdminSiteConfigValueCell;
