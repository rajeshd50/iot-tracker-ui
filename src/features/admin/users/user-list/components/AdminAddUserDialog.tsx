import {
  TextField,
  Grid,
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AddUserData } from "../../../../../services";
import { grey } from "@mui/material/colors";
import { ADD_ROLE } from "../../../../../constants";

const addUserSchema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(4, "Password must have minimum 4 characters")
      .required("Password is required"),
    retypePassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match"),
    role: yup
      .string()
      .oneOf([ADD_ROLE.ADMIN, ADD_ROLE.USER])
      .required("Please select user role"),
  })
  .required();

export interface IAdminAddUserDialogProps {
  loading: boolean;
  show: boolean;
  onClose: () => void;
  onAddUser: (data: AddUserData) => void;
}

function AdminAddUserDialog({
  loading,
  onAddUser,
  onClose,
  show,
}: IAdminAddUserDialogProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserData>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      retypePassword: "",
      role: ADD_ROLE.USER,
    },
    resolver: yupResolver(addUserSchema),
  });

  const onRegisterSubmit = async (data: AddUserData) => {
    onAddUser(data);
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
        Add new user
      </DialogTitle>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onRegisterSubmit)}
      >
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} mb={1}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="First name"
                    label="First name"
                    disabled={loading}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={1}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="Last Name"
                    label="Last Name"
                    disabled={loading}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={1}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="email"
                    placeholder="Email address"
                    label="Email address"
                    disabled={loading}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={1}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="password"
                    placeholder="Password"
                    label="Password"
                    disabled={loading}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={1}>
              <Controller
                name="retypePassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="password"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    disabled={loading}
                    error={!!errors.retypePassword}
                    helperText={errors.retypePassword?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={1}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="user-status-select-label">Role</InputLabel>
                    <Select
                      labelId="user-status-select-label"
                      id="user-status-select"
                      label="Role"
                      {...field}
                    >
                      <MenuItem value={ADD_ROLE.USER}>User</MenuItem>
                      <MenuItem value={ADD_ROLE.ADMIN}>Admin</MenuItem>
                    </Select>
                  </FormControl>
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
            Add User
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default AdminAddUserDialog;
