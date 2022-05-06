import { Box, Button, ButtonProps, Typography } from "@mui/material";
import React from "react";
import AppImage from "../system/AppImage/AppImage";

export interface INoDataFallbackProps {
  title?: string;
  showActionButton?: boolean;
  actionButtonText?: string;
  onActionButtonClick?: () => void;
  buttonProps?: ButtonProps;
}

function NoDataFallback(props: INoDataFallbackProps) {
  const {
    title = "No data available",
    showActionButton = false,
    actionButtonText = "Go to homepage",
    onActionButtonClick,
    buttonProps = {},
  } = props;

  const onButtonClick = () => {
    if (onActionButtonClick) {
      onActionButtonClick();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box>
        <AppImage
          src="/img/no_data.png"
          alt="No data available to show"
          imgProps={{
            width: "250px",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">{title}</Typography>
        {showActionButton ? (
          <Button
            color="primary"
            variant="contained"
            onClick={onButtonClick}
            {...buttonProps}
            sx={{
              marginTop: "16px",
            }}
          >
            {actionButtonText}
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}

export default NoDataFallback;
