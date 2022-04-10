import { Box, Drawer } from "@mui/material";
import React, { useRef } from "react";
import { Device } from "../../../../../models/device.model";
import UserDeviceSidePanelContent from "./UserDeviceSidePanelContent";

const SIDE_PANEL_WIDTH = 360;

export interface IUserDeviceSidePanelProps {
  isMobileOpen: boolean;
  onClose: () => void;
  device: Device;
}

function UserDeviceSidePanel({
  isMobileOpen,
  onClose,
  device,
}: IUserDeviceSidePanelProps) {
  const parentRef = useRef();
  return (
    <Box
      component="nav"
      sx={{
        width: { md: SIDE_PANEL_WIDTH },
        flexShrink: { md: 0 },
      }}
      aria-label="mailbox folders"
      ref={parentRef}
    >
      <Drawer
        container={parentRef.current}
        variant="temporary"
        open={isMobileOpen}
        onClose={() => onClose()}
        anchor="right"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: SIDE_PANEL_WIDTH,
          },
        }}
      >
        <UserDeviceSidePanelContent device={device} onClose={onClose} />
      </Drawer>
      <Box
        sx={{
          width: SIDE_PANEL_WIDTH,
          display: {
            xs: "none",
            sm: "none",
            md: "block",
          },
        }}
      >
        <UserDeviceSidePanelContent device={device} />
      </Box>
    </Box>
  );
}

export default UserDeviceSidePanel;
