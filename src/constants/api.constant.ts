export const API_BASE_URL = "http://localhost:5000/api/";

export const APIS = {
  AUTH: {
    LOGIN: "auth/login",
    REGISTER: "auth/register",
    FORGET_PASSWORD: "auth/forget-password",
    RESET_PASSWORD: "auth/reset-password",
    SEND_VERIFICATION_EMAIL: "auth/send-verification-email",
    VERIFY_EMAIL: "auth/verify-email",
  },
  USER: {
    PROFILE: "user/profile",
    FETCH_ALL_USERS: "user/users",
    UPDATE: "user",
    ADD_USER: "user/add-user",
    FETCH_ALL_USER_WITH_DEVICE_STAT: "user/users-with-device-stat",
    FETCH_USER_DETAILS: "user/user-details/:id",
    UPDATE_STATUS: "user/update-user-status",
  },
  DEVICE_POOL: {
    CREATE: "device-pool/create",
    MARK_CONFIGURED: "device-pool/mark-configured",
    FETCH: "device-pool/fetch",
    DELETE: "device-pool/delete",
  },
  DEVICE: {
    REQUEST_ASSIGNMENT: "device/request-assignment",
    FETCH: "device/fetch",
    UPDATE: "device/update",
    UPDATE_APPROVAL: "device/update-approval",
    UPDATE_STATUS: "device/update-status",
    DETAILS: "device/details",
    DELETE: "device/delete",
    ASSIGN: "device/assign",
  },
};
