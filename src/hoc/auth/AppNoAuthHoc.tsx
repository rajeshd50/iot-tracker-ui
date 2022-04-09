import React from "react";

const withNoAuthHocFun = <P extends object>(
  Component: React.ComponentType<P>
) =>
  class WithNoAuthHoc extends React.Component<P, {}> {
    render(): React.ReactNode {
      const { ...props } = this.props;
      return <Component {...(props as P)} />;
    }
  };

const withNoAuthHoc = (Component: React.ComponentType) => {
  const HocComponent = withNoAuthHocFun(Component);
  return <HocComponent />;
};

export default withNoAuthHoc;
