import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  Link,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import UserAutoCompleteSelect from "../../../../../common/components/admin/user-autocomplete-select/UserAutoCompleteSelect";
import { ROUTES } from "../../../../../constants";

import { Device, User } from "../../../../../models";

export interface IAdminDeviceAssignDialogProps {
  loading: boolean;
  show: boolean;
  device: Device;
  onClose: () => void;
  onDeviceAssign: (userId: string) => void;
}

function AdminDeviceAssignDialog({
  loading,
  show,
  onClose,
  onDeviceAssign,
  device,
}: IAdminDeviceAssignDialogProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  return (
    <Dialog
      onClose={onClose}
      open={show}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle
        sx={{ fontSize: "1.4rem", borderBottom: `1px solid ${grey[200]}` }}
      >
        Assign device to user
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1} mt={1}>
          <Grid item xs={12}>
            <Alert severity="info">
              Your are going to assign the device (serial no: {device.serial})
              to a user!
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Please select a user from the below dropdown, you can{" "}
              <Link component={RouterLink} to={ROUTES.ADMIN.USER_LIST}>
                add new user
              </Link>{" "}
              from user management section
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <UserAutoCompleteSelect
              onSelect={(newUser) => setSelectedUser(newUser)}
              onClear={() => setSelectedUser(null)}
              selectedUser={selectedUser}
            />
          </Grid>
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
          Cancel
        </Button>
        <Button
          disabled={loading || !selectedUser || !selectedUser.id}
          variant="contained"
          color="primary"
          type="button"
          onClick={() => selectedUser && onDeviceAssign(selectedUser.id)}
        >
          {loading && (
            <CircularProgress
              size="1rem"
              color="primary"
              sx={{
                marginRight: "8px",
              }}
            />
          )}
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AdminDeviceAssignDialog;
