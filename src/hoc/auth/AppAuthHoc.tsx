import React from "react";
import AppWrapper from "../../app/AppWrapper/AppWrapper";
import { ROLE_TYPES } from "../../constants/role.constants";

const withAuthHocFun = <P extends object>(
  Component: React.ComponentType<P>,
  role: ROLE_TYPES = ROLE_TYPES.ALL
) =>
  class WithAuthHoc extends React.Component<P> {
    render(): React.ReactNode {
      const { ...props } = this.props;
      return (
        <AppWrapper>
          <Component {...(props as P)} />
        </AppWrapper>
      );
    }
  };

const withAuthHoc = (
  Component: React.ComponentType,
  role: ROLE_TYPES = ROLE_TYPES.ALL
) => {
  const HocComponent = withAuthHocFun(Component, role);
  return <HocComponent />;
};

export default withAuthHoc;
