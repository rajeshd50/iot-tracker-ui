import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Link,
  Button,
  CircularProgress,
  DialogActions,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";
import { ROUTES } from "../../../../../constants";
import { Device, GeoFence } from "../../../../../models";
import DeviceAutoCompleteSelect from "../../../../../common/components/device/device-auto-complete-select/DeviceAutoCompleteSelect";

export interface IUserGeoFenceAddDeviceDialogProps {
  geoFence: GeoFence;
  loading: boolean;
  show: boolean;
  onClose: () => void;
  onDeviceAssign: (deviceId: string) => void;
}

function UserGeoFenceAddDeviceDialog(props: IUserGeoFenceAddDeviceDialogProps) {
  const { geoFence, loading, show, onClose, onDeviceAssign } = props;
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
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
        Connect device with geo-fence
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1} mt={1}>
          <Grid item xs={12}>
            <Alert severity="info">
              Your are going to connect a device to this geo-fence (
              {geoFence.name})! You will receive alerts according to preference.
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Please select a device from the below dropdown, you can{" "}
              <Link component={RouterLink} to={ROUTES.USER.ADD_NEW_DEVICE}>
                add new device here
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <DeviceAutoCompleteSelect
              onSelect={(device) => setSelectedDevice(device)}
              selectedDevice={selectedDevice}
              defaultFilter={{
                withoutGeoFence: geoFence.id,
              }}
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
          disabled={loading || !selectedDevice || !selectedDevice.id}
          variant="contained"
          color="primary"
          type="button"
          onClick={() => selectedDevice && onDeviceAssign(selectedDevice.id)}
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
          Connect
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserGeoFenceAddDeviceDialog;
