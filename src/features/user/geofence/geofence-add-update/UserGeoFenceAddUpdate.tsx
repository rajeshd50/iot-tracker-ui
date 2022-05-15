import { Box, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import {
  useMatch,
  useNavigate,
  useParams,
  useResolvedPath,
} from "react-router-dom";
import PageDataLoader from "../../../../common/components/page-data-loader/PageDataLoader";
import PageHeader from "../../../../common/components/page-header/PageHeader";
import { decodeGeoFenceId } from "../../../../common/util/util";
import { ROUTES } from "../../../../constants";
import { GeoFence } from "../../../../models";
import { GeoFenceService } from "../../../../services";
import UserGeoFenceDrawerLoader, {
  UpdateFenceParams,
} from "./components/UserGeoFenceDrawerLoader";
import UserGeoFenceForm from "./components/UserGeoFenceForm";

function UserGeoFenceAddUpdate() {
  const [isEdit, setIsEdit] = useState(false);
  const [geoFenceDetails, setGeoFenceDetails] = useState<GeoFence | null>(null);
  const [geoFenceDetailsLoading, setGeoFenceDetailsLoading] = useState(false);
  const resolved = useResolvedPath(ROUTES.USER.GEO_FENCE_EDIT);
  const match = useMatch({ path: resolved.pathname, end: true });
  const params = useParams();
  const [isAddUpdateLoading, setIsAddUpdateLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [mapParams, setMapParams] = useState<UpdateFenceParams | undefined>(
    undefined
  );

  const gotoGeoFenceList = () => {
    navigate(ROUTES.USER.GEO_FENCES);
  };

  useEffect(() => {
    if (match && params.id) {
      setIsEdit(true);
    }
  }, [match, params]);

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
    }
  }, [params, loadGeoFenceDetailsCallback]);

  const onUpdateIsLoading = (isLoading: boolean) => {
    setIsAddUpdateLoading(isLoading);
  };

  const onUpdateFence = (updateParams?: UpdateFenceParams) => {
    setMapParams(updateParams);
  };
  if ((isEdit && !geoFenceDetails) || geoFenceDetailsLoading) {
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
        title={isEdit ? "Edit geo-fence" : "Add geo-fence"}
        showBorderBottom
      />
      <Grid container spacing={0} mt={2} mb={1}>
        <Grid item xs={12} sm={12} md={8}>
          <UserGeoFenceDrawerLoader
            onUpdateFence={onUpdateFence}
            isEdit={isEdit}
            isViewOnly={false}
            geoFence={geoFenceDetails || undefined}
            shouldDisableAddEdit={isAddUpdateLoading}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <UserGeoFenceForm
            updateParams={mapParams}
            isEdit={isEdit}
            geoFence={geoFenceDetails || undefined}
            shouldDisableAddEdit={false}
            isAddUpdateLoading={isAddUpdateLoading}
            updateAddEditLoading={onUpdateIsLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserGeoFenceAddUpdate;
