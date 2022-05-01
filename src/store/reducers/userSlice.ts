import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models";
import { RootState } from "../store";

export interface UserState {
  userDetails: User | undefined;
  isAdmin: boolean | undefined;
  isLoggedIn: boolean;
  token: string | undefined;
}

const initialState: UserState = {
  userDetails: undefined,
  isAdmin: false,
  isLoggedIn: false,
  token: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (
      state,
      action: PayloadAction<Omit<UserState, "isAdmin" | "isLoggedIn">>
    ) => {
      state.userDetails = action.payload.userDetails;
      state.isLoggedIn = true;
      state.isAdmin = action.payload.userDetails?.role === "admin";
      state.token = action.payload.token;
    },
    setLoggedOut: (state) => {
      state.userDetails = undefined;
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.token = undefined;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<User>) => {
      state.userDetails = action.payload;
    },
  },
});
export const { setLoggedIn, setLoggedOut, setToken, setUserDetails } =
  userSlice.actions;

export const selectUserDetails = (state: RootState) => state.user.userDetails;

export const selectAuthToken = (state: RootState) => state.user.token;

export const selectIsUserAdmin = (state: RootState) => state.user.isAdmin;

export const selectIsUserLoggedIn = (state: RootState) => state.user.isLoggedIn;

export default userSlice.reducer;
