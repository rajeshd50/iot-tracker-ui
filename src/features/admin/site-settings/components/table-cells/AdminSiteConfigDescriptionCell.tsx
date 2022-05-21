import { Tooltip, Typography } from "@mui/material";
import React from "react";
import { truncateText } from "../../../../../common/util/util";
import { SiteConfig } from "../../../../../models";

export interface IAdminSiteConfigDescriptionCellProps {
  siteConfig: SiteConfig;
}

function AdminSiteConfigDescriptionCell({
  siteConfig,
}: IAdminSiteConfigDescriptionCellProps) {
  if (!siteConfig.description) {
    return <Typography variant="subtitle1">N/A</Typography>;
  }
  return (
    <Tooltip title={siteConfig.description}>
      <Typography variant="subtitle1">
        {truncateText(siteConfig.description, 60)}
      </Typography>
    </Tooltip>
  );
}

export default AdminSiteConfigDescriptionCell;
