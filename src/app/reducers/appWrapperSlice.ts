import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { FULL_DRAWER_WIDTH } from "../AppSideBar/AppSideBar";

export interface AppWrapperState {
  drawerWidth: number;
  isMobileOpen: boolean;
  isMini: boolean;
}

const initialState: AppWrapperState = {
  drawerWidth: FULL_DRAWER_WIDTH,
  isMobileOpen: false,
  isMini: false,
};

export const appWrapperSlice = createSlice({
  name: "appWrapper",
  initialState,
  reducers: {
    setDrawerWidth: (state, action: PayloadAction<number>) => {
      state.drawerWidth = action.payload;
    },
    setMobileOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileOpen = action.payload;
    },
    setIsMini: (state, action: PayloadAction<boolean>) => {
      state.isMini = action.payload;
    },
  },
});

export const { setDrawerWidth, setMobileOpen, setIsMini } =
  appWrapperSlice.actions;

export const selectAppDrawerWidth = (state: RootState) =>
  state.appWrapper.drawerWidth;

export const selectAppDrawerIsMobileOpen = (state: RootState) =>
  state.appWrapper.isMobileOpen;

export const selectAppDrawerIsMini = (state: RootState) =>
  state.appWrapper.isMini;

export default appWrapperSlice.reducer;
