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
    // Обновляем состояние, чтобы при следующем рендере
    // показать фоллбек UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Здесь можно отправить информацию об ошибке на сервер
  }

  render() {
    if (this.state.hasError) {
      return <ErrorUI />;
    }

    // Если ошибок нет, просто рендерим дочерние компоненты
    return this.props.children;
  }
}

export default ErrorBoundary;
