import { Box } from "@mui/material";
import React from "react";

import { useAppSelector } from "../../store/hooks";
import { selectAppDrawerWidth } from "../reducers/appWrapperSlice";
import AppHeader from "../AppHeader/AppHeader";
import AppSideBar from "../AppSideBar/AppSideBar";
import { selectIsUserLoggedIn } from "../../store/reducers/userSlice";

const headerHeight = 64;

function AppWrapper({ children }: React.PropsWithChildren<any>) {
  const drawerWidth = useAppSelector(selectAppDrawerWidth);
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  return (
    <Box sx={{ display: "flex" }}>
      {isLoggedIn && <AppHeader />}
      {isLoggedIn && <AppSideBar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            md: isLoggedIn ? `calc(100% - ${drawerWidth}px)` : 0,
          },
          marginTop: isLoggedIn ? `${headerHeight}px` : 0,
          display: "flex",
          minHeight: isLoggedIn ? `calc(100vh - 64px)` : 'initial',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default AppWrapper;
