import axios from "axios";
import { API_BASE_URL } from "../constants";
import { setLoggedOut } from "../store/reducers/userSlice";

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

let axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const userState = store.getState().user;
      if (userState && userState.isLoggedIn && userState.token) {
        config.headers.authorization = `Bearer ${userState.token}`;
      }
    }
    return config;
  },
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      store.dispatch(setLoggedOut());
    }
  }
);

axiosInstance.interceptors.response.use(undefined, (error) => {
  const { status } = error.response;
  if (status === 401) {
    store.dispatch(setLoggedOut());
  }
  return Promise.resolve(error.response);
});

export const BaseApi = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  patch: axiosInstance.patch,
};
