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

export interface IUserGeoFenceDetailsListViewProps {
  geoFence: GeoFence;
}

function UserGeoFenceDetailsListView({
  geoFence,
}: IUserGeoFenceDetailsListViewProps) {
  const theme = useTheme();
  const shouldBreakDates = useMediaQuery("(max-width:1300px)");
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
        borderLeft: `4px solid ${getBorderColor()}`,
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
                alignItems: "center",
              }}
            >
              <Typography variant="h5">
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "stretch",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: shouldBreakDates ? "flex-start" : "center",
                flexDirection: shouldBreakDates ? "column" : "row",
              }}
            >
              <Box
                sx={{
                  marginRight: "8px",
                  paddingRight: "8px",
                  borderRight: shouldBreakDates
                    ? "none"
                    : `1px solid ${grey[300]}`,
                }}
              >
                <GeoFenceAddedDateStatus dateCreated={geoFence.createdAt} />
              </Box>
              <Box>
                <GeoFenceConnectedDeviceStatus
                  connectedDevices={geoFence.attachedDeviceSerials}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserGeoFenceDetailsListView;
