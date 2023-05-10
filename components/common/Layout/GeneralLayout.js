import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Styles from "./Layout.module.css";
import Head from "next/head";
import FooterGeneral from "../footer/FooterGeneral";
import { useData } from "@/context/dataContext";

const GeneralLayout = ({ children, title }) => {
  const data = useData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (data.userData) {
      if (data.userData.response !== "usuario no encontrado") {
        setLogin(true);
      }
    }
  }, [data]);
  return (
    <>
      <Head>
        <title>{title ? title : "MeierCommerce"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        isLoggedIn={login}
      />
      <main className={Styles.mainClass}>{children}</main>
      <FooterGeneral />
    </>
  );
};

export default GeneralLayout;
