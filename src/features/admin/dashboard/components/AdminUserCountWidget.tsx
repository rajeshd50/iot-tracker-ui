import React from "react";
import AdminDashboardWidget from "./AdminDashboardWidget";
import { formatNumber } from "../../../../common/util/util";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

export interface IAdminUserCountWidgetProps {
  value: number;
  isLoading: boolean;
}

function AdminUserCountWidget({
  value,
  isLoading,
}: IAdminUserCountWidgetProps) {
  return (
    <AdminDashboardWidget
      icon={<SupervisedUserCircleIcon />}
      title="Users"
      value={formatNumber(value)}
      titleColor="rgb(4, 41, 122)"
      valueColor="rgb(4, 41, 122)"
      iconColor="rgb(12, 83, 183)"
      backgroundColor="rgb(208, 242, 255)"
      isLoading={isLoading}
      iconBgImageColor="linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)"
    />
  );
}

export default AdminUserCountWidget;
