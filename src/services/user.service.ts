import { APIS } from "../constants";
import { User } from "../models";
import { BaseApi } from "./base-api";

export interface IUpdateUser {
  dailyCalorieLimit?: number;
  monthlyBudgetLimit?: number;
  firstName?: string;
  lastName?: string;
}

export interface LoginData {
  email: string;
  password: string;
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
    throw new Error("Invalid email/password");
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
    throw new Error("Session expired, please login again");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const fetchAllUsers = async () => {
  try {
    const allUsersResponse = await BaseApi.get(APIS.USER.FETCH_ALL_USERS);
    if (
      allUsersResponse &&
      allUsersResponse.status === 200 &&
      allUsersResponse.data.data
    ) {
      const users: User[] = allUsersResponse.data.data.users;

      return {
        users,
      };
    }
    throw new Error("Unable to fetch all users");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const update = async (data: IUpdateUser) => {
  try {
    const updateResponse = await BaseApi.post(APIS.USER.UPDATE, data);
    if (
      updateResponse &&
      updateResponse.status === 201 &&
      updateResponse.data.data
    ) {
      const user: User = updateResponse.data.data;

      return {
        user,
      };
    }
    throw new Error("Unable to update user");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const UserService = {
  login,
  profile,
  fetchAllUsers,
  update,
};
