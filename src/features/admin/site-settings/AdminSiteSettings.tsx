import { Box } from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import DeviceListTable from "../../../common/components/device/device-list-table/DeviceListTable";
import PageHeader from "../../../common/components/page-header/PageHeader";
import { SiteConfig } from "../../../models";
import { SiteConfigService, UpdateSiteConfigDto } from "../../../services";
import AdminSiteConfigFilter from "./components/AdminSiteConfigFilter";
import AdminSiteConfigDescriptionCell from "./components/table-cells/AdminSiteConfigDescriptionCell";
import AdminSiteConfigValueCell from "./components/table-cells/AdminSiteConfigValueCell";
import EditIcon from "@mui/icons-material/Edit";
import AdminSiteConfigUpdate from "./components/AdminSiteConfigUpdate";

const columns: GridColDef[] = [
  {
    field: "key",
    headerName: "Name",
    sortable: false,
    width: 300,
    disableColumnMenu: true,
  },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    flex: 1.2,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<SiteConfig>) => (
      <AdminSiteConfigDescriptionCell siteConfig={params.row} />
    ),
  },
  {
    field: "value",
    headerName: "Value",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<SiteConfig>) => (
      <AdminSiteConfigValueCell siteConfig={params.row} />
    ),
  },
];

function AdminSiteSettings() {
  const [siteConfigs, setSiteConfigs] = useState<SiteConfig[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [siteConfigToUpdate, setSiteConfigToUpdate] =
    useState<SiteConfig | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const loadSiteConfigs = async () => {
    try {
      setIsSearchLoading(true);
      const configs = await SiteConfigService.fetchAll({
        searchText: searchText ? searchText : undefined,
        page: currentPage + 1,
        perPage,
      });
      setTotal(configs.total);
      setSiteConfigs(configs.items);
    } catch (e) {
      enqueueSnackbar("Error while fetching site configs", {
        variant: "error",
      });
    } finally {
      setIsSearchLoading(false);
    }
  };

  const loadSiteConfigsCallback = useCallback(async () => {
    await loadSiteConfigs();
  }, [currentPage, perPage, searchText]);

  useEffect(() => {
    loadSiteConfigsCallback();
  }, [currentPage, perPage, searchText, loadSiteConfigsCallback]);

  const onClickEdit = (siteConfig: SiteConfig) => {
    setSiteConfigToUpdate(siteConfig);
    setShowUpdateDialog(true);
  };

  const onCloseEdit = () => {
    setSiteConfigToUpdate(null);
    setShowUpdateDialog(false);
  };

  const onEdit = async (data: UpdateSiteConfigDto) => {
    try {
      setIsUpdateLoading(true);
      const updatedConfig = await SiteConfigService.update(data);
      enqueueSnackbar("Site config updated", {
        variant: "success",
      });
      setSiteConfigs(
        siteConfigs.map((sc) => {
          if (sc.id === updatedConfig.id) {
            return updatedConfig;
          }
          return sc;
        })
      );
    } catch (e) {
      enqueueSnackbar("Error while updating site config", {
        variant: "error",
      });
    } finally {
      setIsUpdateLoading(false);
      onCloseEdit();
    }
  };

  const getColumns = () => {
    return [
      ...columns,
      {
        field: "actions",
        type: "actions",
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            icon={
              <EditIcon
                color="primary"
                sx={{
                  fontSize: "24px",
                }}
              />
            }
            onClick={() => onClickEdit(params.row)}
            label="Update"
            showInMenu
          />,
        ],
      },
    ];
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <PageHeader title="Site config" subTitle="All system config" />
      <AdminSiteConfigFilter
        isLoading={isSearchLoading}
        onFilterReset={() => {
          setSearchText("");
        }}
        onFilterUpdate={(updatedSearchText) => {
          updatedSearchText && setSearchText(updatedSearchText);
        }}
      />
      <DeviceListTable<SiteConfig>
        rows={siteConfigs}
        columns={getColumns()}
        isLoading={isSearchLoading}
        page={currentPage}
        perPage={perPage}
        total={total}
        onPageChange={(newPage) => setCurrentPage(newPage)}
        onPerPageChange={(newPerPage) => setPerPage(newPerPage)}
      />
      {showUpdateDialog && siteConfigToUpdate ? (
        <AdminSiteConfigUpdate
          show={showUpdateDialog}
          siteConfig={siteConfigToUpdate}
          onClose={onCloseEdit}
          onUpdate={onEdit}
          loading={isUpdateLoading}
        />
      ) : null}
    </Box>
  );
}

export default AdminSiteSettings;
