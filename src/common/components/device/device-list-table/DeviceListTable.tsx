import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Stack } from "@mui/material";
import NoDataFallback from "../../no-data-fallback/NoDataFallback";

export interface IDeviceListTableProps<T> {
  rows: T[];
  columns: GridColDef[];
  isLoading?: boolean;
  page: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  height?: string;
  rowHeight?: number;
  noRowText?: string;
  noResultText?: string;
  imageWidth?: string;
  rowsPerPageOptions?: number[];
}

function DeviceListTable<T>(props: IDeviceListTableProps<T>) {
  const {
    height = "680px",
    rows,
    columns,
    total,
    page,
    perPage,
    isLoading,
    onPageChange,
    onPerPageChange,
    rowHeight = 52,
    noRowText = "No data available to show",
    noResultText = "No data available to show, try changing filters",
    imageWidth = "250px",
    rowsPerPageOptions = [10, 15, 20],
  } = props;
  return (
    <Box
      sx={{
        height,
        width: "100%",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={total || 0}
        rowHeight={rowHeight}
        page={page}
        pageSize={perPage}
        rowsPerPageOptions={rowsPerPageOptions}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        loading={isLoading}
        pagination
        paginationMode="server"
        initialState={{
          pagination: {
            page: 1,
          },
        }}
        onPageChange={(page: number) => onPageChange(page)}
        onPageSizeChange={(pageSize: number) => onPerPageChange(pageSize)}
        components={{
          NoRowsOverlay: () => (
            <NoDataFallback title={noRowText} imageWidth={imageWidth} />
          ),
          NoResultsOverlay: () => (
            <NoDataFallback title={noResultText} imageWidth={imageWidth} />
          ),
        }}
      />
    </Box>
  );
}

export default DeviceListTable;
