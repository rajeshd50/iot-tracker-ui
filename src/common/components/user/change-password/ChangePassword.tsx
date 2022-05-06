import React, { useState } from "react";
import { useSnackbar } from "notistack";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ChangePasswordDto } from "../../../../services";
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

export interface IChangePasswordProps {
  onCancel: () => void;
  show: boolean;
}

const changePasswordSchema = yup
  .object({
    oldPassword: yup
      .string()
      .min(4, "Password must have minimum 4 characters")
      .required("Password is required"),
    newPassword: yup
      .string()
      .min(4, "Password must have minimum 4 characters")
      .required("Password is required"),
    retypeNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Password must match"),
  })
  .required();

function ChangePasswordDialog({ onCancel, show }: IChangePasswordProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordDto>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      retypeNewPassword: "",
    },
    resolver: yupResolver(changePasswordSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const onChangePasswordSubmit = async (data: ChangePasswordDto) => {};
  return (
    <Dialog
      onClose={onCancel}
      open={show}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle
        sx={{ fontSize: "1.4rem", borderBottom: `1px solid ${grey[200]}` }}
      >
        Change Password
      </DialogTitle>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onChangePasswordSubmit)}
      >
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} mb={1}>
              <Controller
                name="oldPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="password"
                    placeholder="Current Password"
                    label="Current Password"
                    disabled={isLoading}
                    error={!!errors.oldPassword}
                    helperText={errors.oldPassword?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={1}>
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="password"
                    placeholder="New Password"
                    label="New Password"
                    disabled={isLoading}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={1}>
              <Controller
                name="retypeNewPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="password"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    disabled={isLoading}
                    error={!!errors.retypeNewPassword}
                    helperText={errors.retypeNewPassword?.message}
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
            disabled={isLoading}
            onClick={onCancel}
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isLoading}
            startIcon={
              isLoading ? (
                <CircularProgress color="primary" size="16px" />
              ) : null
            }
            type="submit"
          >
            Update password
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default ChangePasswordDialog;
