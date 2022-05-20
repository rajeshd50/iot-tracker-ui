import { Button, CircularProgress } from "@mui/material";
import isAfter from "date-fns/isAfter";
import React from "react";
import { DeviceFirmware } from "../../../../../../models";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export interface IAdminFirmwareFileDownloadProps {
  firmware: DeviceFirmware;
  onRegenerateLink: (firmware: DeviceFirmware) => void;
  isLoading: boolean;
}

function AdminFirmwareFileDownload({
  firmware,
  onRegenerateLink,
  isLoading,
}: IAdminFirmwareFileDownloadProps) {
  const isExpired =
    firmware.signedUrl && firmware.signedUrlExpiresAt
      ? isAfter(new Date(), new Date(firmware.signedUrlExpiresAt))
      : true;

  const onClickButton = () => {
    if (isExpired) {
      onRegenerateLink(firmware);
    } else {
      window.open(firmware.signedUrl, "_blank");
    }
  };
  return (
    <Button
      variant="outlined"
      color={isExpired ? "warning" : "success"}
      startIcon={
        isLoading ? null : isExpired ? <AutorenewIcon /> : <CloudDownloadIcon />
      }
      onClick={onClickButton}
      disabled={isLoading}
      size="small"
    >
      {isLoading && (
        <CircularProgress
          size="1rem"
          color="primary"
          sx={{
            marginRight: "8px",
          }}
        />
      )}
      {isExpired ? "Generate Link" : "Download"}
    </Button>
  );
}

export default AdminFirmwareFileDownload;
