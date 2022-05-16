import React from "react";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import AdminDashboardWidget from "./AdminDashboardWidget";
import { formatNumber } from "../../../../common/util/util";

export interface IAdminDeviceCountWidgetProps {
  value?: number;
  isLoading: boolean;
}

function AdminDeviceCountWidget({
  value,
  isLoading,
}: IAdminDeviceCountWidgetProps) {
  return (
    <AdminDashboardWidget
      icon={<DeveloperBoardIcon />}
      title="Devices"
      value={formatNumber(value || 0)}
      titleColor="rgb(0, 82, 73)"
      valueColor="rgb(0, 82, 73)"
      iconColor="rgb(0, 123, 85)"
      backgroundColor="rgb(200, 250, 205)"
      isLoading={isLoading}
      iconBgImageColor="linear-gradient(135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 100%)"
    />
  );
}

export default AdminDeviceCountWidget;
