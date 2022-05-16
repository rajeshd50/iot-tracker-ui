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
import { ROUTES } from "../../../../../../constants";
import { Device, GeoFence } from "../../../../../../models";
import GeoFenceAutoCompleteSelect from "../../../../../../common/components/geo-fence/geo-fence-auto-complete-select/GeoFenceAutoCompleteSelect";

export interface IUserDeviceAddFenceDialogProps {
  device: Device;
  loading: boolean;
  show: boolean;
  onClose: () => void;
  onGeoFenceAssign: (fenceId: string) => void;
}

function UserDeviceAddFenceDialog(props: IUserDeviceAddFenceDialogProps) {
  const { device, loading, show, onClose, onGeoFenceAssign } = props;
  const [selectedGeoFence, setSelectedGeoFence] = useState<GeoFence | null>(
    null
  );
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
              Your are going to connect this device (serial no: {device.serial})
              to a geo-fence! You will receive alerts according to preference.
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Please select a geo-fence from the below dropdown, you can{" "}
              <Link component={RouterLink} to={ROUTES.USER.GEO_FENCE_ADD}>
                add new fence here
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <GeoFenceAutoCompleteSelect
              selectedGeoFence={selectedGeoFence}
              onSelect={(fence) => setSelectedGeoFence(fence)}
              defaultFilter={{
                withoutDeviceSerial: device.serial,
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
          disabled={loading || !selectedGeoFence || !selectedGeoFence.id}
          variant="contained"
          color="primary"
          type="button"
          onClick={() =>
            selectedGeoFence && onGeoFenceAssign(selectedGeoFence.id)
          }
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

export default UserDeviceAddFenceDialog;
