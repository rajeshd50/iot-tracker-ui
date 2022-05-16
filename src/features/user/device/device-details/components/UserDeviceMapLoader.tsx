import React, { useState } from "react";
import { Device } from "../../../../../models";
import { LoadScript } from "@react-google-maps/api";
import UserDeviceMap from "./UserDeviceMap";
import { Box } from "@mui/material";
import PageDataLoader from "../../../../../common/components/page-data-loader/PageDataLoader";

export interface IUserDeviceMapLoaderProps {
  device: Device;
}

const libraries: any[] = ["places", "drawing", "geometry"];

function UserDeviceMapLoader(props: IUserDeviceMapLoaderProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY || ""}
      libraries={libraries}
      onLoad={() => setIsMapLoaded(true)}
    >
      {isMapLoaded ? (
        <UserDeviceMap {...props} />
      ) : (
        <>
          <Box
            sx={{
              height: "calc(100vh - 190px)",
              width: "100%",
              padding: "0 15px",
              position: "relative",
            }}
          >
            <PageDataLoader />
          </Box>
        </>
      )}
    </LoadScript>
  );
}

export default UserDeviceMapLoader;
