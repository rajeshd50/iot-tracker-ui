import { Box, alpha } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import AppImage from "../../../../../../common/components/system/AppImage/AppImage";

function UserDeviceMapFallback() {
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

export default UserDeviceMapFallback;
