import { Box } from "@mui/material";
import React from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectAppDrawerWidth } from "../reducers/appWrapperSlice";
import AppHeader from "../AppHeader/AppHeader";
import AppSideBar from "../AppSideBar/AppSideBar";

const headerHeight = 64;

function AppWrapper({ children }: React.PropsWithChildren<any>) {
  const drawerWidth = useAppSelector(selectAppDrawerWidth);
  const dispatch = useAppDispatch();
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
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default AppWrapper;
