import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BadgeIcon from "@mui/icons-material/Badge";
import CallIcon from "@mui/icons-material/Call";
import InfoIcon from "@mui/icons-material/Info";

import { Device } from "../../../../../models";
import { grey } from "@mui/material/colors";

export interface IUserDeviceDriverDetailsProps {
  device: Device;
}

function UserDeviceDriverDetails({ device }: IUserDeviceDriverDetailsProps) {
  if (
    !device ||
    (!device.driverName && !device.driverContact && !device.driverOtherDetails)
  ) {
    return null;
  }
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
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="device-driver-details-content"
          id="device-driver-details-header"
        >
          <Typography>Driver information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {device.driverName ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                    mb={1}
                  >
                    <BadgeIcon
                      sx={{
                        color: grey[500],
                        marginRight: "8px",
                      }}
                    />
                    <Typography>{device.driverName}</Typography>
                  </Box>
                  {device.driverContact || device.driverOtherDetails ? (
                    <Divider
                      sx={{
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                  ) : null}
                </>
              ) : null}
              {device.driverContact ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                    mb={1}
                  >
                    <CallIcon
                      sx={{
                        color: grey[500],
                        marginRight: "8px",
                      }}
                    />
                    <Typography>{device.driverContact}</Typography>
                  </Box>
                  {device.driverOtherDetails ? (
                    <Divider
                      sx={{
                        marginTop: "6px",
                        marginBottom: "6px",
                      }}
                    />
                  ) : null}
                </>
              ) : null}
              {device.driverOtherDetails ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                  mb={1}
                >
                  <InfoIcon
                    sx={{
                      color: grey[500],
                      marginRight: "8px",
                    }}
                  />
                  <Typography>{device.driverOtherDetails}</Typography>
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default UserDeviceDriverDetails;
