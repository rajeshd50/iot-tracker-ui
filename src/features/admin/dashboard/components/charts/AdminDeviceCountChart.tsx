import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { formatNumber } from "../../../../../common/util/util";
import { DashboardDeviceCount } from "../../../../../models";

export interface IAdminDeviceCountChartProps {
  deviceCount: DashboardDeviceCount | null;
  isLoading: boolean;
}

interface IAdminDeviceCountChartLabelsProps {
  label: string;
  value?: number;
  isLoading: boolean;
}

function AdminDeviceCountChartLabels({
  label,
  value,
  isLoading,
}: IAdminDeviceCountChartLabelsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "4px",
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Typography
            sx={{
              fontSize: "1rem",
              marginRight: "8px",
            }}
          >
            {label}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {isLoading ? (
            <Skeleton variant="text" width="60px" />
          ) : (
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {formatNumber(value || 0)}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

function AdminDeviceCountChart({
  deviceCount,
  isLoading,
}: IAdminDeviceCountChartProps) {
  const [seriesData, setSeriesData] = useState<ApexNonAxisChartSeries>([]);
  const [chartConfig, setChartConfig] = useState<ApexCharts.ApexOptions>({});

  useEffect(() => {
    if (deviceCount) {
      setSeriesData([
        deviceCount.active || 0,
        deviceCount.inactive || 0,
        deviceCount.pendingApproval || 0,
      ]);
      setChartConfig({
        chart: {
          type: "pie",
        },
        colors: ["rgb(0, 143, 251)", "rgb(180, 180, 180)", "rgb(254, 176, 25)"],
        labels: ["Active", "Inactive", "Pending approval"],
        legend: {
          position: "bottom",
        },
      });
    }
  }, [deviceCount]);

  return (
    <Paper
      sx={{
        width: "100%",
        filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.32))",
        padding: "15px",
        height: "100%",
      }}
      elevation={0}
    >
      <Typography variant="h5" mb={1}>
        Devices
      </Typography>
      <Box>
        {isLoading ? (
          <Skeleton
            variant="circular"
            width="300px"
            height="300px"
            animation="pulse"
          />
        ) : (
          <ReactApexChart
            options={chartConfig}
            series={seriesData}
            type="pie"
            height={350}
          />
        )}
      </Box>
      <Box>
        <Grid
          container
          spacing={0}
          mt={2}
          mb={1}
          sx={{
            border: "1px solid #f0f0f0",
          }}
        >
          <Grid item xs={6}>
            <AdminDeviceCountChartLabels
              label="Total"
              value={deviceCount?.total}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <AdminDeviceCountChartLabels
              label="Active"
              value={deviceCount?.active}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <AdminDeviceCountChartLabels
              label="Pending"
              value={deviceCount?.pendingApproval}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <AdminDeviceCountChartLabels
              label="Inactive"
              value={deviceCount?.inactive}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default AdminDeviceCountChart;
