import { FC } from "react";
import "../styles/global.css";
import MainContainer from "../Components/MainContainer/MainContainer";
import { Provider } from "react-redux";
import store from "../store/store";
import ErrorBoundary from "../Components/ErrorBoundary/ErrorBoundary";

const WrappedApp: FC<any> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
      </ErrorBoundary>
    </Provider>
  );
};

export default WrappedApp;
