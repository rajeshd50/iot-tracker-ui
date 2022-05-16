import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Device, GeoFence } from "../../models";
import { RootState } from "../store";

export interface DeviceGeoFencesState {
  deviceDetails: Device | undefined;
  availableFences: GeoFence[];
  shouldFocusToFence: GeoFence | undefined;
}

const initialState: DeviceGeoFencesState = {
  deviceDetails: undefined,
  availableFences: [],
  shouldFocusToFence: undefined,
};

export const deviceGeoFencesSlice = createSlice({
  name: "deviceGeoFences",
  initialState,
  reducers: {
    setDeviceDetailsInReducer: (state, action: PayloadAction<Device>) => {
      state.deviceDetails = action.payload;
    },
    setDeviceGeoFencesInReducer: (state, action: PayloadAction<GeoFence[]>) => {
      state.availableFences = action.payload;
    },
    setFocusFenceInReducer: (state, action: PayloadAction<GeoFence>) => {
      state.shouldFocusToFence = action.payload;
    },
    resetDeviceDetailsInReducer: (state) => {
      state.deviceDetails = undefined;
    },
    resetDeviceGeoFencesInReducer: (state) => {
      state.availableFences = [];
    },
    resetFocusFenceInReducer: (state) => {
      state.shouldFocusToFence = undefined;
    },
    resetAllDeviceGeoFences: (state) => {
      state.deviceDetails = undefined;
      state.availableFences = [];
      state.shouldFocusToFence = undefined;
    },
  },
});

export const {
  setDeviceDetailsInReducer,
  setDeviceGeoFencesInReducer,
  setFocusFenceInReducer,
  resetDeviceDetailsInReducer,
  resetDeviceGeoFencesInReducer,
  resetFocusFenceInReducer,
  resetAllDeviceGeoFences,
} = deviceGeoFencesSlice.actions;

export const selectDeviceDetails = (state: RootState) =>
  state.deviceGeoFences.deviceDetails;

export const selectDeviceGeoFences = (state: RootState) =>
  state.deviceGeoFences.availableFences;

export const selectFocusFence = (state: RootState) =>
  state.deviceGeoFences.shouldFocusToFence;

export default deviceGeoFencesSlice.reducer;
