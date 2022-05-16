import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import PageDataLoader from "../../../../common/components/page-data-loader/PageDataLoader";
import PageHeader from "../../../../common/components/page-header/PageHeader";
import {
  decodeGeoFenceId,
  encodeGeoFenceId,
} from "../../../../common/util/util";
import { ROUTES } from "../../../../constants";
import { GeoFence } from "../../../../models";
import { GeoFenceService } from "../../../../services";
import UserGeoFenceDrawerLoader from "../geofence-add-update/components/UserGeoFenceDrawerLoader";
import GeoFenceDescription from "../../../../common/components/geo-fence/geo-fence-description/GeoFenceDescription";
import GeoFenceActiveStatusChip from "../../../../common/components/geo-fence/geo-fence-active-chip/GeoFenceActiveStatusChip";
import ConfirmDialog from "../../../../common/components/confirm-dialog/ConfirmDialog";
import UserGeoFenceDevicesControl from "./components/UserGeoFenceDevicesControl";

function UserGeoFenceDetails() {
  const { enqueueSnackbar } = useSnackbar();

  const params = useParams();
  const navigate = useNavigate();
  const [geoFenceDetails, setGeoFenceDetails] = useState<GeoFence | null>(null);
  const [geoFenceDetailsLoading, setGeoFenceDetailsLoading] = useState(false);

  const [showToggleStatusConfirm, setShowToggleStatusConfirm] = useState(false);
  const [isToggleStatusLoading, setIsToggleStatusLoading] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const gotoGeoFenceList = () => {
    navigate(ROUTES.USER.GEO_FENCES);
  };

  const loadGeoFenceDetails = async () => {
    const encodedGeoFenceId = params.id;
    if (!encodedGeoFenceId) {
      return;
    }
    const decodedId = decodeGeoFenceId(encodedGeoFenceId);
    try {
      setGeoFenceDetailsLoading(true);
      const geoFenceData = await GeoFenceService.details({
        id: decodedId,
      });
      if (geoFenceData) {
        setGeoFenceDetails(geoFenceData);
      } else {
        setGeoFenceDetailsLoading(false);
        throw new Error("Invalid geo fence");
      }
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Error while fetching feo fence details",
        {
          variant: "error",
        }
      );
      gotoGeoFenceList();
    } finally {
      setGeoFenceDetailsLoading(false);
    }
  };

  const loadGeoFenceDetailsCallback = useCallback(async () => {
    await loadGeoFenceDetails();
  }, [params]);

  useEffect(() => {
    if (params.id) {
      loadGeoFenceDetailsCallback();
    } else {
      gotoGeoFenceList();
    }
  }, [params, loadGeoFenceDetailsCallback]);

  // toggle active function starts
  const onClickToggleActiveStatus = () => {
    setShowToggleStatusConfirm(true);
  };
  const onCancelToggleStatus = () => {
    setShowToggleStatusConfirm(false);
  };

  const onConfirmToggleStatus = async () => {
    if (!geoFenceDetails) {
      return;
    }
    const wasFenceActive = geoFenceDetails.isActive;
    try {
      setIsToggleStatusLoading(true);
      await GeoFenceService.changeStatus({
        id: geoFenceDetails.id,
        isActive: !wasFenceActive,
      });
      enqueueSnackbar(
        `Geo-fence status changed to ${wasFenceActive ? "inactive" : "active"}`,
        {
          variant: "success",
        }
      );
      setGeoFenceDetails({
        ...geoFenceDetails,
        isActive: !wasFenceActive,
      });
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message
          ? e.message
          : `Error while changing geo-fence status to  ${
              wasFenceActive ? "inactive" : "active"
            }`,
        {
          variant: "error",
        }
      );
    } finally {
      setIsToggleStatusLoading(false);
      onCancelToggleStatus();
    }
  };
  // toggle active function ends

  // delete function starts
  const onClickDelete = () => {
    setShowDeleteConfirm(true);
  };
  const onCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const onConfirmDelete = async () => {
    if (!geoFenceDetails) {
      return;
    }
    try {
      setIsDeleteLoading(true);
      await GeoFenceService.remove({
        id: geoFenceDetails.id,
      });
      enqueueSnackbar("Geo-fence deleted successfully", {
        variant: "success",
      });
      navigate(ROUTES.USER.GEO_FENCES, {
        replace: true,
      });
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Error while deleting geo-fence",
        {
          variant: "error",
        }
      );
    } finally {
      setIsDeleteLoading(false);
      onCancelDelete();
    }
  };
  // delete function ends

  if (!geoFenceDetails || geoFenceDetailsLoading) {
    return <PageDataLoader />;
  }
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <PageHeader
        title={`Geo-fence (${geoFenceDetails.name})`}
        showBorderBottom
        ActionComponent={
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteForeverIcon />}
              sx={{
                marginRight: "15px",
              }}
              onClick={onClickDelete}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                navigate(
                  ROUTES.USER.GEO_FENCE_EDIT.replace(
                    ":id",
                    encodeGeoFenceId(geoFenceDetails.id)
                  )
                )
              }
              sx={{
                minWidth: "160px",
              }}
              startIcon={<EditIcon />}
            >
              Edit geo-fence
            </Button>
          </Box>
        }
      />
      <Grid container spacing={0} mt={2} mb={1}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={7}>
          <UserGeoFenceDrawerLoader
            onUpdateFence={() => {}}
            geoFence={geoFenceDetails}
            isEdit={false}
            isViewOnly={true}
            shouldDisableAddEdit={true}
            isMdFull
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.32))",
                padding: "15px",
              }}
            >
              <Grid container spacing={0} my={1}>
                <Grid item xs={12} mb={2}>
                  <Typography variant="subtitle2">Geo-fence name</Typography>
                  <Typography>{geoFenceDetails.name}</Typography>
                </Grid>
                <Grid item xs={12} mb={1}>
                  <Typography variant="subtitle2">Description</Typography>
                  <Box>
                    {geoFenceDetails.description ? (
                      <GeoFenceDescription
                        description={geoFenceDetails.description}
                        typographyProps={{
                          variant: "body1",
                        }}
                      />
                    ) : (
                      <Typography>N/A</Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} mb={1}>
                  <Typography variant="subtitle2">Status</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <GeoFenceActiveStatusChip
                      isActive={geoFenceDetails.isActive}
                    />
                    <Box>
                      {geoFenceDetails.isActive ? (
                        <IconButton onClick={onClickToggleActiveStatus}>
                          <Tooltip title="Mark as inactive">
                            <ToggleOnIcon
                              color="success"
                              sx={{ fontSize: "36px" }}
                            />
                          </Tooltip>
                        </IconButton>
                      ) : (
                        <IconButton onClick={onClickToggleActiveStatus}>
                          <Tooltip title="Mark as active">
                            <ToggleOffOutlinedIcon
                              color="warning"
                              sx={{ fontSize: "36px" }}
                            />
                          </Tooltip>
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <UserGeoFenceDevicesControl geoFence={geoFenceDetails} />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      {showToggleStatusConfirm ? (
        <ConfirmDialog
          title={
            geoFenceDetails.isActive
              ? "Confirm to make geo-fence inactive"
              : "Confirm to make geo-fence active"
          }
          subTitle={
            geoFenceDetails.isActive
              ? `Geo-fence will be inactive and rules will not be matched`
              : `Geo-fence will be active and rules will be matched`
          }
          show={showToggleStatusConfirm}
          onCancel={onCancelToggleStatus}
          onConfirm={onConfirmToggleStatus}
          isLoading={isToggleStatusLoading}
          confirmColor={geoFenceDetails.isActive ? "error" : "primary"}
          cancelColor="secondary"
          confirmText={
            geoFenceDetails.isActive ? "Mark as inactive" : "Mark as active"
          }
          cancelText="Cancel"
        />
      ) : null}
      {showDeleteConfirm ? (
        <ConfirmDialog
          title="Confirm to delete geo-fence"
          subTitle="Geo-fence will be deleted and if any vehicle is associated with it, will be removed!"
          show={showDeleteConfirm}
          onCancel={onCancelDelete}
          onConfirm={onConfirmDelete}
          isLoading={isDeleteLoading}
          confirmColor="error"
          cancelColor="secondary"
          confirmText="Delete"
          cancelText="Cancel"
        />
      ) : null}
    </Box>
  );
}

export default UserGeoFenceDetails;
