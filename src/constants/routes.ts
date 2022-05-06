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
  },
  ADMIN: {
    DEVICE_LIST: "/admin/device-list",
    DEVICE_POOL: "/admin/device-pool",
    RECENT_PURCHASES: "/admin/recent-purchases",
    DASHBOARD: "/admin/dashboard",
    USER_LIST: "/admin/user-list",
  },
  USER: {
    DASHBOARD: "/dashboard",
    DEVICE_LIST: "/devices",
    DEVICE_DETAILS: "/device/details/:serial",
    ADD_NEW_DEVICE: "/device/add",
  },
};
