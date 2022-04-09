import React, { Component } from "react";

export class AppImageError extends Component<any, any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }
  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <img src="/img/fallback.png" alt="Not found" />;
    }
    return this.props.children;
  }
}

export default AppImageError;
