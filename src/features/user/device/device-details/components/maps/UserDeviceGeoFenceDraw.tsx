import React, { useEffect, useState } from "react";
import { GeoFence, GeoFenceType } from "../../../../../../models";
import { Circle, Rectangle, Polygon } from "@react-google-maps/api";

export interface IUserDeviceGeoFenceDrawProps {
  geoFence: GeoFence;
}

function UserDeviceGeoFenceDraw({ geoFence }: IUserDeviceGeoFenceDrawProps) {
  const [circleObj, setCircleObj] = useState<google.maps.Circle | null>(null);
  const [polygonObj, setPolygonObj] = useState<google.maps.Polygon | null>(
    null
  );
  const [rectangleObj, setRectangleObj] =
    useState<google.maps.Rectangle | null>(null);

  useEffect(() => {
    if (geoFence) {
      if (geoFence.type === GeoFenceType.CIRCLE && geoFence.circleCenter) {
        setCircleObj(
          new google.maps.Circle({
            radius: geoFence.circleRadius,
            center: {
              lat: geoFence.circleCenter.lat,
              lng: geoFence.circleCenter.lng,
            },
          })
        );
      } else if (
        geoFence.type === GeoFenceType.RECTANGLE &&
        geoFence.rectangleBound
      ) {
        setRectangleObj(
          new google.maps.Rectangle({
            bounds: {
              east: geoFence.rectangleBound.east,
              west: geoFence.rectangleBound.west,
              north: geoFence.rectangleBound.north,
              south: geoFence.rectangleBound.south,
            },
          })
        );
      } else if (
        geoFence.type === GeoFenceType.POLYGON &&
        geoFence.coordinates.length
      ) {
        setPolygonObj(
          new google.maps.Polygon({
            paths: geoFence.coordinates,
          })
        );
      }
    }
  }, [geoFence]);

  if (!geoFence) {
    return null;
  }
  if (circleObj) {
    return (
      <Circle
        center={circleObj.getCenter() || undefined}
        radius={circleObj.getRadius()}
        draggable={false}
        editable={false}
      />
    );
  }
  if (rectangleObj) {
    return (
      <Rectangle
        bounds={rectangleObj.getBounds() || undefined}
        draggable={false}
        editable={false}
      />
    );
  }
  if (polygonObj) {
    return (
      <Polygon
        paths={polygonObj.getPaths()}
        draggable={false}
        editable={false}
      />
    );
  }
  return null;
}

export default UserDeviceGeoFenceDraw;
