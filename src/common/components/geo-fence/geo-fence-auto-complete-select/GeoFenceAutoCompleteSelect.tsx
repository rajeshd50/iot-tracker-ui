import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";

import { GeoFence } from "../../../../models";
import { FetchGeoFencesDto, GeoFenceService } from "../../../../services";

export interface IGeoFenceAutoCompleteSelectProps {
  selectedGeoFence: GeoFence | null;
  onSelect: (fence: GeoFence | null) => void;
  defaultFilter?: Partial<FetchGeoFencesDto>;
}

function GeoFenceAutoCompleteSelect(props: IGeoFenceAutoCompleteSelectProps) {
  const { onSelect, defaultFilter, selectedGeoFence } = props;
  const randomId = `auto_geo_fence_select_${new Date().getTime()}_${Math.ceil(
    Math.random() * 200
  )}`;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<GeoFence[]>([]);
  const [inputValue, setInputValue] = useState("");

  const loadGeoFences = async (searchText?: string) => {
    setLoading(true);
    try {
      const fencePaginated = await GeoFenceService.fetch({
        page: 1,
        perPage: 10,
        searchText: searchText || undefined,
        ...(defaultFilter || {}),
      });
      setOptions(fencePaginated.items);
    } catch (e: any) {
    } finally {
      setLoading(false);
    }
  };

  const searchUserCallback = useCallback(
    debounce(async (text) => {
      setOptions([]);
      await loadGeoFences(text);
    }, 500),
    []
  );

  useEffect(() => {
    searchUserCallback(inputValue);
  }, [inputValue, searchUserCallback]);

  useEffect(() => {
    loadGeoFences();
  }, []);

  return (
    <Autocomplete<GeoFence>
      id={randomId}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      loading={loading}
      options={options}
      value={selectedGeoFence}
      filterOptions={(x) => x}
      noOptionsText="No geo-fence found"
      onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
      onChange={(e, value) => {
        onSelect(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Geo-Fence"
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

export default GeoFenceAutoCompleteSelect;
