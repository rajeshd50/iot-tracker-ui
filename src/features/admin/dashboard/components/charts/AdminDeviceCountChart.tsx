import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { formatNumber } from "../../../../../common/util/util";

interface IAdminDeviceCountChartLabelsProps {
  label: string;
  value: number;
}

function AdminDeviceCountChartLabels({
  label,
  value,
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
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            {formatNumber(value)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

function AdminDeviceCountChart() {
  const [seriesData, setSeriesData] = useState<ApexNonAxisChartSeries>([]);
  const [chartConfig, setChartConfig] = useState<ApexCharts.ApexOptions>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSeriesData([50, 20, 75]);
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
      setIsLoading(false);
    }, 1000);
  }, []);

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
        <ReactApexChart
          options={chartConfig}
          series={seriesData}
          type="pie"
          height={350}
        />
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
            <AdminDeviceCountChartLabels label="Total" value={100} />
          </Grid>
          <Grid item xs={6}>
            <AdminDeviceCountChartLabels label="Active" value={75} />
          </Grid>
          <Grid item xs={6}>
            <AdminDeviceCountChartLabels label="Pending" value={5} />
          </Grid>
          <Grid item xs={6}>
            <AdminDeviceCountChartLabels label="Inactive" value={20} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default AdminDeviceCountChart;
