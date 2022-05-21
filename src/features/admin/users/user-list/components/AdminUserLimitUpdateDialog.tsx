import React from "react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { grey } from "@mui/material/colors";
import { UpdateUserLimitDto } from "../../../../../services";
import { User } from "../../../../../models";
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
    maxDevice: yup
      .number()
      .nullable()
      .min(-1, "-1 is minimum, means unlimited")
      .max(1000, "Max can be 1000")
      .required("Max device is required"),
    maxFencePerDevice: yup
      .number()
      .nullable()
      .min(-1, "-1 is minimum, means unlimited")
      .max(100, "Max can be 100")
      .required("Max fence/device is required"),
  })
  .required();

export interface IAdminUserLimitUpdateDialogProps {
  loading: boolean;
  show: boolean;
  onClose: () => void;
  onUpdateLimit: (data: UpdateUserLimitDto) => void;
  user: User;
}

type UpdateUserLimitDtoForm = Omit<UpdateUserLimitDto, "id">;

function AdminUserLimitUpdateDialog({
  loading,
  onUpdateLimit,
  onClose,
  show,
  user,
}: IAdminUserLimitUpdateDialogProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserLimitDtoForm>({
    defaultValues: {
      maxDevice: user.maxDevice,
      maxFencePerDevice: user.maxFencePerDevice,
    },
    resolver: yupResolver(updateLimitSchema),
  });
  const onUpdateSubmit = async (data: UpdateUserLimitDtoForm) => {
    onUpdateLimit({
      ...data,
      id: user.id,
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
        Update limit for user ({user.email})
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
                name="maxDevice"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
                    placeholder="100"
                    label="Max device"
                    disabled={loading}
                    error={!!errors.maxDevice}
                    helperText={errors.maxDevice?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={1}>
              <Controller
                name="maxFencePerDevice"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="50"
                    label="Max Fence Per Device"
                    disabled={loading}
                    error={!!errors.maxFencePerDevice}
                    helperText={errors.maxFencePerDevice?.message}
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

export default AdminUserLimitUpdateDialog;
