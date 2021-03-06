import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserAutoCompleteSelect from "../../../../../common/components/admin/user-autocomplete-select/UserAutoCompleteSelect";
import { User } from "../../../../../models";

export interface IAdminRecentPurchasesFilterProps {
  isLoading: boolean;
  onFilterUpdate: (serial: string | null, user: string | null) => void;
  onFilterReset: () => void;
}

function AdminRecentPurchasesFilter(props: IAdminRecentPurchasesFilterProps) {
  const { isLoading, onFilterReset, onFilterUpdate } = props;
  const [serial, setSerial] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      onClickSearch();
    }
  }, [user]);

  const onReset = () => {
    setSerial("");
    setUser(null);
    onFilterReset();
  };

  const onClickSearch = () => {
    onFilterUpdate(serial, user ? user.id : null);
  };

  return (
    <Box
      sx={{
        margin: "15px 0",
      }}
    >
      <Accordion
        elevation={0}
        sx={{
          "&.MuiPaper-root": {
            filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.32))",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="device-filter-content"
          id="device-filter-header"
        >
          <Typography>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Serial"
                placeholder="Serial number"
                name="serial"
                autoComplete="off"
                value={serial}
                onChange={(e) => {
                  setSerial(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <UserAutoCompleteSelect
                onSelect={(newUser) => setUser(newUser)}
                onClear={() => setUser(null)}
                selectedUser={user}
              />
            </Grid>
            <Grid xs={12} sm={12} md={4} item>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: {
                    xs: "space-between",
                    sm: "space-between",
                    md: "flex-end",
                  },
                  alignItems: "center",
                  "& .MuiButton-root": {
                    marginLeft: {
                      xs: "0",
                      sm: "0",
                      md: "30px",
                    },
                  },
                }}
              >
                <Button
                  color="secondary"
                  disabled={(!serial && !user) || isLoading}
                  onClick={onReset}
                >
                  Reset
                </Button>
                <Button
                  disabled={(!serial && !user) || isLoading}
                  color="primary"
                  variant="contained"
                  onClick={onClickSearch}
                >
                  Search
                </Button>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default AdminRecentPurchasesFilter;
