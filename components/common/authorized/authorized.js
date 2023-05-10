import React from "react";
import Link from "next/link";
import Loader from "@/components/loader/Loader";
import { useData } from "@/context/dataContext";
import { useState, useEffect } from "react";
import Styles from "./authorized.module.css";
import { ProfileButtons } from "../profileButtons/ProfileButtons";

const Authorized = ({ children }) => {
  const [loading, setloading] = useState(true);
  let [authorized, setAuthorized] = useState(false);
  let userData = useData();
  useEffect(() => {
    if (!userData.isLoading) {
      setloading(false);
      if (userData.userData.response !== "usuario no encontrado") {
        setAuthorized(true);
      }
    }
  }, [userData]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : authorized ? (
        <>
          <ProfileButtons />
          {children}
        </>
      ) : (
        <section className={Styles.container}>
          <h4>
            Lo siento, no puedes acceder a este contenido, inicia sesión para
            verlo
          </h4>
          <Link href="/login">Iniciar sesión</Link>
        </section>
      )}
    </>
  );
};

export default Authorized;
