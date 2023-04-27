import Head from "next/head";
import { FC, ReactNode } from "react";

import styles from "./MainContainer.module.sass";
import { Header } from "../../ui/src/Header/Header";
import { Footer } from "../../ui/src/Footer/Footer";

type MainContainerProps = {
  children: ReactNode;
  keywords?: string;
};

const MainContainer: FC<MainContainerProps> = ({ children, keywords }) => {
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
      {/* <Footer /> */}
    </>
  );
};

export default MainContainer;
