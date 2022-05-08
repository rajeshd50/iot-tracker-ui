import React from "react";
import GoogleMapReact from "google-map-react";
import { alpha, Box } from "@mui/material";
import {
  Device,
  DeviceAssignStatus,
  DeviceStatus,
} from "../../../../../models";
import AppImage from "../../../../../common/components/system/AppImage/AppImage";
import { grey } from "@mui/material/colors";

export interface IUserDeviceMapProps {
  device: Device;
}

function UserDeviceMap({ device }: IUserDeviceMapProps) {
  if (
    device.status === DeviceStatus.INACTIVE ||
    device.assignStatus !== DeviceAssignStatus.ASSIGNED
  ) {
    return (
      <Box
        sx={{
          height: "calc(100vh - 190px)",
          width: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              backgroundColor: alpha(grey[400], 0.6),
              zIndex: 10,
            }}
          ></Box>
          <AppImage
            src="/img/default_map_placeholder.jpeg"
            imgProps={{
              width: "100%",
              height: "100%",
            }}
            alt="Default map"
          />
        </Box>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        height: "calc(100vh - 190px)",
        width: "100%",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY || "" }}
        defaultCenter={{
          lat: 22.5726,
          lng: 88.3639,
        }}
        defaultZoom={16}
      ></GoogleMapReact>
    </Box>
  );
}

export default UserDeviceMap;
