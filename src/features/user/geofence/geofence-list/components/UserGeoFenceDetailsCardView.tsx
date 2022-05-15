import { Box, Button, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { GeoFence } from "../../../../../models";
import GeoFenceActiveStatusChip from "../../../../../common/components/geo-fence/geo-fence-active-chip/GeoFenceActiveStatusChip";
import { ROUTES } from "../../../../../constants";
import { encodeGeoFenceId } from "../../../../../common/util/util";
import GeoFenceDescription from "../../../../../common/components/geo-fence/geo-fence-description/GeoFenceDescription";
import GeoFenceAddedDateStatus from "../../../../../common/components/geo-fence/geo-fence-added-date-status/GeoFenceAddedDateStatus";
import GeoFenceConnectedDeviceStatus from "../../../../../common/components/geo-fence/geo-fence-connected-devices-status/GeoFenceConnectedDeviceStatus";
import { IUserGeoFenceDetailsListViewProps } from "./UserGeoFenceDetailsListView";

export interface IUserGeoFenceDetailsCardViewProps
  extends IUserGeoFenceDetailsListViewProps {}

function UserGeoFenceDetailsCardView({
  geoFence,
}: IUserGeoFenceDetailsCardViewProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const getBorderColor = () => {
    if (geoFence.isActive) {
      return theme.palette.success.main;
    }
    return grey[600];
  };
  return (
    <Box
      sx={{
        margin: "15px 0",
        borderRadius: "4px",
        padding: "15px",
        position: "relative",
        border: `1px solid ${grey[200]}`,
        width: "100%",
        borderTop: `4px solid ${getBorderColor()}`,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">
                {geoFence.name || "Untitled"}
              </Typography>
            </Box>
            <Box>
              <GeoFenceActiveStatusChip isActive={geoFence.isActive} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <GeoFenceDescription description={geoFence.description} />
        </Grid>
        <Grid item xs={12}>
          <GeoFenceAddedDateStatus dateCreated={geoFence.createdAt} />
        </Grid>
        <Grid item xs={12}>
          <GeoFenceConnectedDeviceStatus
            connectedDevices={geoFence.attachedDeviceSerials}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: `1px solid ${grey[200]}`,
              paddingTop: "15px",
              marginTop: "8px",
            }}
          >
            <Button
              onClick={() =>
                navigate(
                  ROUTES.USER.GEO_FENCE_EDIT.replace(
                    ":id",
                    encodeGeoFenceId(geoFence.id)
                  )
                )
              }
              color="secondary"
              variant="text"
              sx={{
                marginRight: "8px",
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() =>
                navigate(
                  ROUTES.USER.GEO_FENCE_DETAILS.replace(
                    ":id",
                    encodeGeoFenceId(geoFence.id)
                  )
                )
              }
              color="primary"
              variant="outlined"
              sx={{
                minWidth: "130px",
              }}
            >
              View Details
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserGeoFenceDetailsCardView;
