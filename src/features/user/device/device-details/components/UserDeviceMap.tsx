import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  Device,
  DeviceAssignStatus,
  DeviceStatus,
  GeoFence,
} from "../../../../../models";
import { GoogleMap } from "@react-google-maps/api";
import { IUserDeviceMapLoaderProps } from "./UserDeviceMapLoader";
import UserDeviceMapFallback from "./maps/UserDeviceMapFallback";
import {
  selectDeviceGeoFences,
  selectFocusFence,
} from "../../../../../store/reducers/deviceGeoFencesSlice";
import { useAppSelector } from "../../../../../store/hooks";
import UserDeviceGeoFenceDraw from "./maps/UserDeviceGeoFenceDraw";
import UserDeviceLocationMarker from "./maps/UserDeviceLocationMarker";

export interface IUserDeviceMapProps extends IUserDeviceMapLoaderProps {}

function UserDeviceMap({ device }: IUserDeviceMapProps) {
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
    lat: 22.5726,
    lng: 88.3639,
  });
  const [mapZoom, setMapZoom] = useState(14);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const deviceGeoFences: GeoFence[] = useAppSelector(selectDeviceGeoFences);
  const shouldFocusFence: GeoFence | undefined =
    useAppSelector(selectFocusFence);

  useEffect(() => {
    if (shouldFocusFence && shouldFocusFence.bound && map) {
      map.fitBounds(
        new google.maps.LatLngBounds(
          {
            lat: shouldFocusFence.bound.south,
            lng: shouldFocusFence.bound.west,
          },
          {
            lat: shouldFocusFence.bound.north,
            lng: shouldFocusFence.bound.east,
          }
        )
      );
    }
  }, [shouldFocusFence, map]);

  if (
    device.status === DeviceStatus.INACTIVE ||
    device.assignStatus !== DeviceAssignStatus.ASSIGNED
  ) {
    return <UserDeviceMapFallback />;
  }
  return (
    <Box
      sx={{
        height: "calc(100vh - 190px)",
        width: "100%",
      }}
    >
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        center={mapCenter}
        zoom={mapZoom}
        onLoad={(mapInstance) => setMap(mapInstance)}
        options={{
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <UserDeviceLocationMarker />
        {deviceGeoFences && deviceGeoFences.length ? (
          <>
            {deviceGeoFences.map((deviceFence) => (
              <UserDeviceGeoFenceDraw
                geoFence={deviceFence}
                key={deviceFence.id}
              />
            ))}
          </>
        ) : null}
      </GoogleMap>
    </Box>
  );
}

export default UserDeviceMap;
