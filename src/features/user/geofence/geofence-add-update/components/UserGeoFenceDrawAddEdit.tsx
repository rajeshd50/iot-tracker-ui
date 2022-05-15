import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Autocomplete,
  DrawingManager,
  Circle,
  Rectangle,
  Polygon,
} from "@react-google-maps/api";
import {
  IUserGeoFenceDrawerLoaderProps,
  UpdateFenceParams,
} from "./UserGeoFenceDrawerLoader";
import UserGeoFenceDrawingControl from "./UserGeoFenceDrawingControl";
import { GeoBound, GeoFenceType } from "../../../../../models";

export interface IUserGeoFenceDrawAddEditProps
  extends IUserGeoFenceDrawerLoaderProps {}

function UserGeoFenceDrawAddEdit(props: IUserGeoFenceDrawAddEditProps) {
  const {
    geoFence,
    isViewOnly,
    onUpdateFence,
    isEdit,
    shouldDisableAddEdit = false,
    containerHeight = "calc(100vh - 200px)",
    isMdFull = false,
  } = props;
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
    lat: 22.5726,
    lng: 88.3639,
  });
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapDrawer, setMapDrawer] =
    useState<google.maps.drawing.DrawingManager | null>(null);
  const [currentDrawingMode, setCurrentDrawingMode] = useState<
    google.maps.drawing.OverlayType | null | undefined
  >(null);
  const [circleObj, setCircleObj] = useState<google.maps.Circle | null>(null);
  const [polygonObj, setPolygonObj] = useState<google.maps.Polygon | null>(
    null
  );
  const [rectangleObj, setRectangleObj] =
    useState<google.maps.Rectangle | null>(null);

  const [isDrawingComplete, setIsDrawingComplete] = useState(false);

  useEffect(() => {
    if (geoFence && map) {
      if (geoFence.bound) {
        map.fitBounds(
          new google.maps.LatLngBounds(
            {
              lat: geoFence.bound.south,
              lng: geoFence.bound.west,
            },
            {
              lat: geoFence.bound.north,
              lng: geoFence.bound.east,
            }
          )
        );
      }
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
  }, [map, geoFence]);

  const onAutoCompleteLoad = (instance: google.maps.places.Autocomplete) => {
    setAutocomplete(instance);
  };

  const onDrawManagerLoad = (instance: google.maps.drawing.DrawingManager) => {
    setMapDrawer(instance);
  };

  const getMapBound = (): GeoBound | null => {
    const bounds = map?.getBounds();
    if (!bounds) {
      return null;
    }
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    return {
      north: ne.lat(),
      south: sw.lat(),
      east: ne.lng(),
      west: sw.lng(),
    };
  };

  const getRectangleBound = (): GeoBound | null => {
    const bounds = rectangleObj?.getBounds();
    if (!bounds) {
      return null;
    }
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    return {
      north: ne.lat(),
      south: sw.lat(),
      east: ne.lng(),
      west: sw.lng(),
    };
  };

  const getDataFromCircle = (): UpdateFenceParams | null => {
    const mapBound = getMapBound();
    if (!mapBound) {
      return null;
    }
    const response: UpdateFenceParams = {
      coordinates: [],
      type: GeoFenceType.CIRCLE,
      bound: mapBound,
    };
    if (!circleObj) {
      return null;
    }
    const center = circleObj.getCenter();
    if (!center) {
      return null;
    }
    response.circleCenter = {
      lat: center.lat(),
      lng: center.lng(),
    };
    response.circleRadius = circleObj.getRadius();
    const radius = circleObj.getRadius() * 0.000621371;
    const d2r = Math.PI / 180;
    const r2d = 180 / Math.PI;
    const circumference = 2 * Math.PI * circleObj.getRadius();
    const points = Math.ceil(circumference / 100);
    const earthRadius = 3963;

    const rLat = (radius / earthRadius) * r2d;
    const rLng = rLat / Math.cos(center.lat() * d2r);

    const start = 0;
    const end = points + 1;

    for (let i = start; i < end; i += 1) {
      const theta = Math.PI * (i / (points / 2));
      const ey = center.lng() + rLng * Math.cos(theta);
      const ex = center.lat() + rLat * Math.sin(theta);
      response.coordinates.push({ lat: ex, lng: ey });
    }

    return response;
  };

  const getDataFromRectangle = (): UpdateFenceParams | null => {
    const mapBound = getMapBound();
    if (!mapBound) {
      return null;
    }
    const response: UpdateFenceParams = {
      coordinates: [],
      type: GeoFenceType.RECTANGLE,
      bound: mapBound,
    };
    if (!rectangleObj) {
      return null;
    }
    const rectangleBound = getRectangleBound();
    if (!rectangleBound) {
      return null;
    }
    response.rectangleBound = rectangleBound;
    response.coordinates.push({
      lat: rectangleBound.north,
      lng: rectangleBound.west,
    });

    response.coordinates.push({
      lat: rectangleBound.north,
      lng: rectangleBound.east,
    });
    response.coordinates.push({
      lat: rectangleBound.south,
      lng: rectangleBound.east,
    });
    response.coordinates.push({
      lat: rectangleBound.south,
      lng: rectangleBound.west,
    });

    response.coordinates.push({
      lat: rectangleBound.north,
      lng: rectangleBound.west,
    });
    return response;
  };

  const getDataFromPolygon = (): UpdateFenceParams | null => {
    const mapBound = getMapBound();
    if (!mapBound) {
      return null;
    }
    const response: UpdateFenceParams = {
      coordinates: [],
      type: GeoFenceType.POLYGON,
      bound: mapBound,
    };
    if (!polygonObj) {
      return null;
    }
    const paths = polygonObj.getPath().getArray();
    for (let i = 0; i < paths.length; i++) {
      response.coordinates.push({
        lat: paths[i].lat(),
        lng: paths[i].lng(),
      });
    }
    response.coordinates.push({
      lat: paths[0].lat(),
      lng: paths[0].lng(),
    });
    return response;
  };

  const updateFenceObject = () => {
    if (shouldDisableAddEdit) {
      return;
    }
    if (circleObj) {
      onUpdateFence(getDataFromCircle() || undefined);
    } else if (rectangleObj) {
      onUpdateFence(getDataFromRectangle() || undefined);
    } else if (polygonObj) {
      onUpdateFence(getDataFromPolygon() || undefined);
    }
  };

  useEffect(() => {
    if (isDrawingComplete) {
      updateFenceObject();
    }
  }, [isDrawingComplete]);

  useEffect(() => {
    if (!circleObj && !rectangleObj && !polygonObj) {
      onUpdateFence(undefined);
      setIsDrawingComplete(false);
    } else {
      setIsDrawingComplete(true);
    }
  }, [circleObj, rectangleObj, polygonObj, onUpdateFence]);

  const onDrawingModeChange = (
    newMode: google.maps.drawing.OverlayType | null | undefined
  ) => {
    setCurrentDrawingMode(newMode);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (map && place && place.geometry && place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      }
    }
  };
  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    polygon.setVisible(false);
    setPolygonObj(polygon);
    setCurrentDrawingMode(null);
  };
  const onCircleComplete = (circle: google.maps.Circle) => {
    circle.setVisible(false);
    setCircleObj(circle);
    setCurrentDrawingMode(null);
  };
  const onRectangleComplete = (rectangle: google.maps.Rectangle) => {
    rectangle.setVisible(false);
    setRectangleObj(rectangle);
    setCurrentDrawingMode(null);
  };
  const onRemoveClick = () => {
    if (circleObj) {
      circleObj.setMap(null);
      setCircleObj(null);
    } else if (rectangleObj) {
      rectangleObj.setMap(null);
      setRectangleObj(null);
    } else if (polygonObj) {
      polygonObj.setMap(null);
      setPolygonObj(null);
    }
  };
  return (
    <Box
      sx={{
        height: containerHeight,
        width: "100%",
        padding: isMdFull
          ? {
              xs: "0",
              sm: "0",
              md: "0",
              lg: "0",
              xl: "0 15px 0 0",
            }
          : {
              xs: "0",
              sm: "0",
              md: "0 15px 0 0",
              lg: "0 15px 0 0",
            },
        position: "relative",
        marginBottom: isMdFull
          ? {
              xs: "15px",
              sm: "15px",
              md: "15px",
              lg: "15px",
              xl: "0",
            }
          : {
              xs: "15px",
              sm: "15px",
              md: "0",
              lg: "0",
            },
      }}
    >
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        center={mapCenter}
        onLoad={(mapInstance) => setMap(mapInstance)}
        onBoundsChanged={updateFenceObject}
        options={{
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        {!shouldDisableAddEdit && (
          <Autocomplete
            onLoad={onAutoCompleteLoad}
            onPlaceChanged={onPlaceChanged}
          >
            <TextField
              type="text"
              placeholder="Search for places"
              sx={{
                position: "absolute",
                textOverflow: "ellipsis",
                width: "300px",
                left: "50%",
                marginLeft: "-150px",
                backgroundColor: "#ffffff",
                borderRadius: "4px",
                top: "8px",
              }}
            />
          </Autocomplete>
        )}
        {!isDrawingComplete ? (
          <DrawingManager
            onLoad={onDrawManagerLoad}
            onPolygonComplete={onPolygonComplete}
            onCircleComplete={onCircleComplete}
            onRectangleComplete={onRectangleComplete}
            options={{
              drawingControl: false,
              drawingMode: currentDrawingMode,
            }}
          />
        ) : null}
        {circleObj ? (
          <Circle
            center={circleObj.getCenter() || undefined}
            radius={circleObj.getRadius()}
            onDragEnd={updateFenceObject}
            onMouseUp={updateFenceObject}
            onCenterChanged={updateFenceObject}
            onRadiusChanged={updateFenceObject}
            draggable={!shouldDisableAddEdit}
            editable={!shouldDisableAddEdit}
          />
        ) : null}
        {rectangleObj ? (
          <Rectangle
            bounds={rectangleObj.getBounds() || undefined}
            onDragEnd={updateFenceObject}
            onMouseUp={updateFenceObject}
            onBoundsChanged={updateFenceObject}
            draggable={!shouldDisableAddEdit}
            editable={!shouldDisableAddEdit}
          />
        ) : null}
        {polygonObj ? (
          <Polygon
            paths={polygonObj.getPaths()}
            onDragEnd={updateFenceObject}
            onMouseUp={updateFenceObject}
            draggable={!shouldDisableAddEdit}
            editable={!shouldDisableAddEdit}
          />
        ) : null}
        {!shouldDisableAddEdit && (
          <UserGeoFenceDrawingControl
            currentMode={currentDrawingMode}
            setMode={onDrawingModeChange}
            isDrawingComplete={isDrawingComplete}
            onRemoveClick={onRemoveClick}
          />
        )}
      </GoogleMap>
    </Box>
  );
}

export default UserGeoFenceDrawAddEdit;
