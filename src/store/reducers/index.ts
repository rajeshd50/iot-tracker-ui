import { combineReducers } from "redux";

import counterReducer from "../../features/counter/reducers/counterSlice";

export default function makeRootReducer() {
  return combineReducers({
    counter: counterReducer,
  });
}
