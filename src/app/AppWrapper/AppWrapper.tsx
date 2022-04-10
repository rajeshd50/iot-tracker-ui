import { Box } from "@mui/material";
import React from "react";

import { useAppSelector } from "../../store/hooks";
import { selectAppDrawerWidth } from "../reducers/appWrapperSlice";
import AppHeader from "../AppHeader/AppHeader";
import AppSideBar from "../AppSideBar/AppSideBar";

const headerHeight = 64;

function AppWrapper({ children }: React.PropsWithChildren<any>) {
  const drawerWidth = useAppSelector(selectAppDrawerWidth);
  return (
    <Box sx={{ display: "flex" }}>
      <AppHeader />
      <AppSideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            md: `calc(100% - ${drawerWidth}px)`,
          },
          marginTop: `${headerHeight}px`,
          display: "flex",
          minHeight: `calc(100vh - 64px)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default AppWrapper;
