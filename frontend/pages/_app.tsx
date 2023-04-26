import { FC } from "react";
import "../styles/global.css";
import MainContainer from "../Components/MainContainer/MainContainer";
import { Provider } from "react-redux";
import store from "../store/store";
import ErrorBoundary from "../Components/ErrorBoundary/ErrorBoundary";
import { AuthProvider } from "../Components/AuthContext/AuthContext";

const WrappedApp: FC<any> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ErrorBoundary>
          <MainContainer>
            <Component {...pageProps} />
          </MainContainer>
        </ErrorBoundary>
      </AuthProvider>
    </Provider>
  );
};

export default WrappedApp;
