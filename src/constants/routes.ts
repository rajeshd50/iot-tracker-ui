export const ROUTES = {
  HOME: "/",
  NOT_FOUND: "*",
  AUTH: {
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    REGISTER: "/register",
    VERIFY_EMAIL: "/verify-email",
  },
  COMMON: {
    PROFILE: "/profile",
    CHANGE_PASSWORD: "/change-password",
  },
  ADMIN: {
    DEVICE_LIST: "/admin/device-list",
    ADD_DEVICE: "/admin/device-add",
    DASHBOARD: "/admin/dashboard",
    USER_LIST: "/admin/user-list",
  },
  USER: {
    DASHBOARD: "/dashboard",
    DEVICE_LIST: "/devices",
    DEVICE_DETAILS: "/device/details/:id",
  },
};
