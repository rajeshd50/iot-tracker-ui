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
    FIRMWARE: "/admin/firmware",
    SITE_SETTINGS: "/admin/site-settings",
  },
  USER: {
    DASHBOARD: "/dashboard",
    DEVICE_LIST: "/devices",
    DEVICE_DETAILS: "/device/details/:serial",
    ADD_NEW_DEVICE: "/device/add",
    GEO_FENCES: "/geo-fences",
    GEO_FENCE_DETAILS: "/geo-fence/view/:id",
    GEO_FENCE_ADD: "/geo-fence/add",
    GEO_FENCE_EDIT: "/geo-fence/update/:id",
  },
};
