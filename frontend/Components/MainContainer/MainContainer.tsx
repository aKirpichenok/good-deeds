import Head from "next/head";
import { FC, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./MainContainer.module.sass";
import { Header } from "../../ui/src/Header/Header";

type MainContainerProps = {
  children: ReactNode;
  keywords?: string;
};

const MainContainer: FC<MainContainerProps> = ({ children, keywords }) => {
  // useEffect(() => {
  //   function handleUnload() {
  //     Cookies.remove("token");
  //   }

  //   window.addEventListener("beforeunload", handleUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleUnload);
  //   };
  // }, []);
  return (
    <>
      <Head>
        <meta
          name="keywords"
          content={"список добрых дел, андрей" + keywords}
        ></meta>
        <title>Список добрых дел</title>
      </Head>

      <div className={styles["column-container"]}>
        <Header />
        <main className={styles["main"]}>{children}</main>
      </div>
    </>
  );
};

export default MainContainer;
