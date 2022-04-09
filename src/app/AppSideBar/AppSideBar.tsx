import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { styled, useTheme } from "@mui/material/styles";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectAppDrawerIsMini,
  selectAppDrawerIsMobileOpen,
  selectAppDrawerWidth,
  setIsMini,
  setMobileOpen,
} from "../reducers/appWrapperSlice";
import AppImage from "../../common/components/system/AppImage/AppImage";

import styles from "./AppSideBar.module.scss";
import UserBadgeWithDescription from "../../common/components/user/user-badge/UserBadgeWithDescription";
import UserBadge from "../../common/components/user/user-badge/UserBadge";

export const MINI_DRAWER_WIDTH = 64;
export const FULL_DRAWER_WIDTH = 240;

const AppToolbar = styled(Toolbar)(({ theme }) => ({
  paddingLeft: "16px !important",
  paddingRight: "16px !important",
}));

interface IAppDrawerComponentProps {
  isHovering?: boolean;
  isMobile?: boolean;
}

function AppDrawerComponent({
  isHovering = false,
  isMobile = false,
}: IAppDrawerComponentProps) {
  const isMini = useAppSelector(selectAppDrawerIsMini);
  const dispatch = useAppDispatch();
  const getUserBadge = () => {
    if (!isMini || isHovering || isMobile) {
      return <UserBadgeWithDescription />;
    }
    return <UserBadge />;
  };
  return (
    <Box component="div" className={styles.AppSideBar}>
      <AppToolbar>
        <Box className={styles.AppSideBarTitle}>
          <Box className={styles.AppSideBarImgContainer}>
            <AppImage src="/icons/android-icon-96x96.png" alt="Logo" />
          </Box>
          {!isMobile && (
            <IconButton onClick={() => dispatch(setIsMini(!isMini))}>
              {isMini ? <AiOutlineDoubleRight /> : <AiOutlineDoubleLeft />}
            </IconButton>
          )}
        </Box>
      </AppToolbar>
      <Box className={styles.AppSidebarUserInfo}>{getUserBadge()}</Box>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function AppSideBar() {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const drawerWidth = useAppSelector(selectAppDrawerWidth);
  const isMobileOpen = useAppSelector(selectAppDrawerIsMobileOpen);
  const isMini = useAppSelector(selectAppDrawerIsMini);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const container =
    window !== undefined ? () => window.document.body : undefined;
  return (
    <Box
      component="nav"
      sx={{
        width: { md: isMini ? MINI_DRAWER_WIDTH : drawerWidth },
        flexShrink: { md: 0 },
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={isMobileOpen}
        onClose={() => dispatch(setMobileOpen(!isMobileOpen))}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { sm: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <AppDrawerComponent isMobile />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { sm: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: isMini ? MINI_DRAWER_WIDTH : drawerWidth,
            borderRightStyle: "dashed",
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            ...(isMini && {
              "& .MuiToolbar-root": {
                "& .MuiButtonBase-root": {
                  display: "none",
                },
              },
            }),
            ...(isMouseOver && {
              width: drawerWidth,
              "& .MuiToolbar-root": {
                "& .MuiButtonBase-root": {
                  display: "inline-flex",
                },
              },
            }),
          },
        }}
        open
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <AppDrawerComponent isHovering={isMouseOver} isMobile={isMobileOpen} />
      </Drawer>
    </Box>
  );
}

export default AppSideBar;
