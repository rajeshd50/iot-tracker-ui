import React from "react";
import GoogleMapReact from "google-map-react";
import { Box } from "@mui/material";

function UserDeviceMap() {
  return (
    <Box
      sx={{
        height: "calc(100vh - 112px)",
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
