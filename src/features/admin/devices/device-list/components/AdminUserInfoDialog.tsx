import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EmailIcon from "@mui/icons-material/Email";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HomeIcon from "@mui/icons-material/Home";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

import { formatDateTime } from "../../../../../common/util/util";
import { useSnackbar } from "notistack";
import { UserService } from "../../../../../services";
import { UserWithDevice } from "../../../../../models/user-with-device.model";

export interface IAdminUserInfoDialogProps {
  show: boolean;
  onClose: () => void;
  userId: string;
}

interface IUserInfoBadgeProps {
  userFirstName?: string;
  userLastName?: string;
}

function UserInfoBadge({ userFirstName, userLastName }: IUserInfoBadgeProps) {
  const theme = useTheme();
  const getInitials = () => {
    return [userFirstName, userLastName]
      .filter((x) => !!x)
      .map((x) => x && x.charAt(0))
      .join("")
      .toUpperCase();
  };
  return (
    <Avatar
      sx={{
        backgroundColor: theme.palette.primary.main,
        width: "3rem",
        height: "3rem",
      }}
      variant="circular"
    >
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.primary.contrastText,
        }}
      >
        {getInitials()}
      </Typography>
    </Avatar>
  );
}

function AdminUserInfoDialog({
  show,
  onClose,
  userId,
}: IAdminUserInfoDialogProps) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserWithDevice | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const loadUserData = async () => {
    try {
      setLoading(true);
      const userWithDeviceData = await UserService.fetchUserDetails(userId);
      if (userWithDeviceData) {
        setUserData(userWithDeviceData);
      }
    } catch (e: any) {
      enqueueSnackbar(e && e.message ? e.message : "Unable to load user", {
        variant: "error",
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const loadUserCallback = useCallback(async () => {
    await loadUserData();
  }, [userId]);

  useEffect(() => {
    loadUserCallback();
  }, [loadUserCallback]);

  const getUserAddress = useCallback(() => {
    if (!userData) {
      return "N/A";
    }
    const addressParts = [
      userData.addressLine1,
      userData.addressLine2,
      userData.city,
      userData.state,
      userData.zip,
      userData.country,
    ]
      .filter((x) => !!x)
      .join(", ");

    return addressParts || "N/A";
  }, [userData]);

  return (
    <Dialog
      onClose={onClose}
      open={show}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle sx={{ borderBottom: `1px solid ${grey[200]}` }}>
        {loading ? (
          <Skeleton variant="text" width="80%" />
        ) : (
          <Typography variant="h6">{userData?.fullName}</Typography>
        )}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1} mt={1}>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            {loading && !userData ? (
              <Skeleton
                variant="circular"
                width="3rem"
                height="3rem"
                animation="wave"
              />
            ) : (
              <UserInfoBadge
                userFirstName={userData?.firstName}
                userLastName={userData?.lastName}
              />
            )}
          </Grid>
          {loading ? (
            <Grid item xs={10}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="text" width="90%" />
            </Grid>
          ) : (
            <Grid item xs={10}>
              {/* user name and email */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                mb={1}
              >
                <AccountBoxIcon
                  sx={{
                    color: grey[400],
                    marginRight: "4px",
                  }}
                />
                <Typography>{userData?.fullName}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <EmailIcon
                  sx={{
                    color: grey[400],
                    marginRight: "4px",
                  }}
                />
                <Typography>{userData?.email}</Typography>
              </Box>
              <Divider
                sx={{
                  marginTop: "6px",
                  marginBottom: "6px",
                }}
              />
              {/* user joining date and status */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                mb={1}
              >
                <DateRangeIcon
                  sx={{
                    color: grey[400],
                    marginRight: "4px",
                  }}
                />
                <Typography>
                  Member since{" "}
                  {userData && userData.createdAt
                    ? formatDateTime(userData.createdAt)
                    : "N/A"}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <AssignmentIndIcon
                  sx={{
                    color: grey[400],
                    marginRight: "4px",
                  }}
                />
                <Typography>
                  Status {userData?.isActive ? "Active" : "Inactive"}
                </Typography>
              </Box>
              <Divider
                sx={{
                  marginTop: "6px",
                  marginBottom: "6px",
                }}
              />
              {/* address */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                mb={1}
              >
                <HomeIcon
                  sx={{
                    color: grey[400],
                    marginRight: "4px",
                  }}
                />
                <Typography>{getUserAddress()}</Typography>
              </Box>
              <Divider
                sx={{
                  marginTop: "6px",
                  marginBottom: "6px",
                }}
              />
              {/* device count */}
              <Grid container spacing={0} mt={1}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                    mb={1}
                  >
                    <AddLocationAltIcon
                      sx={{
                        color: grey[400],
                        marginRight: "4px",
                      }}
                    />
                    <Typography>Devices</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      paddingLeft: "28px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        borderRight: `1px solid ${grey[300]}`,
                        paddingRight: "16px",
                        marginRight: "16px",
                      }}
                    >
                      <Typography>Total: {userData?.totalDevice}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        borderRight: `1px solid ${grey[300]}`,
                        paddingRight: "16px",
                        marginRight: "16px",
                      }}
                    >
                      <Typography>Active: {userData?.activeDevice}</Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography>
                        Pending Approval: {userData?.pendingDevice}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="outlined"
          autoFocus
          onClick={onClose}
          type="button"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AdminUserInfoDialog;
