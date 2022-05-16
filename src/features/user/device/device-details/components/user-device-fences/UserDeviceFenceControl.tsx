import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  Button,
  Chip,
  Skeleton,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Device, GeoFence } from "../../../../../../models";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GeoFenceService } from "../../../../../../services";
import { useSnackbar } from "notistack";
import UserDeviceAddFenceDialog from "./UserDeviceAddFenceDialog";
import ConfirmDialog from "../../../../../../common/components/confirm-dialog/ConfirmDialog";
import { useAppDispatch } from "../../../../../../store/hooks";
import {
  resetDeviceGeoFencesInReducer,
  setDeviceGeoFencesInReducer,
  setFocusFenceInReducer,
} from "../../../../../../store/reducers/deviceGeoFencesSlice";

export interface IUserDeviceFenceControlProps {
  device: Device;
}

function UserDeviceFenceControl(props: IUserDeviceFenceControlProps) {
  const { device } = props;
  const [geoFences, setGeoFences] = useState<GeoFence[]>([]);
  const [totalGeoFences, setTotalGeoFences] = useState(0);
  const [isGeoFencesLoading, setIsGeoFencesLoading] = useState(false);
  const dispatch = useAppDispatch();

  const [showDeviceAttachFenceDialog, setShowDeviceAttachFenceDialog] =
    useState(false);
  const [isDeviceAttachFenceLoading, setIsDeviceAttachFenceLoading] =
    useState(false);

  const [showGeoFenceDisconnectConfirm, setShowGeoFenceDisconnectConfirm] =
    useState(false);
  const [isGeoFenceDisconnectLoading, setIsGeoFenceDisconnectLoading] =
    useState(false);
  const [geoFenceToDisconnect, setGeoFenceToDisconnect] =
    useState<GeoFence | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const loadGeoFences = async () => {
    dispatch(resetDeviceGeoFencesInReducer());
    try {
      setIsGeoFencesLoading(true);
      const geoFencePaginatedResp = await GeoFenceService.fetchDeviceAllFences({
        deviceSerial: device.serial,
      });
      setGeoFences(geoFencePaginatedResp.items || []);
      dispatch(setDeviceGeoFencesInReducer(geoFencePaginatedResp.items));
      setTotalGeoFences(geoFencePaginatedResp.total);
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Unable to fetch geo fences",
        {
          variant: "error",
        }
      );
    } finally {
      setIsGeoFencesLoading(false);
    }
  };

  const loadGeoFenceCallback = useCallback(async () => {
    await loadGeoFences();
  }, [device]);

  useEffect(() => {
    loadGeoFenceCallback();
  }, [device, loadGeoFenceCallback]);

  // device add fence functions starts
  const onClickAttachFence = () => {
    setShowDeviceAttachFenceDialog(true);
  };
  const onCloseAttachFence = () => {
    setShowDeviceAttachFenceDialog(false);
  };
  const onAttachFence = async (fenceId: string) => {
    try {
      setIsDeviceAttachFenceLoading(true);
      await GeoFenceService.addToDevice({
        fenceId,
        deviceId: device.id,
      });
      enqueueSnackbar("Device successfully attached to geo-fence", {
        variant: "success",
      });
      await loadGeoFences();
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Unable to attach geo fences to device",
        {
          variant: "error",
        }
      );
    } finally {
      setIsDeviceAttachFenceLoading(false);
      onCloseAttachFence();
    }
  };
  // device add fence functions ends

  // device disconnect functions starts
  const onClickRemoveFence = (fence: GeoFence) => {
    setGeoFenceToDisconnect(fence);
    setShowGeoFenceDisconnectConfirm(true);
  };
  const onCloseFenceDisconnect = () => {
    setGeoFenceToDisconnect(null);
    setShowGeoFenceDisconnectConfirm(false);
  };
  const onFenceDisconnect = async () => {
    if (!geoFenceToDisconnect) {
      return;
    }
    try {
      setIsGeoFenceDisconnectLoading(true);
      await GeoFenceService.removeFromDevice({
        fenceId: geoFenceToDisconnect.id,
        deviceId: device.id,
      });
      enqueueSnackbar("Device successfully disconnected from geo-fence", {
        variant: "success",
      });
      await loadGeoFences();
    } catch (e) {
      enqueueSnackbar("Error while disconnecting device from geo-fence", {
        variant: "error",
      });
    } finally {
      setIsGeoFenceDisconnectLoading(false);
      onCloseFenceDisconnect();
    }
  };
  // device disconnect functions ends

  const onClickShouldFocusFence = (fence: GeoFence) => {
    dispatch(setFocusFenceInReducer(fence));
  };

  const getLoadingSkeleton = () => {
    return (
      <Box
        sx={{
          width: "100%",
          maxHeight: "250px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginTop: "4px",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="120px"
          height="32px"
          sx={{
            borderRadius: "8px",
            marginRight: "4px",
          }}
        />
        <Skeleton
          variant="rectangular"
          width="120px"
          height="32px"
          sx={{
            borderRadius: "8px",
            marginRight: "4px",
          }}
        />
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Accordion
        elevation={0}
        sx={{
          "&.MuiPaper-root": {
            filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.32))",
          },
        }}
        expanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="device-driver-details-content"
          id="device-driver-details-header"
        >
          <Typography>Geo-fences</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {!isGeoFencesLoading ? (
                  <Typography variant="subtitle1">
                    {totalGeoFences
                      ? `Total ${totalGeoFences} fences`
                      : "No geo-fence attached!"}
                  </Typography>
                ) : (
                  <Skeleton variant="text" width="100px" />
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  disabled={isGeoFencesLoading}
                  onClick={onClickAttachFence}
                >
                  Connect geo-fence
                </Button>
              </Box>
            </Grid>
            {isGeoFencesLoading ? getLoadingSkeleton() : null}
            {totalGeoFences ? (
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    maxHeight: "250px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    marginTop: "4px",
                  }}
                >
                  {geoFences.map((geoFence) => (
                    <Chip
                      key={geoFence.id}
                      label={geoFence.name}
                      variant="outlined"
                      color="secondary"
                      sx={{
                        marginRight: "4px",
                        marginBottom: "8px",
                      }}
                      onClick={() => onClickShouldFocusFence(geoFence)}
                      onDelete={() => onClickRemoveFence(geoFence)}
                    />
                  ))}
                </Box>
              </Grid>
            ) : null}
          </Grid>
        </AccordionDetails>
      </Accordion>
      {showDeviceAttachFenceDialog && (
        <UserDeviceAddFenceDialog
          device={device}
          loading={isDeviceAttachFenceLoading}
          show={showDeviceAttachFenceDialog}
          onClose={onCloseAttachFence}
          onGeoFenceAssign={onAttachFence}
        />
      )}
      {showGeoFenceDisconnectConfirm && geoFenceToDisconnect ? (
        <ConfirmDialog
          title="Confirm to disconnect geo-fence from this device"
          subTitle={`Geo-fence (${geoFenceToDisconnect.name}) will be disconnected from this device (serial no: ${device.serial}), and you will not receive any further alerts from this device/geo-fence events!`}
          show={showGeoFenceDisconnectConfirm}
          onCancel={onCloseFenceDisconnect}
          onConfirm={onFenceDisconnect}
          isLoading={isGeoFenceDisconnectLoading}
          confirmColor="error"
          cancelColor="secondary"
          confirmText="Disconnect"
          cancelText="Cancel"
        />
      ) : null}
    </Box>
  );
}

export default UserDeviceFenceControl;
