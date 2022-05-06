import { Box, Button, Grid, Typography } from "@mui/material";
import { blue, brown, grey, red, yellow } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useNavigate } from "react-router-dom";
import DeviceAddedDateStatus from "../../../../../common/components/device/device-added-date-status/DeviceAddedDateStatus";

import DeviceAssignStatusChip from "../../../../../common/components/device/device-assign-status-chip/DeviceAssignStatusChip";
import DeviceLastSeenStatus from "../../../../../common/components/device/device-last-seen-status/DeviceLastSeenStatus";
import DeviceLiveStatusIndicator from "../../../../../common/components/device/device-live-status-indicator/DeviceLiveStatusIndicator";
import DeviceSerialNumberChip from "../../../../../common/components/device/device-serial-number-chip/DeviceSerialNumberChip";
import DeviceStatusChip from "../../../../../common/components/device/device-status-chip/DeviceStatusChip";
import { encodeDeviceSerial } from "../../../../../common/util/util";
import { ROUTES } from "../../../../../constants";
import {
  Device,
  DeviceAssignStatus,
  DeviceLiveStatus,
  DeviceStatus,
} from "../../../../../models";

export interface IUserDeviceDetailsListViewProps {
  device: Device;
  onClickEdit: (deviceData: Device) => void;
}

function UserDeviceDetailsListView({
  device,
  onClickEdit,
}: IUserDeviceDetailsListViewProps) {
  const theme = useTheme();
  const shouldBreakDates = useMediaQuery("(max-width:1300px)");
  const navigate = useNavigate();
  const deviceName = [device.name, device.vehicleName]
    .filter((x) => !!x)
    .join(", ");
  const getBorderColor = () => {
    if (device.assignStatus === DeviceAssignStatus.PENDING_APPROVAL) {
      return theme.palette.warning.main;
    }
    if (device.status === DeviceStatus.INACTIVE) {
      return grey[600];
    }
    if (device.liveStatus === DeviceLiveStatus.ONLINE) {
      return theme.palette.success.main;
    }
    if (device.liveStatus === DeviceLiveStatus.OFFLINE) {
      return theme.palette.error.main;
    }
    return grey[600];
  };
  return (
    <Box
      sx={{
        margin: "15px 0",
        borderRadius: "4px",
        padding: "15px",
        position: "relative",
        border: `1px solid ${grey[200]}`,
        width: "100%",
        borderLeft: `4px solid ${getBorderColor()}`,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography variant="h5">{deviceName || "Untitled"}</Typography>
              {device.vehicleNumber ? (
                <Typography
                  variant="subtitle2"
                  sx={{
                    textTransform: "uppercase",
                    marginLeft: "8px",
                    marginTop: "4px",
                  }}
                >
                  ({device.vehicleNumber})
                </Typography>
              ) : null}
            </Box>
            <Box>
              {device.assignStatus === DeviceAssignStatus.PENDING_APPROVAL ? (
                <DeviceAssignStatusChip status={device.assignStatus} />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      marginRight: "4px",
                    }}
                  >
                    <DeviceStatusChip status={device.status} />
                  </Box>
                  <Box>
                    <DeviceLiveStatusIndicator
                      type="chip"
                      status={device.liveStatus}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <DeviceSerialNumberChip serial={device.serial} />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "stretch",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: shouldBreakDates ? "flex-start" : "center",
                flexDirection: shouldBreakDates ? "column" : "row",
              }}
            >
              <Box
                sx={{
                  marginRight: "8px",
                  paddingRight: "8px",
                  borderRight: shouldBreakDates
                    ? "none"
                    : `1px solid ${grey[300]}`,
                }}
              >
                <DeviceAddedDateStatus
                  approvalRequestedAt={device.approvalRequestedAt}
                  approvedAt={device.approvedAt}
                />
              </Box>
              <Box>
                <DeviceLastSeenStatus lastSeenAt={device.lastSeenAt} />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => onClickEdit(device)}
                color="secondary"
                variant="text"
                sx={{
                  marginRight: "8px",
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() =>
                  navigate(
                    ROUTES.USER.DEVICE_DETAILS.replace(
                      ":serial",
                      encodeDeviceSerial(device.serial)
                    )
                  )
                }
                disabled={
                  device.assignStatus !== DeviceAssignStatus.ASSIGNED ||
                  device.status !== DeviceStatus.ACTIVE
                }
                color="primary"
                variant="outlined"
                sx={{
                  minWidth: "130px",
                }}
              >
                View Details
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserDeviceDetailsListView;
