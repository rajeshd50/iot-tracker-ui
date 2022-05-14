import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

export interface IAdminDashboardWidgetProps {
  backgroundColor: string;
  icon: React.ReactNode | JSX.Element;
  title: string;
  value: string;
  titleColor: string;
  valueColor: string;
  iconColor: string;
  isLoading: boolean;
  iconBgImageColor: string;
}

function AdminDashboardWidget(props: IAdminDashboardWidgetProps) {
  const {
    icon,
    title,
    value,
    titleColor,
    valueColor,
    iconColor,
    backgroundColor,
    isLoading,
    iconBgImageColor,
  } = props;
  return (
    <Box
      sx={{
        padding: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
        borderRadius: "16px",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          color: "rgb(0, 123, 85)",
          backgroundImage: iconBgImageColor,
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& .MuiSvgIcon-root": {
            color: iconColor,
            width: "32px",
            height: "32px",
          },
        }}
      >
        {icon}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "8px",
        }}
      >
        {isLoading ? (
          <>
            <Skeleton
              variant="rectangular"
              height="40px"
              width="150px"
              animation="wave"
              sx={{
                marginBottom: "4px",
                marginTop: "4px",
                borderRadius: "4px",
              }}
            />
          </>
        ) : (
          <Typography
            sx={{
              color: valueColor,
              fontSize: "2rem",
              fontWeight: 600,
            }}
          >
            {value}
          </Typography>
        )}
        <Typography
          sx={{
            color: titleColor,
            fontSize: "1rem",
            opacity: "0.72",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}

export default AdminDashboardWidget;
