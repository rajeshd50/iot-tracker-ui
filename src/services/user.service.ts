import { ADD_ROLE, APIS, ROLE_TYPES } from "../constants";
import { PaginatedResponse, User, UserWithDevice } from "../models";
import { BaseApi } from "./base-api";
import { getErrorMessage } from "./common";

export interface IUpdateUserDto {
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  primaryContactNumber?: string;
  secondaryContactNumber?: string;
  alternateEmailAddress?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  retypePassword: string;
  firstName: string;
  lastName: string;
}

export interface AddUserData extends RegisterData {
  role: ADD_ROLE;
}

export interface ForgetPasswordData {
  email: string;
}

export interface ResetPasswordData {
  resetPasswordToken: string;
  password: string;
}

export interface ResetPasswordFormData {
  retypePassword: string;
  password: string;
}

export interface VerifyEmailData {
  emailVerifyToken: string;
}

export interface SendEmailVerificationMailData {
  email: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
  retypeNewPassword: string;
}

export interface FetchUsersDto {
  searchText?: string;
  isActive?: boolean;
  page: number;
  perPage: number;
}

export interface UpdateUserStatusDto {
  id: string;
  isActive: boolean;
}

const login = async ({ email, password }: LoginData) => {
  try {
    const loginResponse = await BaseApi.post(APIS.AUTH.LOGIN, {
      email,
      password,
    });
    if (
      loginResponse &&
      loginResponse.status === 201 &&
      loginResponse.data.data
    ) {
      const accessToken: string = loginResponse.data.data.accessToken;
      const user: User = loginResponse.data.data.user;

      return {
        accessToken,
        user,
      };
    }
    throw new Error(getErrorMessage(loginResponse, "Invalid email/password"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const register = async (data: RegisterData) => {
  try {
    const registerResponse = await BaseApi.post(APIS.AUTH.REGISTER, {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    });
    if (
      registerResponse &&
      registerResponse.status === 201 &&
      registerResponse.data.data
    ) {
      const accessToken: string = registerResponse.data.data.accessToken;
      const user: User = registerResponse.data.data.user;

      return {
        accessToken,
        user,
      };
    }
    throw new Error(
      getErrorMessage(registerResponse, "Unable to register, please try again")
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const profile = async () => {
  try {
    const profileResponse = await BaseApi.get(APIS.USER.PROFILE);
    if (
      profileResponse &&
      profileResponse.status === 200 &&
      profileResponse.data.data
    ) {
      const user: User = profileResponse.data.data;

      return {
        user,
      };
    }
    throw new Error(
      getErrorMessage(profileResponse, "Session expired, please login again")
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const fetchAllUsers = async (filter: FetchUsersDto) => {
  try {
    const allUsersResponse = await BaseApi.post(
      APIS.USER.FETCH_ALL_USERS,
      filter
    );
    if (
      allUsersResponse &&
      allUsersResponse.status === 200 &&
      allUsersResponse.data.data
    ) {
      const result: PaginatedResponse<User> = allUsersResponse.data.data;

      return result;
    }
    throw new Error(
      getErrorMessage(allUsersResponse, "Unable to fetch all users")
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const update = async (data: IUpdateUserDto) => {
  try {
    const updateResponse = await BaseApi.post(APIS.USER.UPDATE, data);
    if (
      updateResponse &&
      updateResponse.status === 200 &&
      updateResponse.data.data
    ) {
      const user: User = updateResponse.data.data;

      return user;
    }
    throw new Error(getErrorMessage(updateResponse, "Unable to update user"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const forgetPassword = async ({ email }: ForgetPasswordData) => {
  try {
    const forgetPassResp = await BaseApi.post(APIS.AUTH.FORGET_PASSWORD, {
      email,
    });
    if (forgetPassResp && forgetPassResp.status === 200) {
      return true;
    }
    throw new Error(
      getErrorMessage(
        forgetPassResp,
        "Error while trying to send forget password email"
      )
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const resetPassword = async ({
  resetPasswordToken,
  password,
}: ResetPasswordData) => {
  try {
    const resetPassResp = await BaseApi.post(APIS.AUTH.RESET_PASSWORD, {
      resetPasswordToken,
      password,
    });
    if (resetPassResp && resetPassResp.status === 200) {
      return true;
    }
    throw new Error(
      getErrorMessage(resetPassResp, "Error while trying to reset password")
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const sendEmailVerificationEmail = async ({
  email,
}: SendEmailVerificationMailData) => {
  try {
    const sendVerifyEmailPassResp = await BaseApi.post(
      APIS.AUTH.SEND_VERIFICATION_EMAIL,
      {
        email,
      }
    );
    if (sendVerifyEmailPassResp && sendVerifyEmailPassResp.status === 200) {
      return true;
    }
    throw new Error(
      getErrorMessage(
        sendVerifyEmailPassResp,
        "Error while trying to send email verify email"
      )
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const verifyEmail = async ({ emailVerifyToken }: VerifyEmailData) => {
  try {
    const verifyEmailResp = await BaseApi.post(APIS.AUTH.VERIFY_EMAIL, {
      emailVerifyToken,
    });
    if (verifyEmailResp && verifyEmailResp.status === 200) {
      return true;
    }
    throw new Error(
      getErrorMessage(verifyEmailResp, "Error while trying to verify email")
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const addUser = async (data: AddUserData) => {
  try {
    const addResp = await BaseApi.post(APIS.USER.ADD_USER, {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    });
    if (addResp && addResp.status === 201 && addResp.data.data) {
      const user: User = addResp.data.data;

      return user;
    }
    throw new Error(getErrorMessage(addResp, "Unable to add user"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const fetchUsersWithDeviceStat = async (data: FetchUsersDto) => {
  try {
    const addResp = await BaseApi.post(
      APIS.USER.FETCH_ALL_USER_WITH_DEVICE_STAT,
      data
    );
    if (addResp && addResp.status === 200 && addResp.data.data) {
      const userWithDevice: PaginatedResponse<UserWithDevice> =
        addResp.data.data;

      return userWithDevice;
    }
    throw new Error(getErrorMessage(addResp, "Unable to fetch users"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const fetchUserDetails = async (id: string) => {
  try {
    const addResp = await BaseApi.get(
      APIS.USER.FETCH_USER_DETAILS.replace(":id", id)
    );
    if (addResp && addResp.status === 200 && addResp.data.data) {
      const user: UserWithDevice = addResp.data.data;

      return user;
    }
    throw new Error(getErrorMessage(addResp, "Unable to add user"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const updateUserStatus = async (data: UpdateUserStatusDto) => {
  try {
    const addResp = await BaseApi.post(APIS.USER.UPDATE_STATUS, data);
    if (addResp && addResp.status === 201 && addResp.data.data) {
      const user: UserWithDevice = addResp.data.data;

      return user;
    }
    throw new Error(getErrorMessage(addResp, "Unable to update user status"));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const UserService = {
  login,
  register,
  profile,
  fetchAllUsers,
  update,
  forgetPassword,
  resetPassword,
  sendEmailVerificationEmail,
  verifyEmail,
  addUser,
  fetchUsersWithDeviceStat,
  fetchUserDetails,
  updateUserStatus,
};
