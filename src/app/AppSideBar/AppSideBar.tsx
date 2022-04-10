import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { styled, useTheme } from "@mui/material/styles";
import ListSubheader from "@mui/material/ListSubheader";
import { Collapse, ListItemButton } from "@mui/material";
import FormatListBulletedRounded from "@mui/icons-material/FormatListBulletedRounded";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import CachedIcon from "@mui/icons-material/Cached";

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
import { ROUTES, TEMP_IS_ADMIN } from "../../constants";
import AppSideBarLink from "./components/AppSideBarLink";

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
export type MENU_TYPES = "device" | "user" | "account";
function AppDrawerComponent({
  isHovering = false,
  isMobile = false,
}: IAppDrawerComponentProps) {
  const isMini = useAppSelector(selectAppDrawerIsMini);
  const dispatch = useAppDispatch();
  const [deviceMenuOpen, setDeviceMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const theme = useTheme();
  const isAdmin = TEMP_IS_ADMIN;
  const getUserBadge = () => {
    if (!isMini || isHovering || isMobile) {
      return <UserBadgeWithDescription />;
    }
    return <UserBadge />;
  };
  const setMenuActive = (type: MENU_TYPES) => {
    switch (type) {
      case "device":
        setDeviceMenuOpen(true);
        break;
      case "user":
        setUserMenuOpen(true);
        break;
      case "account":
        setAccountMenuOpen(true);
        break;
    }
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
              {isMini ? (
                <KeyboardDoubleArrowRightIcon />
              ) : (
                <KeyboardDoubleArrowLeftIcon />
              )}
            </IconButton>
          )}
        </Box>
      </AppToolbar>
      <Box className={styles.AppSidebarUserInfo}>{getUserBadge()}</Box>
      <Box
        sx={{
          padding: "10px",
          "& .MuiList-root": {
            "& .MuiListSubheader-root": {
              "& .MuiTypography-root": {
                fontSize: "0.75rem",
                marginTop: "4px",
                textTransform: "uppercase",
                fontWeight: 600,
              },
            },
          },
          "& .MuiListItemButton-root": {
            borderRadius: "4px",
          },
          "& .MuiListItemButton-root.Mui-selected": {
            "& .MuiSvgIcon-root": {
              color: theme.palette.primary.dark,
            },
            "& .MuiListItemText-root": {
              color: theme.palette.primary.dark,
            },
          },
        }}
      >
        <List>
          <AppSideBarLink
            to={isAdmin ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.DASHBOARD}
            IconComponent={DashboardIcon}
            text="Dashboard"
          />
        </List>
        <List
          subheader={
            <ListSubheader component="div" id="device-subheader">
              <Typography variant="h6">Device</Typography>
            </ListSubheader>
          }
        >
          <ListItemButton
            onClick={() => setDeviceMenuOpen(!deviceMenuOpen)}
            selected={deviceMenuOpen}
          >
            <ListItemIcon>
              <DeveloperBoardIcon />
            </ListItemIcon>
            <ListItemText primary="Devices" />
            {deviceMenuOpen ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </ListItemButton>
          <Collapse in={deviceMenuOpen} timeout="auto">
            <List component="div" disablePadding>
              <AppSideBarLink
                to={
                  isAdmin ? ROUTES.ADMIN.DEVICE_LIST : ROUTES.USER.DEVICE_LIST
                }
                IconComponent={FormatListBulletedRounded}
                text="Device List"
                isNested
                menuType="device"
                isParentActive={deviceMenuOpen}
                setActive={setMenuActive}
              />
              {isAdmin && (
                <AppSideBarLink
                  to={ROUTES.ADMIN.ADD_DEVICE}
                  IconComponent={PlaylistAddIcon}
                  text="Add device"
                  isNested
                  menuType="device"
                  isParentActive={deviceMenuOpen}
                  setActive={setMenuActive}
                />
              )}
            </List>
          </Collapse>
        </List>
        {isAdmin && (
          <List
            subheader={
              <ListSubheader component="div" id="user-subheader">
                <Typography variant="h6">User Management</Typography>
              </ListSubheader>
            }
          >
            <ListItemButton
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              selected={userMenuOpen}
            >
              <ListItemIcon>
                <SupervisedUserCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
              {userMenuOpen ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </ListItemButton>
            <Collapse in={userMenuOpen} timeout="auto">
              <List component="div" disablePadding>
                <AppSideBarLink
                  to={ROUTES.ADMIN.USER_LIST}
                  IconComponent={FormatListBulletedRounded}
                  text="User List"
                  isNested
                  menuType="user"
                  isParentActive={userMenuOpen}
                  setActive={setMenuActive}
                />
              </List>
            </Collapse>
          </List>
        )}
        <List
          subheader={
            <ListSubheader component="div" id="account-subheader">
              <Typography variant="h6">My Account</Typography>
            </ListSubheader>
          }
        >
          <ListItemButton
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
            selected={accountMenuOpen}
          >
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="My Account" />
            {accountMenuOpen ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </ListItemButton>
          <Collapse in={accountMenuOpen} timeout="auto">
            <List component="div" disablePadding>
              <AppSideBarLink
                to={ROUTES.COMMON.PROFILE}
                IconComponent={SettingsIcon}
                text="Profile"
                isNested
                menuType="account"
                isParentActive={accountMenuOpen}
                setActive={setMenuActive}
              />
              <AppSideBarLink
                to={ROUTES.COMMON.CHANGE_PASSWORD}
                IconComponent={CachedIcon}
                text="Change Password"
                isNested
                menuType="account"
                isParentActive={accountMenuOpen}
                setActive={setMenuActive}
              />
            </List>
          </Collapse>
        </List>
      </Box>
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
          display: { xs: "block", sm: "block", md: "none" },
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
          display: { xs: "none", sm: "none", md: "block" },
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