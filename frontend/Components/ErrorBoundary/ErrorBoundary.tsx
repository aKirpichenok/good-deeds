import React, { Component, ReactNode } from "react";
import { ErrorUI } from "./ErrorUI";
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}
class ErrorBoundary extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    if (this.state.hasError) {
      return <ErrorUI />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
