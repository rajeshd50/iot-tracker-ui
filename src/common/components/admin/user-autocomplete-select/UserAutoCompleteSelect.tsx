import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";

import { User } from "../../../../models";
import { UserService } from "../../../../services";

export interface IUserAutoCompleteSelectProps {
  onSelect: (userId: string) => void;
  onClear: () => void;
}

function UserAutoCompleteSelect(props: IUserAutoCompleteSelectProps) {
  const { onSelect, onClear } = props;
  const randomId = `auto_user_select_${new Date().getTime()}_${Math.ceil(
    Math.random() * 200
  )}`;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState("");

  const loadUsers = async (searchText?: string) => {
    setLoading(true);
    try {
      const userPaginated = await UserService.fetchAllUsers({
        page: 1,
        perPage: 10,
        searchText: searchText || undefined,
      });
      setOptions(userPaginated.items);
    } catch (e: any) {
    } finally {
      setLoading(false);
    }
  };

  const searchUserCallback = useCallback(
    debounce(async (text) => {
      setOptions([]);
      await loadUsers(text);
    }, 500),
    []
  );

  useEffect(() => {
    searchUserCallback(inputValue);
  }, [inputValue, searchUserCallback]);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUser && selectedUser.id) {
      onSelect(selectedUser.id);
    } else {
      onClear();
    }
  }, [selectedUser, onSelect, onClear]);

  return (
    <Autocomplete<User>
      id={randomId}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => `${option.fullName} (${option.email})`}
      loading={loading}
      options={options}
      value={selectedUser}
      filterOptions={(x) => x}
      noOptionsText="No user found"
      onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
      onChange={(e, value) => {
        setSelectedUser(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select User"
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

export default UserAutoCompleteSelect;
