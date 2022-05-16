import { Box, Fab, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";

import UserDeviceSidePanel from "./components/UserDeviceSidePanel";
import { Device } from "../../../../models/device.model";
import DeviceDetailsWidget from "../../../../common/components/device/device-details-widget/DeviceDetailsWidget";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../constants";
import { decodeDeviceSerial } from "../../../../common/util/util";
import { useSnackbar } from "notistack";
import { DeviceService } from "../../../../services";
import PageDataLoader from "../../../../common/components/page-data-loader/PageDataLoader";
import UserDeviceMapLoader from "./components/UserDeviceMapLoader";
import { useAppDispatch } from "../../../../store/hooks";
import {
  resetAllDeviceGeoFences,
  setDeviceDetailsInReducer,
} from "../../../../store/reducers/deviceGeoFencesSlice";

function UserDeviceDetails() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const onCloseSidePanel = () => {
    setIsMobileOpen(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  const params = useParams();
  const navigate = useNavigate();
  const [deviceDetails, setDeviceDetails] = useState<Device | null>(null);
  const [deviceDetailsLoading, setDeviceDetailsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const gotoDeviceList = () => {
    navigate(ROUTES.USER.DEVICE_LIST);
  };

  const loadDeviceDetails = async () => {
    const encodedDeviceSerial = params.serial;
    if (!encodedDeviceSerial) {
      return;
    }
    dispatch(resetAllDeviceGeoFences());
    const decodedSerial = decodeDeviceSerial(encodedDeviceSerial);
    try {
      setDeviceDetailsLoading(true);
      const deviceData = await DeviceService.details({
        serial: decodedSerial,
      });
      if (deviceData) {
        setDeviceDetails(deviceData);
        dispatch(setDeviceDetailsInReducer(deviceData));
      } else {
        setDeviceDetailsLoading(false);
        throw new Error("Invalid device");
      }
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Error while fetching device details",
        {
          variant: "error",
        }
      );
      gotoDeviceList();
    } finally {
      setDeviceDetailsLoading(false);
    }
  };

  const loadDeviceDetailsCallback = useCallback(async () => {
    await loadDeviceDetails();
  }, [params]);

  useEffect(() => {
    if (params.serial) {
      loadDeviceDetailsCallback();
    } else {
      gotoDeviceList();
    }
  }, [params, loadDeviceDetailsCallback]);

  if (!deviceDetails || deviceDetailsLoading) {
    return <PageDataLoader />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <DeviceDetailsWidget device={deviceDetails} />
        </Box>
        <UserDeviceMapLoader device={deviceDetails} />
      </Box>
      <Fab
        color="primary"
        aria-label="settings"
        variant="extended"
        size="medium"
        sx={{
          position: "absolute",
          top: "2.7rem",
          right: "0",
          display: {
            xs: "flex",
            sm: "flex",
            md: "none",
          },
        }}
        onClick={() => setIsMobileOpen(true)}
      >
        <SettingsIcon
          sx={{
            marginRight: "4px",
          }}
        />
        <Typography variant="h6">Controls</Typography>
      </Fab>
      <UserDeviceSidePanel
        isMobileOpen={isMobileOpen}
        onClose={onCloseSidePanel}
        device={deviceDetails}
      />
    </Box>
  );
}

export default UserDeviceDetails;
