import React, { useEffect, useState } from "react";
import { useData } from "@/context/dataContext";
import Styles from "./profile.module.css";
import Link from "next/link";

const Profile = () => {
  let [username, setUsername] = useState("Cargando...");
  let [email, setEmail] = useState("Cargando...");
  let [profileImage, setProfileImage] = useState(null);
  let [autenticacion, setAutenticacion] = useState({
    comprobanteDomicilio: false,
    estadoCuenta: false,
    identificacion: false,
  });
  let [needPremium, setNeedPremium] = useState(false);

  let userData = useData();
  useEffect(() => {
    if (!userData.isLoading) {
      let user = userData.userData.response.response;
      if (user.rol == "user") {
        setNeedPremium(true);
      }
      if (user.profileImage) {
        setProfileImage(user.profileImage);
      }
      if (user.documentsStatus) {
        setAutenticacion(user.documentsStatus);
      }
      setEmail(user.email);
      setUsername(user.user);
    }
  }, []);

  return (
    <section className={Styles.container}>
      <section className={Styles.infoContainer}>
        <div className={Styles.profileImage}>
          {profileImage ? (
            <img
              src={profileImage}
              alt={`${username}-profilePicture`}
              srcSet=""
            />
          ) : (
            <h2 className={Styles.profileText}>{username.slice(0, 1)}</h2>
          )}
        </div>
      </section>
      <section>
        <h3>Username= {username} </h3>
        {email ? <h3>Email= {email}</h3> : ""}
      </section>
      {needPremium ? (
        <section className={Styles.cuentaPermisosContainer}>
          {autenticacion.comprobanteDomicilio ? (
            ""
          ) : (
            <section className={Styles.cuentaPermisos}>
              <h3>Comprobante domicilio:</h3>
              <h3>⚠⚠ Pendiente ⚠⚠</h3>
            </section>
          )}
          {autenticacion.estadoCuenta ? (
            ""
          ) : (
            <section className={Styles.cuentaPermisos}>
              <h3>Estado cuenta:</h3>
              <h3>⚠⚠ Pendiente ⚠⚠</h3>
            </section>
          )}
          {autenticacion.identificacion ? (
            ""
          ) : (
            <section className={Styles.cuentaPermisos}>
              <h3>Identificacion:</h3>
              <h3>⚠⚠ Pendiente ⚠⚠</h3>
            </section>
          )}
        </section>
      ) : (
        ""
      )}
      <section className={Styles.linkContainer}>
        {needPremium ? (
          <>
            {autenticacion.identificacion &&
            autenticacion.estadoCuenta &&
            autenticacion.comprobanteDomicilio ? (
              <Link href="/getPremium">Obtener premium gratis</Link>
            ) : (
              <Link href="/completeProfile">
                Completar perfil para obtener premium gratis
              </Link>
            )}
          </>
        ) : (
          <Link href="/editProfile">Editar foto de perfil</Link>
        )}
      </section>
    </section>
  );
};

export default Profile;
