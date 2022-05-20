import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm, Controller, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { User } from "../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectUserDetails,
  setUserDetails,
} from "../../../../store/reducers/userSlice";
import { IUpdateUserDto, UserService } from "../../../../services";
import { useSnackbar } from "notistack";

const titles = ["Mr", "Mrs", "Miss", "Dr"];

const updateUserSchema = yup
  .object({
    title: yup.string().nullable().optional(),
    firstName: yup
      .string()
      .max(60, "First name should be within 60 characters")
      .required("First name is required"),
    lastName: yup
      .string()
      .max(60, "Last name should be within 60 characters")
      .required("Last name is required"),
    middleName: yup
      .string()
      .optional()
      .max(60, "Middle name should be within 60 characters"),
    addressLine1: yup
      .string()
      .optional()
      .max(120, "Address line 1 should be within 120 characters"),
    addressLine2: yup
      .string()
      .optional()
      .max(120, "Address line 2 should be within 120 characters"),
    city: yup
      .string()
      .optional()
      .max(60, "City should be within 60 characters"),
    state: yup
      .string()
      .optional()
      .max(60, "State should be within 60 characters"),
    zip: yup.string().optional().max(8, "ZIP should be within 8 characters"),
    country: yup
      .string()
      .optional()
      .max(60, "Country should be within 60 characters"),
    primaryContactNumber: yup
      .string()
      .optional()
      .max(12, "Primary contact number should be within 12 characters"),
    secondaryContactNumber: yup
      .string()
      .optional()
      .max(12, "Secondary contact number should be within 12 characters"),
    alternateEmailAddress: yup
      .string()
      .email("Should be a valid email address")
      .optional()
      .max(120, "Alternate Email Address should be within 120 characters"),
  })
  .required();

function UserBasicProfileUpdate() {
  const userDetails: User = useAppSelector(selectUserDetails);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IUpdateUserDto>({
    defaultValues: {
      title: userDetails.title || "",
      firstName: userDetails.firstName || "",
      middleName: userDetails.middleName || "",
      lastName: userDetails.lastName || "",
      addressLine1: userDetails.addressLine1 || "",
      addressLine2: userDetails.addressLine2 || "",
      city: userDetails.city || "",
      state: userDetails.state || "",
      zip: userDetails.zip || "",
      country: userDetails.country || "",
      primaryContactNumber: userDetails.primaryContactNumber || "",
      secondaryContactNumber: userDetails.secondaryContactNumber || "",
      alternateEmailAddress: userDetails.alternateEmailAddress || "",
    },
    resolver: yupResolver(updateUserSchema),
  });
  const { isDirty } = useFormState({
    control,
  });
  const { enqueueSnackbar } = useSnackbar();
  const [isUserUpdateLoading, setIsUserUpdateLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onUpdateUserSubmit = async (data: IUpdateUserDto) => {
    try {
      setIsUserUpdateLoading(true);
      const updatedUser = await UserService.update(data);
      dispatch(setUserDetails(updatedUser));
      enqueueSnackbar("Profile updated", {
        variant: "success",
      });
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Unable to update basic information",
        {
          variant: "error",
        }
      );
    } finally {
      setIsUserUpdateLoading(false);
    }
  };

  const onResetClick = () => {
    setValue("title", userDetails.title || "");
    setValue("firstName", userDetails.firstName || "");
    setValue("middleName", userDetails.middleName || "");
    setValue("lastName", userDetails.lastName || "");
    setValue("addressLine1", userDetails.addressLine1 || "");
    setValue("addressLine2", userDetails.addressLine2 || "");
    setValue("city", userDetails.city || "");
    setValue("state", userDetails.state || "");
    setValue("zip", userDetails.zip || "");
    setValue("country", userDetails.country || "");
    setValue("primaryContactNumber", userDetails.primaryContactNumber || "");
    setValue(
      "secondaryContactNumber",
      userDetails.secondaryContactNumber || ""
    );
    setValue("alternateEmailAddress", userDetails.alternateEmailAddress || "");
  };
  return (
    <Paper
      sx={{
        width: "100%",
        filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.32))",
        padding: "15px",
      }}
      elevation={0}
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onUpdateUserSubmit)}
      >
        <Grid container spacing={1}>
          <Grid item xs={4} mb={1}>
            <Controller
              name="title"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  select
                  placeholder="Mr/Mrs"
                  label="Title"
                  disabled={isUserUpdateLoading}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  value={value}
                  onChange={onChange}
                >
                  {titles.map((title) => (
                    <MenuItem key={title} value={title}>
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item mb={1} xs={8}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  placeholder="John"
                  label="First name"
                  disabled={isUserUpdateLoading}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  required
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item mb={1} xs={12} sm={6}>
            <Controller
              name="middleName"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  placeholder="John"
                  label="Middle name"
                  disabled={isUserUpdateLoading}
                  error={!!errors.middleName}
                  helperText={errors.middleName?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item mb={1} xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  placeholder="Doe"
                  label="Last name"
                  disabled={isUserUpdateLoading}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  required
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item mb={1} xs={12} sm={6}>
            <Controller
              name="addressLine1"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  placeholder="Flat no/House no/street"
                  label="Address Line 1"
                  disabled={isUserUpdateLoading}
                  error={!!errors.addressLine1}
                  helperText={errors.addressLine1?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item mb={1} xs={12} sm={6}>
            <Controller
              name="addressLine2"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  placeholder="Locality"
                  label="Address Line 2"
                  disabled={isUserUpdateLoading}
                  error={!!errors.addressLine2}
                  helperText={errors.addressLine2?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item mb={1} xs={12} sm={6}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  placeholder="Kolkata"
                  label="City"
                  disabled={isUserUpdateLoading}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item mb={1} xs={12} sm={6}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  placeholder="WB"
                  label="State"
                  disabled={isUserUpdateLoading}
                  error={!!errors.state}
                  helperText={errors.state?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item mb={1} xs={12} sm={6}>
            <Controller
              name="zip"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  placeholder="700001"
                  label="zip"
                  disabled={isUserUpdateLoading}
                  error={!!errors.zip}
                  helperText={errors.zip?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item mb={1} xs={12} sm={6}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  placeholder="India"
                  label="Country"
                  disabled={isUserUpdateLoading}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item mb={1} xs={12} sm={6}>
            <Controller
              name="primaryContactNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  placeholder="1234567890"
                  label="Primary Contact Number"
                  disabled={isUserUpdateLoading}
                  error={!!errors.primaryContactNumber}
                  helperText={errors.primaryContactNumber?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item mb={1} xs={12} sm={6}>
            <Controller
              name="secondaryContactNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  type="text"
                  placeholder="1234567890"
                  label="Secondary Contact Number"
                  disabled={isUserUpdateLoading}
                  error={!!errors.secondaryContactNumber}
                  helperText={errors.secondaryContactNumber?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item mb={1} xs={12}>
            <Controller
              name="alternateEmailAddress"
              control={control}
              render={({ field }) => (
                <TextField
                  type="email"
                  placeholder="India"
                  label="Alternate Email Address"
                  disabled={isUserUpdateLoading}
                  error={!!errors.alternateEmailAddress}
                  helperText={errors.alternateEmailAddress?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                padding: "8px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                type="button"
                disabled={!isDirty || isUserUpdateLoading}
                onClick={onResetClick}
                sx={{
                  minWidth: "120px",
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isUserUpdateLoading}
                sx={{
                  minWidth: "120px",
                }}
              >
                {isUserUpdateLoading && (
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default UserBasicProfileUpdate;
