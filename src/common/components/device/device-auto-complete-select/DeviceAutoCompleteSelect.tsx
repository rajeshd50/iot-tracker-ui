import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";

import { Device, DeviceStatus } from "../../../../models";
import { DeviceService, FetchDeviceDto } from "../../../../services";

export interface IDeviceAutoCompleteSelectProps {
  selectedDevice: Device | null;
  onSelect: (device: Device | null) => void;
  defaultFilter?: Partial<FetchDeviceDto>;
}

function DeviceAutoCompleteSelect(props: IDeviceAutoCompleteSelectProps) {
  const { onSelect, defaultFilter, selectedDevice } = props;
  const randomId = `auto_device_select_${new Date().getTime()}_${Math.ceil(
    Math.random() * 200
  )}`;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Device[]>([]);
  const [inputValue, setInputValue] = useState("");

  const loadDevices = async (searchText?: string) => {
    setLoading(true);
    try {
      const devicePaginated = await DeviceService.fetch({
        page: 1,
        perPage: 10,
        searchText: searchText || undefined,
        ...(defaultFilter || {}),
      });
      setOptions(devicePaginated.items);
    } catch (e: any) {
    } finally {
      setLoading(false);
    }
  };

  const searchUserCallback = useCallback(
    debounce(async (text) => {
      setOptions([]);
      await loadDevices(text);
    }, 500),
    []
  );

  useEffect(() => {
    searchUserCallback(inputValue);
  }, [inputValue, searchUserCallback]);

  useEffect(() => {
    loadDevices();
  }, []);

  return (
    <Autocomplete<Device>
      id={randomId}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) =>
        `${option.serial} (${
          option.name || option.vehicleName || option.vehicleNumber
        })`
      }
      loading={loading}
      options={options}
      value={selectedDevice}
      filterOptions={(x) => x}
      noOptionsText="No device found"
      onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
      onChange={(e, value) => {
        onSelect(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Device"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default DeviceAutoCompleteSelect;
