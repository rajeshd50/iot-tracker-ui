import React from "react";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import AdminDashboardWidget from "./AdminDashboardWidget";
import { formatNumber } from "../../../../common/util/util";

export interface IAdminSupportCountWidgetProps {
  value: number;
  isLoading: boolean;
}

function AdminSupportCountWidget({
  value,
  isLoading,
}: IAdminSupportCountWidgetProps) {
  return (
    <AdminDashboardWidget
      icon={<ContactSupportIcon />}
      title="Recent tickets"
      value={formatNumber(value)}
      titleColor="rgb(122, 12, 46)"
      valueColor="rgb(122, 12, 46)"
      iconColor="rgb(183, 33, 54)"
      backgroundColor="rgb(255, 231, 217)"
      isLoading={isLoading}
      iconBgImageColor="linear-gradient(135deg, rgba(183, 33, 54, 0) 0%, rgba(183, 33, 54, 0.24) 100%)"
    />
  );
}

export default AdminSupportCountWidget;
