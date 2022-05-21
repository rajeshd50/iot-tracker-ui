import React from "react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { grey } from "@mui/material/colors";
import { UpdateDeviceLimitDto } from "../../../../../services";
import { Device } from "../../../../../models";
import {
  Dialog,
  DialogTitle,
  Box,
  DialogContent,
  Grid,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

const updateLimitSchema = yup
  .object({
    maxFence: yup
      .number()
      .nullable()
      .min(-1, "-1 is minimum, means unlimited")
      .max(100, "Max can be 100")
      .required("Max fence is required"),
  })
  .required();

export interface IAdminDeviceLimitUpdateDialogProps {
  loading: boolean;
  show: boolean;
  onClose: () => void;
  onUpdateLimit: (data: UpdateDeviceLimitDto) => void;
  device: Device;
}

type UpdateDeviceLimitDtoForm = Omit<UpdateDeviceLimitDto, "serial">;

function AdminDeviceLimitUpdateDialog({
  loading,
  onUpdateLimit,
  onClose,
  show,
  device,
}: IAdminDeviceLimitUpdateDialogProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateDeviceLimitDtoForm>({
    defaultValues: {
      maxFence: device.maxFence,
    },
    resolver: yupResolver(updateLimitSchema),
  });
  const onUpdateSubmit = async (data: UpdateDeviceLimitDtoForm) => {
    onUpdateLimit({
      ...data,
      serial: device.serial,
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
        Update limit for device ({device.serial})
      </DialogTitle>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onUpdateSubmit)}
      >
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} mb={1}>
              <Controller
                name="maxFence"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
                    placeholder="50"
                    label="Max fence"
                    disabled={loading}
                    error={!!errors.maxFence}
                    helperText={errors.maxFence?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={1}>
              <Typography variant="subtitle2">
                Note: -1 means unlimited
              </Typography>
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
            disabled={loading}
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

export default AdminDeviceLimitUpdateDialog;
