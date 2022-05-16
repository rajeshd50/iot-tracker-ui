import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ROUTES } from "../constants";

import NotFound from "../common/pages/404/NotFound";
import LoginLoadable from "../features/auth/login/LoginLoadable";
import UserDashboardLoadable from "../features/user/dashboard/UserDashboardLoadable";
import AdminDashboardLoadable from "../features/admin/dashboard/AdminDashboardLoadable";
import AdminUserListLoadable from "../features/admin/users/user-list/AdminUserListLoadable";
import AdminDeviceListLoadable from "../features/admin/devices/device-list/AdminDeviceListLoadable";
import AdminDevicePoolLoadable from "../features/admin/devices/device-pool/AdminDevicePoolLoadable";
import UserDeviceDetailsLoadable from "../features/user/device/device-details/UserDeviceDetailsLoadable";
import ForgetPasswordLoadable from "../features/auth/forget-password/ForgetPasswordLoadable";
import ResetPasswordLoadable from "../features/auth/reset-password/ResetPasswordLoadable";
import UserProfileLoadable from "../features/common/profile/UserProfileLoadable";
import withNoAuthHoc from "../hoc/auth/AppNoAuthHoc";
import withAuthHoc from "../hoc/auth/AppAuthHoc";
import { ROLE_TYPES } from "../constants/role.constants";
import UserDeviceListLoadable from "../features/user/device/device-list/UserDeviceListLoadable";
import RegisterLoadable from "../features/auth/register/RegisterLoadable";
import VerifyEmailLoadable from "../features/auth/verify-email/VerifyEmailLoadable";
import AdminRecentPurchasesLoadable from "../features/admin/devices/recent-purchases/AdminRecentPurchasesLoadable";
import UserDeviceAddLoadable from "../features/user/device/device-add/UserDeviceAddLoadable";
import UserGeoFenceListLoadable from "../features/user/geofence/geofence-list/UserGeoFenceListLoadable";
import UserGeoFenceAddUpdateLoadable from "../features/user/geofence/geofence-add-update/UserGeoFenceAddUpdateLoadable";
import UserGeoFenceDetailsLoadable from "../features/user/geofence/geofence-details/UserGeoFenceDetailsLoadable";
import AdminFirmwareLoadable from "../features/admin/devices/firmware/AdminFirmwareLoadable";
import AdminSiteSettingsLoadable from "../features/admin/site-settings/AdminSiteSettingsLoadable";

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
        path={ROUTES.AUTH.REGISTER}
        element={withNoAuthHoc(RegisterLoadable)}
      />
      <Route
        path={ROUTES.AUTH.FORGOT_PASSWORD}
        element={withNoAuthHoc(ForgetPasswordLoadable)}
      />
      <Route
        path={ROUTES.AUTH.RESET_PASSWORD}
        element={withNoAuthHoc(ResetPasswordLoadable)}
      />
      <Route
        path={ROUTES.AUTH.VERIFY_EMAIL}
        element={<VerifyEmailLoadable />}
      />
      {/* with auth routes */}
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
        path={ROUTES.ADMIN.DEVICE_POOL}
        element={withAuthHoc(AdminDevicePoolLoadable, ROLE_TYPES.ADMIN)}
      />
      <Route
        path={ROUTES.ADMIN.RECENT_PURCHASES}
        element={withAuthHoc(AdminRecentPurchasesLoadable, ROLE_TYPES.ADMIN)}
      />
      <Route
        path={ROUTES.ADMIN.FIRMWARE}
        element={withAuthHoc(AdminFirmwareLoadable, ROLE_TYPES.ADMIN)}
      />
      <Route
        path={ROUTES.ADMIN.SITE_SETTINGS}
        element={withAuthHoc(AdminSiteSettingsLoadable, ROLE_TYPES.ADMIN)}
      />
      {/* user routes */}
      <Route
        path={ROUTES.USER.DASHBOARD}
        element={withAuthHoc(UserDashboardLoadable, ROLE_TYPES.USER)}
      />
      <Route
        path={ROUTES.USER.DEVICE_LIST}
        element={withAuthHoc(UserDeviceListLoadable, ROLE_TYPES.USER)}
      />
      <Route
        path={ROUTES.USER.DEVICE_DETAILS}
        element={withAuthHoc(UserDeviceDetailsLoadable, ROLE_TYPES.USER)}
      />
      <Route
        path={ROUTES.USER.ADD_NEW_DEVICE}
        element={withAuthHoc(UserDeviceAddLoadable, ROLE_TYPES.USER)}
      />
      <Route
        path={ROUTES.USER.GEO_FENCES}
        element={withAuthHoc(UserGeoFenceListLoadable, ROLE_TYPES.USER)}
      />
      <Route
        path={ROUTES.USER.GEO_FENCE_DETAILS}
        element={withAuthHoc(UserGeoFenceDetailsLoadable, ROLE_TYPES.USER)}
      />
      <Route
        path={ROUTES.USER.GEO_FENCE_ADD}
        element={withAuthHoc(UserGeoFenceAddUpdateLoadable, ROLE_TYPES.USER)}
      />
      <Route
        path={ROUTES.USER.GEO_FENCE_EDIT}
        element={withAuthHoc(UserGeoFenceAddUpdateLoadable, ROLE_TYPES.USER)}
      />
      {/* not found route */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}

export default AppRoute;
