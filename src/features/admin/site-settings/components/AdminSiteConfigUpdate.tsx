import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import {
  getSiteConfigValueByType,
  globalDialogClose,
} from "../../../../common/util/util";
import { SiteConfig, SITE_CONFIG_TYPES } from "../../../../models";
import { UpdateSiteConfigDto } from "../../../../services";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";

export interface IAdminSiteConfigUpdateProps {
  siteConfig: SiteConfig;
  loading: boolean;
  show: boolean;
  onClose: () => void;
  onUpdate: (data: UpdateSiteConfigDto) => void;
}

function AdminSiteConfigUpdate(props: IAdminSiteConfigUpdateProps) {
  const { siteConfig, loading, show, onClose, onUpdate } = props;

  const [description, setDescription] = useState("");

  const [singleTextValue, setSingleTextValue] = useState<string>("");
  const [multipleTextValue, setMultipleTextValue] = useState<string[]>([]);
  const [dateValue, setDateValue] = useState<Date | "">("");
  const [dateTimeValue, setDateTimeValue] = useState<Date | "">("");
  const [numberValue, setNumberValue] = useState<number | "">("");
  const [booleanValue, setBooleanValue] = useState<boolean | "">("");
  const [finalValue, setFinalValue] = useState<string>("");

  useEffect(() => {
    switch (siteConfig.type) {
      case SITE_CONFIG_TYPES.BOOLEAN:
        setFinalValue(booleanValue ? "true" : "false");
        break;
      case SITE_CONFIG_TYPES.TEXT:
        if (siteConfig.isMultipleEntry) {
          setFinalValue(
            multipleTextValue && multipleTextValue.length
              ? multipleTextValue.join(",")
              : ""
          );
        } else {
          setFinalValue(singleTextValue || "");
        }
        break;
      case SITE_CONFIG_TYPES.NUMBER:
        setFinalValue(String(numberValue));
        break;
      case SITE_CONFIG_TYPES.DATE:
        setFinalValue(dateValue ? dateValue.toISOString() : "");
        break;
      case SITE_CONFIG_TYPES.DATE_TIME:
        setFinalValue(dateTimeValue ? dateTimeValue.toISOString() : "");
        break;
      default:
        setFinalValue("");
    }
  }, [
    singleTextValue,
    multipleTextValue,
    dateValue,
    dateTimeValue,
    numberValue,
    booleanValue,
    siteConfig,
  ]);

  useEffect(() => {
    if (siteConfig) {
      const updatedValue = getSiteConfigValueByType(
        siteConfig.value,
        siteConfig.type
      );
      switch (siteConfig.type) {
        case SITE_CONFIG_TYPES.BOOLEAN:
          setBooleanValue(updatedValue);
          break;
        case SITE_CONFIG_TYPES.TEXT:
          if (siteConfig.isMultipleEntry) {
            setMultipleTextValue(
              updatedValue
                ? updatedValue.split(",").map((x: string) => x.trim())
                : []
            );
          } else {
            setSingleTextValue(updatedValue);
          }
          break;
        case SITE_CONFIG_TYPES.NUMBER:
          setNumberValue(updatedValue);
          break;
        case SITE_CONFIG_TYPES.DATE:
          setDateValue(updatedValue);
          break;
        case SITE_CONFIG_TYPES.DATE_TIME:
          setDateTimeValue(updatedValue);
          break;
        default:
          setSingleTextValue(updatedValue || "");
      }
      setDescription(siteConfig.description || "");
    }
  }, [siteConfig]);

  const renderTextField = () => {
    return (
      <TextField
        type="text"
        label="Value"
        placeholder="Value"
        name="value"
        value={singleTextValue}
        onChange={(e) => setSingleTextValue(e.target.value)}
      />
    );
  };

  const renderNumberField = () => {
    return (
      <>
        <TextField
          type="number"
          label="Value"
          placeholder="Value"
          name="value"
          value={numberValue}
          onChange={(e) =>
            setNumberValue(e.target.value ? parseInt(e.target.value, 10) : "")
          }
        />
        <Typography variant="subtitle2">
          -1 means unlimited, if applicable
        </Typography>
      </>
    );
  };

  const renderDateTimeField = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Value"
          openTo="day"
          value={dateTimeValue}
          onChange={(newValue) => {
            setDateTimeValue(newValue || "");
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  };

  const renderDateField = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Value"
          openTo="day"
          views={["day", "month", "year"]}
          value={dateValue}
          onChange={(newValue) => {
            setDateValue(newValue || "");
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  };
  const renderBooleanField = () => {
    return (
      <FormControl fullWidth>
        <InputLabel id="site-config-boolean-filter-select-label">
          Value
        </InputLabel>
        <Select
          labelId="site-config-boolean-filter-select-label"
          id="site-config-boolean-filter-select"
          value={booleanValue}
          label="Value"
          onChange={(e) => setBooleanValue(e.target.value === "true")}
        >
          <MenuItem value="true">true</MenuItem>
          <MenuItem value="false">false</MenuItem>
        </Select>
      </FormControl>
    );
  };
  const renderMultiTextField = () => {
    return (
      <>
        <Autocomplete<string, true, false, true>
          multiple
          id="multiple-input-text"
          options={[]}
          value={multipleTextValue}
          onChange={(e, newValue) => setMultipleTextValue(newValue)}
          freeSolo
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                variant="outlined"
                color="primary"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Value"
              placeholder="Value"
              sx={{
                "& .MuiInputBase-root": {
                  height: "auto",
                },
              }}
            />
          )}
        />
        <Typography variant="subtitle2">
          Please press enter after one entry
        </Typography>
      </>
    );
  };

  const renderValueInput = () => {
    switch (siteConfig.type) {
      case SITE_CONFIG_TYPES.BOOLEAN:
        return renderBooleanField();
      case SITE_CONFIG_TYPES.TEXT:
        if (siteConfig.isMultipleEntry) {
          return renderMultiTextField();
        }
        return renderTextField();
      case SITE_CONFIG_TYPES.NUMBER:
        return renderNumberField();
      case SITE_CONFIG_TYPES.DATE:
        return renderDateField();
      case SITE_CONFIG_TYPES.DATE_TIME:
        return renderDateTimeField();
      default:
        return renderTextField();
    }
  };

  const onClickUpdate = () => {
    onUpdate({
      key: siteConfig.key,
      value: finalValue || "",
      description,
    });
  };
  return (
    <Dialog
      onClose={globalDialogClose(onClose)}
      open={show}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle
        sx={{ fontSize: "1.4rem", borderBottom: `1px solid ${grey[200]}` }}
      >
        Update config ({siteConfig.key})
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1} mt={2}>
          <Grid item xs={12} mb={1}>
            {renderValueInput()}
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              label="Description"
              placeholder="Description"
              sx={{
                marginBottom: "2px",
              }}
            />
            <Typography variant="subtitle2">
              Only for user information purpose
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
          disabled={loading || !finalValue}
          variant="contained"
          color="primary"
          type="button"
          onClick={onClickUpdate}
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
    </Dialog>
  );
}

export default AdminSiteConfigUpdate;
