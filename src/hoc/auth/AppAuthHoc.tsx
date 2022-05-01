import React from "react";
import { Navigate } from "react-router-dom";
import AppWrapper from "../../app/AppWrapper/AppWrapper";
import { ROUTES } from "../../constants";
import { ROLE_TYPES } from "../../constants/role.constants";
import { useAppSelector } from "../../store/hooks";
import { selectIsUserLoggedIn, selectIsUserAdmin } from "../../store/reducers/userSlice";

const withAuthHocFun = <P extends object>(
  Component: React.ComponentType<P>,
  role: ROLE_TYPES = ROLE_TYPES.ALL
) =>
  function WithAuthHoc(props: any) {
    const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
    const isAdmin = useAppSelector(selectIsUserAdmin);
    if (!isLoggedIn) {
      return <Navigate to={ROUTES.AUTH.LOGIN} />;
    }
    if (role === ROLE_TYPES.ADMIN && !isAdmin) {
      return <Navigate to={ROUTES.USER.DASHBOARD} />;
    }
    if (role === ROLE_TYPES.USER && isAdmin) {
      return <Navigate to={ROUTES.ADMIN.DASHBOARD} />;
    }
    return (
      <AppWrapper>
        <Component {...(props as P)} />
      </AppWrapper>
    );
  };

const withAuthHoc = (
  Component: React.ComponentType,
  role: ROLE_TYPES = ROLE_TYPES.ALL
) => {
  const HocComponent = withAuthHocFun(Component, role);
  return <HocComponent />;
};

export default withAuthHoc;

