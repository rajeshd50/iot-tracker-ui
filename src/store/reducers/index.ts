import { combineReducers } from "redux";

import appWrapperSlice from "../../app/reducers/appWrapperSlice";
import deviceGeoFencesSlice from "./deviceGeoFencesSlice";
import userSlice from "./userSlice";

export default function makeRootReducer() {
  return combineReducers({
    appWrapper: appWrapperSlice,
    user: userSlice,
    deviceGeoFences: deviceGeoFencesSlice,
  });
}
