import React from "react";
import Link from "next/link";
import Loader from "@/components/loader/Loader";
import { useData } from "@/context/dataContext";
import { useState, useEffect } from "react";
import Styles from "./authorized.module.css";
import { ProfileButtons } from "../profileButtons/ProfileButtons";

const AuthorizedAdmin = ({ children }) => {
  const [loading, setloading] = useState(true);
  let [authorized, setAuthorizedAdmin] = useState(false);
  let userData = useData();
  useEffect(() => {
    if (!userData.isLoading) {
      setloading(false);
      if (userData.userData.response !== "usuario no encontrado") {
        if (userData.userData.response.response.rol == "admin") {
          setAuthorizedAdmin(true);
        }
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
            Lo siento, no puedes acceder a este contenido, solo usuarios ADMIN
            pueden ingresar.
          </h4>
         
        </section>
      )}
    </>
  );
};

export default AuthorizedAdmin;
