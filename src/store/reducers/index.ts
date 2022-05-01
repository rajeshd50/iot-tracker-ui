import { combineReducers } from "redux";

import appWrapperSlice from "../../app/reducers/appWrapperSlice";
import counterReducer from "../../features/counter/reducers/counterSlice";
import userSlice from "./userSlice";

export default function makeRootReducer() {
  return combineReducers({
    counter: counterReducer,
    appWrapper: appWrapperSlice,
    user: userSlice,
  });
}
