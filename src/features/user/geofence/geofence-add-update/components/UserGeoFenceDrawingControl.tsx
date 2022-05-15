import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import React from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import PolylineOutlinedIcon from "@mui/icons-material/PolylineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export interface IUserGeoFenceDrawingControlProps {
  currentMode: google.maps.drawing.OverlayType | null | undefined;
  setMode: (mode: google.maps.drawing.OverlayType | null | undefined) => void;
  isDrawingComplete?: boolean;
  shouldShow?: boolean;
  onRemoveClick: () => void;
}

function UserGeoFenceDrawingControl(props: IUserGeoFenceDrawingControlProps) {
  const {
    currentMode,
    setMode,
    isDrawingComplete,
    shouldShow = true,
    onRemoveClick,
  } = props;
  const theme = useTheme();
  if (!shouldShow) {
    return null;
  }
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        marginBottom: "8px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!isDrawingComplete ? (
        <>
          <Box>
            <ToggleButtonGroup
              color="primary"
              value={currentMode}
              exclusive
              onChange={(event, value) => setMode(value)}
              sx={{
                backgroundColor: theme.palette.grey[50],
              }}
            >
              <ToggleButton value={google.maps.drawing.OverlayType.CIRCLE}>
                <CircleOutlinedIcon />
              </ToggleButton>
              <ToggleButton value={google.maps.drawing.OverlayType.RECTANGLE}>
                <RectangleOutlinedIcon />
              </ToggleButton>
              <ToggleButton value={google.maps.drawing.OverlayType.POLYGON}>
                <PolylineOutlinedIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </>
      ) : (
        <>
          <Button
            startIcon={<DeleteOutlineIcon />}
            variant="contained"
            color="error"
            onClick={onRemoveClick}
          >
            Remove
          </Button>
        </>
      )}
    </Box>
  );
}

export default UserGeoFenceDrawingControl;
