import React, { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import {
  GeoBound,
  GeoFence,
  GeoFenceCoordinateModel,
  GeoFenceType,
} from "../../../../../models";
import UserGeoFenceDrawAddEdit from "./UserGeoFenceDrawAddEdit";
import { Box, Skeleton } from "@mui/material";

const libraries: any[] = ["places", "drawing", "geometry"];

export interface UpdateFenceParams {
  coordinates: GeoFenceCoordinateModel[];
  type: GeoFenceType;
  bound: GeoBound;
  circleCenter?: GeoFenceCoordinateModel;
  circleRadius?: number;
  rectangleBound?: GeoBound;
}

export interface IUserGeoFenceDrawerLoaderProps {
  geoFence?: GeoFence;
  isViewOnly?: boolean;
  isEdit?: boolean;
  onUpdateFence: (params?: UpdateFenceParams) => void;
  shouldDisableAddEdit?: boolean;
  containerHeight?: string;
  isMdFull?: boolean;
}

function UserGeoFenceDrawerLoader(props: IUserGeoFenceDrawerLoaderProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY || ""}
      libraries={libraries}
      onLoad={() => setIsMapLoaded(true)}
    >
      {isMapLoaded ? (
        <UserGeoFenceDrawAddEdit {...props} />
      ) : (
        <>
          <Box
            sx={{
              height: "calc(100vh - 150px)",
              width: "100%",
              padding: "0 15px",
              position: "relative",
            }}
          >
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </Box>
        </>
      )}
    </LoadScript>
  );
}

export default UserGeoFenceDrawerLoader;
