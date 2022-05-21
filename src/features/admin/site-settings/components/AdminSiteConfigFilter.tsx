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
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export interface IAdminSiteConfigFilterProps {
  isLoading: boolean;
  onFilterUpdate: (searchText: string | null) => void;
  onFilterReset: () => void;
}

function AdminSiteConfigFilter(props: IAdminSiteConfigFilterProps) {
  const { isLoading, onFilterReset, onFilterUpdate } = props;
  const [searchText, setSearchText] = useState("");

  const onReset = () => {
    setSearchText("");
    onFilterReset();
  };

  const onClickSearch = () => {
    onFilterUpdate(searchText);
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
            <Grid item xs={12} sm={8}>
              <TextField
                label="Search Text"
                placeholder="Search by key, value or description"
                name="searchText"
                autoComplete="off"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={12} sm={4} item>
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
                  disabled={!searchText || isLoading}
                  onClick={onReset}
                >
                  Reset
                </Button>
                <Button
                  disabled={!searchText || isLoading}
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

export default AdminSiteConfigFilter;
