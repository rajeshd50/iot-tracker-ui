import React, { useState } from "react";
import {
  AddGeoFenceDto,
  GeoFenceCoordinates,
  GeoFenceService,
} from "../../../../../services/geo-fence.service";

import { useForm, Controller, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { ROUTES } from "../../../../../constants";
import { UpdateFenceParams } from "./UserGeoFenceDrawerLoader";
import { GeoFence } from "../../../../../models";

export interface IUserGeoFenceFormProps {
  updateParams?: UpdateFenceParams;
  isEdit?: boolean;
  shouldDisableAddEdit?: boolean;
  isAddUpdateLoading: boolean;
  updateAddEditLoading: (isLoading: boolean) => void;
  geoFence?: GeoFence;
}

const addGeoFenceSchema = yup
  .object({
    name: yup
      .string()
      .max(120, "Name can be of max 120 characters")
      .required("Name is required"),
    description: yup
      .string()
      .optional()
      .max(500, "Description can be of max 500 characters"),
  })
  .required();

function UserGeoFenceForm(props: IUserGeoFenceFormProps) {
  const {
    updateParams,
    isEdit,
    shouldDisableAddEdit,
    isAddUpdateLoading,
    updateAddEditLoading,
    geoFence,
  } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Omit<AddGeoFenceDto, "coordinates" | "type">>({
    defaultValues: {
      name: geoFence?.name || "",
      description: geoFence?.description || "",
    },
    resolver: yupResolver(addGeoFenceSchema),
  });
  const { isDirty } = useFormState({
    control,
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onAddUpdateSubmit = async (
    data: Omit<AddGeoFenceDto, "coordinates" | "type">
  ) => {
    if (
      !updateParams ||
      !updateParams.coordinates ||
      !updateParams.coordinates.length
    ) {
      enqueueSnackbar(
        "Please select a fence from the map, draw circle, rectangle or polygon",
        {
          variant: "error",
        }
      );
      return;
    }
    try {
      updateAddEditLoading(true);
      if (isEdit && geoFence) {
        await GeoFenceService.update({
          ...data,
          ...updateParams,
          id: geoFence.id,
        });
      } else {
        await GeoFenceService.add({
          ...data,
          ...updateParams,
        });
      }
      enqueueSnackbar(`Geo fence ${isEdit ? "updated" : "added"}`, {
        variant: "success",
      });
      navigate(ROUTES.USER.GEO_FENCES);
    } catch (e: any) {
      updateAddEditLoading(false);
      enqueueSnackbar(
        e && e.message
          ? e.message
          : `Unable to ${isEdit ? "update" : "add"} geo-fence`,
        {
          variant: "error",
        }
      );
    }
  };

  const onCancelClick = () => {
    navigate(ROUTES.USER.GEO_FENCES);
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.32))",
          padding: "15px",
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onAddUpdateSubmit)}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} mb={1}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="Geo-fence name"
                    label="Geo-fence Name"
                    disabled={isAddUpdateLoading}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={1}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    multiline
                    rows={5}
                    placeholder="Description"
                    label="Description"
                    disabled={isAddUpdateLoading}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={1}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    type="button"
                    disabled={isAddUpdateLoading}
                    onClick={onCancelClick}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isAddUpdateLoading}
                  >
                    {isAddUpdateLoading && (
                      <CircularProgress
                        size="1rem"
                        color="primary"
                        sx={{
                          marginRight: "8px",
                        }}
                      />
                    )}
                    {isEdit ? "Update geo-fence" : "Add geo-fence"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default UserGeoFenceForm;
