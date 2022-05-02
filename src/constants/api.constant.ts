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
  },
};
