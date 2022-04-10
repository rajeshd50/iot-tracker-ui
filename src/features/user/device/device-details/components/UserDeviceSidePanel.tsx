import { Box, Drawer } from "@mui/material";
import React, { useRef } from "react";
import UserDeviceSidePanelContent from "./UserDeviceSidePanelContent";

const SIDE_PANEL_WIDTH = 360;

export interface IUserDeviceSidePanelProps {
  isMobileOpen: boolean;
  onClose: () => void;
}

function UserDeviceSidePanel({
  isMobileOpen,
  onClose,
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
        <UserDeviceSidePanelContent onClose={onClose} />
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
        <UserDeviceSidePanelContent />
      </Box>
    </Box>
  );
}

export default UserDeviceSidePanel;
