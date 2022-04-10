import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

import theme from "../theme/default/default";
import AppRoute from "../routes/AppRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <AppRoute />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
