import React from "react";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import AdminDashboardWidget from "./AdminDashboardWidget";
import { formatNumber } from "../../../../common/util/util";

export interface IAdminNewDeviceCountWidgetProps {
  value: number;
  isLoading: boolean;
}

function AdminNewDeviceCountWidget({
  value,
  isLoading,
}: IAdminNewDeviceCountWidgetProps) {
  return (
    <AdminDashboardWidget
      icon={<AddToQueueIcon />}
      title="Recent Purchases"
      value={formatNumber(value)}
      titleColor="rgb(122, 79, 1)"
      valueColor="rgb(122, 79, 1)"
      iconColor="rgb(183, 129, 3)"
      backgroundColor="rgb(255, 247, 205)"
      isLoading={isLoading}
      iconBgImageColor="linear-gradient(135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 100%)"
    />
  );
}

export default AdminNewDeviceCountWidget;
