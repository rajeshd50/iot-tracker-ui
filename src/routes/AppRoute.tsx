import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ROUTES } from "../constants";

import NotFound from "../common/pages/404/NotFound";
import LoginLoadable from "../features/auth/login/LoginLoadable";
import UserDashboardLoadable from "../features/user/dashboard/UserDashboardLoadable";
import AdminDashboardLoadable from "../features/admin/dashboard/AdminDashboardLoadable";
import AdminUserListLoadable from "../features/admin/users/user-list/AdminUserListLoadable";
import AdminDeviceListLoadable from "../features/admin/devices/device-list/AdminDeviceListLoadable";
import AdminAddDeviceLoadable from "../features/admin/devices/add-device/AdminAddDeviceLoadable";
import UserDeviceDetailsLoadable from "../features/user/device/device-details/UserDeviceDetailsLoadable";
import ForgetPasswordLoadable from "../features/auth/forget-password/ForgetPasswordLoadable";
import ResetPasswordLoadable from "../features/auth/reset-password/ResetPasswordLoadable";
import UserChangePasswordLoadable from "../features/common/change-password/UserChangePasswordLoadable";
import UserProfileLoadable from "../features/common/profile/UserProfileLoadable";
import withNoAuthHoc from "../hoc/auth/AppNoAuthHoc";
import withAuthHoc from "../hoc/auth/AppAuthHoc";
import { ROLE_TYPES } from "../constants/role.constants";
import { Counter } from "../features/counter/Counter";

function AppRoute() {
  return (
    <Routes>
      {/* without auth (open) routes */}
      <Route
        path={ROUTES.HOME}
        element={<Navigate replace to={ROUTES.AUTH.LOGIN} />}
      />
      <Route path={ROUTES.AUTH.LOGIN} element={withNoAuthHoc(LoginLoadable)} />
      <Route
        path={ROUTES.AUTH.FORGOT_PASSWORD}
        element={withNoAuthHoc(ForgetPasswordLoadable)}
      />
      <Route
        path={ROUTES.AUTH.RESET_PASSWORD}
        element={withNoAuthHoc(ResetPasswordLoadable)}
      />
      {/* with auth routes */}
      <Route
        path={ROUTES.COMMON.CHANGE_PASSWORD}
        element={withAuthHoc(UserChangePasswordLoadable)}
      />
      <Route
        path={ROUTES.COMMON.PROFILE}
        element={withAuthHoc(UserProfileLoadable)}
      />
      {/* admin routes */}
      <Route
        path={ROUTES.ADMIN.DASHBOARD}
        element={withAuthHoc(AdminDashboardLoadable, ROLE_TYPES.ADMIN)}
      />
      <Route
        path={ROUTES.ADMIN.USER_LIST}
        element={withAuthHoc(AdminUserListLoadable, ROLE_TYPES.ADMIN)}
      />
      <Route
        path={ROUTES.ADMIN.DEVICE_LIST}
        element={withAuthHoc(AdminDeviceListLoadable, ROLE_TYPES.ADMIN)}
      />
      <Route
        path={ROUTES.ADMIN.ADD_DEVICE}
        element={withAuthHoc(AdminAddDeviceLoadable, ROLE_TYPES.ADMIN)}
      />
      {/* user routes */}
      <Route
        path={ROUTES.USER.DASHBOARD}
        element={withAuthHoc(UserDashboardLoadable, ROLE_TYPES.USER)}
      />
      <Route
        path={ROUTES.USER.DEVICE_DETAILS}
        element={withAuthHoc(UserDeviceDetailsLoadable, ROLE_TYPES.USER)}
      />
      {/* not found route */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}

export default AppRoute;
