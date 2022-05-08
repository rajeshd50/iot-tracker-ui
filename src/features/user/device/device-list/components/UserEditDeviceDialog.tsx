import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Device } from "../../../../../models";
import { UpdateDeviceDto } from "../../../../../services";

import { useForm, Controller, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IUserEditDeviceDialogProps {
  loading: boolean;
  show: boolean;
  device: Device;
  onClose: () => void;
  onDeviceUpdate: (updateData: UpdateDeviceDto) => void;
}

const updateDeviceSchema = yup
  .object({
    vehicleName: yup
      .string()
      .max(30, "Vehicle name can be of max 30 characters")
      .required("Vehicle name is required"),
    vehicleNumber: yup
      .string()
      .max(20, "Vehicle number can be of max 20 characters")
      .required("Vehicle number is required"),
    driverName: yup
      .string()
      .optional()
      .max(60, "Driver name can be of max 60 characters"),
    driverContact: yup
      .string()
      .optional()
      .max(20, "Driver contact can be of max 20 characters"),
    driverOtherDetails: yup
      .string()
      .optional()
      .max(120, "Driver other information can be of max 120 characters"),
    name: yup.string().optional().max(60, "Name can be of max 60 characters"),
  })
  .required();

function UserEditDeviceDialog(props: IUserEditDeviceDialogProps) {
  const { loading, show, onClose, device, onDeviceUpdate } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateDeviceDto>({
    defaultValues: {
      name: device.name || "",
      vehicleName: device.vehicleName || "",
      vehicleNumber: device.vehicleNumber || "",
      driverName: device.driverName || "",
      driverContact: device.driverContact || "",
      driverOtherDetails: device.driverOtherDetails || "",
    },
    resolver: yupResolver(updateDeviceSchema),
  });
  const { isDirty } = useFormState({
    control,
  });
  const onUpdateDeviceSubmit = async (data: UpdateDeviceDto) => {
    onDeviceUpdate({
      ...data,
      id: device.id,
    });
  };
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
        Update device
      </DialogTitle>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onUpdateDeviceSubmit)}
      >
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} mb={1}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="My Car One"
                    label="Device Name"
                    disabled={loading}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={1}>
              <Controller
                name="vehicleName"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="Maruti Suzuki 800"
                    label="Vehicle Name"
                    disabled={loading}
                    error={!!errors.vehicleName}
                    helperText={errors.vehicleName?.message}
                    required
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={1}>
              <Controller
                name="vehicleNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="XY11-12AB-1234"
                    label="Vehicle number"
                    disabled={loading}
                    error={!!errors.vehicleNumber}
                    helperText={errors.vehicleNumber?.message}
                    required
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mt={1}>
              <Controller
                name="driverName"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="John Doe"
                    label="Driver name"
                    disabled={loading}
                    error={!!errors.driverName}
                    helperText={errors.driverName?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mt={1}>
              <Controller
                name="driverContact"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="123-456-7890"
                    label="Driver contact"
                    disabled={loading}
                    error={!!errors.driverContact}
                    helperText={errors.driverContact?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mt={1}>
              <Controller
                name="driverOtherDetails"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="..."
                    label="Driver other information"
                    disabled={loading}
                    error={!!errors.driverOtherDetails}
                    helperText={errors.driverOtherDetails?.message}
                    {...field}
                  />
                )}
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
            disabled={loading || !isDirty}
            variant="contained"
            color="primary"
            type="submit"
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
            Update
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default UserEditDeviceDialog;
