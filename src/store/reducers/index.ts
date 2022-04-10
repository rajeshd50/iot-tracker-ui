import { combineReducers } from "redux";

import appWrapperSlice from "../../app/reducers/appWrapperSlice";
import userSlice from "../../features/common/reducers/userSlice";
import counterReducer from "../../features/counter/reducers/counterSlice";

export default function makeRootReducer() {
  return combineReducers({
    counter: counterReducer,
    appWrapper: appWrapperSlice,
    user: userSlice,
  });
}
