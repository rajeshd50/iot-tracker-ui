import React, { useEffect, useState } from "react";
import { Marker } from "@react-google-maps/api";

function UserDeviceLocationMarker() {
  const [position, setPosition] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral | undefined
  >(undefined);
  const onLoad = (marker: google.maps.Marker) => {};

  useEffect(() => {
    setPosition({
      lat: 22.5726,
      lng: 88.3639,
    });
  }, []);

  if (!position) {
    return null;
  }
  return (
    <Marker
      onLoad={onLoad}
      position={position}
      icon={{
        url: "http://maps.google.com/mapfiles/kml/shapes/cabs.png",
        scaledSize: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
      }}
    />
  );
}

export default UserDeviceLocationMarker;
