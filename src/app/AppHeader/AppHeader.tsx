import React from "react";
import { alpha, AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectAppDrawerIsMini,
  selectAppDrawerIsMobileOpen,
  selectAppDrawerWidth,
  setMobileOpen,
} from "../reducers/appWrapperSlice";
import { MINI_DRAWER_WIDTH } from "../AppSideBar/AppSideBar";
import UserMenu from "../../common/components/user/user-menu/UserMenu";
import { grey } from "@mui/material/colors";

function AppHeader() {
  const drawerWidth = useAppSelector(selectAppDrawerWidth);
  const isMobileOpen = useAppSelector(selectAppDrawerIsMobileOpen);
  const isMini = useAppSelector(selectAppDrawerIsMini);
  const dispatch = useAppDispatch();
  const applicableDrawerWidth = isMini ? MINI_DRAWER_WIDTH : drawerWidth;
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${applicableDrawerWidth}px)` },
        ml: { md: `${applicableDrawerWidth}px` },
        backgroundColor: alpha(grey[50], 0.9),
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(setMobileOpen(!isMobileOpen))}
          sx={{ mr: 2, display: { md: "none" }, color: grey[800] }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "flex-end",
            display: "flex",
          }}
        >
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
