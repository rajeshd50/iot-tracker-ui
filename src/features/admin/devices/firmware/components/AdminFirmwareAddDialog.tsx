import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import semverRegex from "semver-regex";
import { AddFirmwareDto } from "../../../../../services";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export interface IAdminFirmwareAddDialogProps {
  loading: boolean;
  show: boolean;
  onClose: () => void;
  onFirmwareAdd: (file: File, data: AddFirmwareDto) => void;
}

interface AddFirmwareCustom extends AddFirmwareDto {
  fileName: string;
}

const addFirmwareSchema = yup
  .object({
    version: yup
      .string()
      .nullable()
      .matches(semverRegex(), {
        message: "Please use proper versioning format (i.e. 1.0.2 or v1.2.3)",
      })
      .required("Version is required"),
    fileName: yup.string().required("Firmware file is required"),
  })
  .required();

function AdminFirmwareAddDialog(props: IAdminFirmwareAddDialogProps) {
  const inputElem = useRef<any>(null);
  const { loading, show, onClose, onFirmwareAdd } = props;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddFirmwareCustom>({
    defaultValues: {
      version: "",
      fileName: "",
    },
    resolver: yupResolver(addFirmwareSchema),
  });

  useEffect(() => {
    if (selectedFile) {
      setValue("fileName", selectedFile.name);
    }
  }, [selectedFile]);

  const onAddFirmwareSubmit = async (data: AddFirmwareCustom) => {
    if (!selectedFile) {
      return;
    }
    onFirmwareAdd(selectedFile, {
      version: data.version,
    });
  };
  const onFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      let file = e.target.files[0];
      setSelectedFile(file);
    }
  };
  const openFileInput = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputElem) {
      inputElem.current.click();
    }
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
        Add new firmware
      </DialogTitle>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onAddFirmwareSubmit)}
      >
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} mb={1}>
              <Controller
                name="fileName"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    label="File"
                    disabled={loading}
                    error={!!errors.fileName}
                    helperText={errors.fileName?.message}
                    onClick={openFileInput}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={openFileInput}>
                            <FileUploadIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={1}>
              <Controller
                name="version"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="v1.2.3"
                    label="Version"
                    disabled={loading}
                    error={!!errors.version}
                    helperText={errors.version?.message}
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
            Add Firmware
          </Button>
        </DialogActions>
        <input
          type="file"
          style={{ display: "none" }}
          ref={inputElem}
          onChange={onFileChanged}
        />
      </Box>
    </Dialog>
  );
}

export default AdminFirmwareAddDialog;
