import { alpha, Box, Button, Pagination } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PageHeader from "../../../../common/components/page-header/PageHeader";
import { ROUTES } from "../../../../constants";
import UserGeoFenceListFilter from "./components/UserGeoFenceListFilter";
import { GeoFence, GeoFenceStatus } from "../../../../models";
import { GeoFenceService } from "../../../../services/geo-fence.service";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import NoDataFallback from "../../../../common/components/no-data-fallback/NoDataFallback";
import UserGeoFenceLoadingSkelton from "./components/UserGeoFenceLoadingSkelton";
import UserGeoFenceDetailsCardView from "./components/UserGeoFenceDetailsCardView";
import UserGeoFenceDetailsListView from "./components/UserGeoFenceDetailsListView";

const DEFAULT_PER_PAGE = 10;

function UserGeoFenceList() {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);

  const [geoFences, setGeoFences] = useState<GeoFence[]>([]);
  const [totalGeoFences, setTotalGeoFences] = useState(0);
  const [isDeviceLoading, setIsDeviceLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [deviceSerial, setDeviceSerial] = useState<string>("");
  const [geoFenceStatus, setGeoFenceStatus] = useState<GeoFenceStatus | string>(
    ""
  );

  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("sm"));

  const loadGeoFences = async () => {
    try {
      setIsDeviceLoading(true);
      const geoFencePaginatedResp = await GeoFenceService.fetch({
        page,
        perPage: DEFAULT_PER_PAGE,
        searchText: searchText || undefined,
        status: geoFenceStatus || undefined,
        deviceSerial: deviceSerial || undefined,
      });
      setGeoFences(geoFencePaginatedResp.items || []);
      setTotalGeoFences(geoFencePaginatedResp.total);
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Unable to fetch geo fences",
        {
          variant: "error",
        }
      );
    } finally {
      setIsDeviceLoading(false);
    }
  };

  const loadGeoFenceCallback = useCallback(async () => {
    await loadGeoFences();
  }, [page, geoFenceStatus, deviceSerial, searchText]);

  useEffect(() => {
    loadGeoFenceCallback();
  }, [page, geoFenceStatus, deviceSerial, searchText, loadGeoFenceCallback]);

  const onFilterReset = () => {
    setSearchText("");
    setDeviceSerial("");
    setGeoFenceStatus("");
  };

  const onFilterUpdate = (
    searchText: string | null,
    deviceSerial: string | null,
    status: GeoFenceStatus | string | null
  ) => {
    setSearchText(searchText || "");
    setDeviceSerial(deviceSerial || "");
    setGeoFenceStatus(status || "");
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const isFilterApplied = () => {
    return !!searchText || !!deviceSerial || !!geoFenceStatus;
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <PageHeader
        title="Geo-fences"
        ActionComponent={
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(ROUTES.USER.GEO_FENCE_ADD)}
              sx={{
                minWidth: "160px",
              }}
              startIcon={<AddCircleIcon />}
            >
              Add New Geo-Fence
            </Button>
          </Box>
        }
      />
      <UserGeoFenceListFilter
        isLoading={isDeviceLoading}
        onFilterReset={onFilterReset}
        onFilterUpdate={onFilterUpdate}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: "10px",
          backgroundColor: alpha(grey[50], 0.5),
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={Math.ceil(totalGeoFences / DEFAULT_PER_PAGE)}
          color="primary"
          showFirstButton
          showLastButton
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <Box
        sx={{
          marginBottom: "96px",
        }}
      >
        {isDeviceLoading ? (
          <>
            <UserGeoFenceLoadingSkelton />
            <UserGeoFenceLoadingSkelton />
            <UserGeoFenceLoadingSkelton />
          </>
        ) : (
          <>
            {geoFences.length ? (
              <>
                {geoFences.map((geoFence) =>
                  matchesXS ? (
                    <UserGeoFenceDetailsCardView
                      geoFence={geoFence}
                      key={geoFence.id}
                    />
                  ) : (
                    <UserGeoFenceDetailsListView
                      geoFence={geoFence}
                      key={geoFence.id}
                    />
                  )
                )}
              </>
            ) : (
              <>
                <NoDataFallback
                  title={
                    isFilterApplied()
                      ? "No geo fence found with selected filters"
                      : "No geo fence added yet!"
                  }
                  showActionButton={!isFilterApplied()}
                  actionButtonText="Add new geo-fence"
                  buttonProps={{
                    startIcon: <AddCircleIcon />,
                  }}
                  onActionButtonClick={() => {
                    navigate(ROUTES.USER.GEO_FENCE_ADD);
                  }}
                />
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default UserGeoFenceList;
