import { Box, Divider, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { formatDateTime } from "../../../../../common/util/util";
import { Device } from "../../../../../models";

export interface IAdminDeviceDatesProps {
  device: Device;
}

export interface IAdminDeviceSingleDateProps {
  title: string;
  date: Date | string | null;
}

function AdminDeviceSingleDate(props: IAdminDeviceSingleDateProps) {
  const { title, date } = props;

  if (!title || !date) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          marginRight: "4px",
          fontSize: "12px",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 500,
        }}
      >
        {formatDateTime(date)}
      </Typography>
    </Box>
  );
}

function AdminDeviceDates({ device }: IAdminDeviceDatesProps) {
  const { approvedAt, approvalRequestedAt } = device;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        border: `1px solid ${grey[300]}`,
        borderRadius: "4px",
        padding: "4px",
      }}
    >
      {approvalRequestedAt ? (
        <AdminDeviceSingleDate
          title="Approval Requested at"
          date={approvalRequestedAt}
        />
      ) : null}
      {approvalRequestedAt && approvedAt ? (
        <Divider
          sx={{
            margin: "2px 0",
          }}
        />
      ) : null}
      {approvedAt ? (
        <AdminDeviceSingleDate title="Approved on" date={approvedAt} />
      ) : null}
    </Box>
  );
}

export default AdminDeviceDates;
