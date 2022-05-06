import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useTheme } from "@mui/material/styles";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function UserDeviceAddInstruction() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        border: `1px solid ${grey[300]}`,
        borderRadius: "4px",
        position: "relative",
        padding: "8px",
        maxHeight: "370px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
          color: theme.palette.primary.light,
        }}
      >
        <HelpOutlineIcon />
      </Box>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
        }}
      >
        Instruction
      </Typography>
      <List>
        <Divider />
        <ListItem>
          <Typography>
            Type your device's serial number which can be found at the back of
            the device, or click "Scan" to scan the QR code and add it
            automatically.
          </Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography>Give your device a custom name!</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography>Enter the vehicle make/model, and number</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography>
            Once done, click on "Add Device", your request to add this device
            will be sent, once added you will receive an email.
          </Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography>
            By toggling on the "Add additional driver information", you can add
            driver name/contact and other details.
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
}

export default UserDeviceAddInstruction;
