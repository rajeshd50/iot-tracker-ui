import React from "react";
import { Navigate } from "react-router-dom";
import AppWrapper from "../../app/AppWrapper/AppWrapper";
import { ROUTES } from "../../constants";
import { useAppSelector } from "../../store/hooks";
import { selectIsUserLoggedIn, selectIsUserAdmin } from "../../store/reducers/userSlice";

const withNoAuthHocFun = <P extends object>(
  Component: React.ComponentType<P>
) =>
  function WithAuthHoc(props: any) {
    const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
    const isAdmin = useAppSelector(selectIsUserAdmin);
    if (isLoggedIn) {
      if (isAdmin) {
        return <Navigate to={ROUTES.ADMIN.DASHBOARD} />;
      } else {
        return <Navigate to={ROUTES.USER.DASHBOARD} />;
      }
    }
    return (
      <AppWrapper>
        <Component {...(props as P)} />
      </AppWrapper>
    );
  };

const withNoAuthHoc = (Component: React.ComponentType) => {
  const HocComponent = withNoAuthHocFun(Component);
  return <HocComponent />;
};

export default withNoAuthHoc;
