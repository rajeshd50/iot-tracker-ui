import { Logout, Settings } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants";
import UserBadge from "../user-badge/UserBadge";
import CachedIcon from "@mui/icons-material/Cached";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import { User } from "../../../../models";
import { selectUserDetails, setLoggedOut } from "../../../../store/reducers/userSlice";

function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userDetails: User = useAppSelector(selectUserDetails);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogout = async () => {
    dispatch(setLoggedOut());
    navigate(ROUTES.AUTH.LOGIN);
  };
  if (!userDetails) {
    return null;
  }
  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <UserBadge />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box
          sx={{
            padding: "1rem",
          }}
        >
          <Typography variant="subtitle1">{userDetails.email}</Typography>
          <Typography variant="subtitle2">{userDetails.fullName}</Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => navigate(ROUTES.COMMON.PROFILE)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigate(ROUTES.COMMON.CHANGE_PASSWORD)}>
          <ListItemIcon>
            <CachedIcon fontSize="small" />
          </ListItemIcon>
          Change password
        </MenuItem>
        <MenuItem onClick={() => onLogout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
