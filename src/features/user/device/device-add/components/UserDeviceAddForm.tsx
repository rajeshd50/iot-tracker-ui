import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import { useForm, Controller, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  DeviceService,
  RequestDeviceAssignmentDto,
} from "../../../../../services";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";

import DeviceQrScanner from "./DeviceQrScanner";
import { ROUTES } from "../../../../../constants";

const addDeviceSchema = yup
  .object({
    serial: yup
      .string()
      .max(30, "Serial number can be of max 30 characters")
      .required("Serial number is required"),
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

function UserDeviceAddForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<RequestDeviceAssignmentDto>({
    defaultValues: {
      serial: "",
      name: "",
      vehicleName: "",
      vehicleNumber: "",
      driverName: "",
      driverContact: "",
      driverOtherDetails: "",
    },
    resolver: yupResolver(addDeviceSchema),
  });
  const { isDirty } = useFormState({
    control,
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isAddDeviceLoading, setIsAddDeviceLoading] = useState(false);
  const [addAdditionalInfo, setAddAdditionalInfo] = useState(false);

  const [showQrScanner, setShowQrScanner] = useState(false);

  const onResetClick = () => {
    setAddAdditionalInfo(false);
    reset();
  };

  useEffect(() => {
    if (!addAdditionalInfo) {
      setValue("driverName", "");
      setValue("driverContact", "");
      setValue("driverOtherDetails", "");
    }
  }, [addAdditionalInfo]);

  const onCancelScanner = () => {
    setShowQrScanner(false);
  };

  const onScanSuccess = (text: string) => {
    setValue("serial", text);
  };

  const onAddDeviceSubmit = async (data: RequestDeviceAssignmentDto) => {
    try {
      setIsAddDeviceLoading(true);
      await DeviceService.requestAssignment({
        ...data,
        serial: data.serial.toLocaleUpperCase(),
        vehicleNumber: data.vehicleNumber?.toLocaleUpperCase(),
      });
      setIsAddDeviceLoading(false);
      enqueueSnackbar(
        "Device add request submitted, you will get mail once added",
        {
          variant: "success",
        }
      );
      navigate(ROUTES.USER.DEVICE_LIST);
    } catch (e: any) {
      enqueueSnackbar(e && e.message ? e.message : "Unable to add device", {
        variant: "error",
      });
    } finally {
      setIsAddDeviceLoading(false);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onAddDeviceSubmit)}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} mb={1}>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <Controller
                name="serial"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="SN-XXXXXX-XXXXXX-XXXXXX-XXXXXX"
                    label="Serial number"
                    disabled={isAddDeviceLoading}
                    error={!!errors.serial}
                    helperText={errors.serial?.message}
                    required
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={() => setShowQrScanner(true)}
                sx={{
                  height: "48px",
                }}
              >
                Scan
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} mb={1}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                type="text"
                placeholder="My Car One"
                label="Device Name"
                disabled={isAddDeviceLoading}
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
                disabled={isAddDeviceLoading}
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
                disabled={isAddDeviceLoading}
                error={!!errors.vehicleNumber}
                helperText={errors.vehicleNumber?.message}
                required
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} my={1}>
          <FormControlLabel
            control={
              <Switch
                checked={addAdditionalInfo}
                onChange={() => setAddAdditionalInfo(!addAdditionalInfo)}
                size="small"
              />
            }
            label="Add additional driver information"
          />
          <Collapse in={addAdditionalInfo}>
            <Grid container spacing={1}>
              <Grid item xs={12} mt={1}>
                <Controller
                  name="driverName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="text"
                      placeholder="John Doe"
                      label="Driver name"
                      disabled={isAddDeviceLoading}
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
                      disabled={isAddDeviceLoading}
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
                      disabled={isAddDeviceLoading}
                      error={!!errors.driverOtherDetails}
                      helperText={errors.driverOtherDetails?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                type="button"
                disabled={!isDirty || isAddDeviceLoading}
                onClick={onResetClick}
              >
                Reset
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={isAddDeviceLoading}
              >
                {isAddDeviceLoading && (
                  <CircularProgress
                    size="1rem"
                    color="primary"
                    sx={{
                      marginRight: "8px",
                    }}
                  />
                )}
                Add Device
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DeviceQrScanner
        show={showQrScanner}
        onCancel={onCancelScanner}
        onScanDone={onScanSuccess}
      />
    </Box>
  );
}

export default UserDeviceAddForm;
