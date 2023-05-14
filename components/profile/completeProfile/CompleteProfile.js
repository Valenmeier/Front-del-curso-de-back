import React, { useEffect, useState } from "react";
import { useData } from "@/context/dataContext";
import Styles from "./profile.module.css";
import Loader from "@/components/loader/Loader";
import { useRouter } from "next/router";
import Link from "next/link";

const CompleteProfile = () => {
  let dataUserCurrent = useData();
  let [errorInInput, setErrorInInput] = useState(null);
  let [error, setError] = useState(null);
  let [respuesta, setRespuesta] = useState(null);
  let [loading, setLoding] = useState(false);
  let [autenticacion, setAutenticacion] = useState({
    comprobanteDomicilio: false,
    estadoCuenta: false,
    identificacion: false,
  });
  const router = useRouter();
  useEffect(() => {
    if (!dataUserCurrent.isLoading) {
      let user = dataUserCurrent.userData.response.response;
      if (!user) {
        setError("USUARIO NO ENCONTRADO");
      }
      if (user.documentsStatus) {
        setAutenticacion(user.documentsStatus);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    setLoding(true);
    e.preventDefault();

    const formData = new FormData();

    if (
      e.target.comprobanteDomicilio &&
      e.target.comprobanteDomicilio.files[0]
    ) {
      formData.append(
        "comprobante_domicilio",
        e.target.comprobanteDomicilio.files[0]
      );
    }
    if (e.target.estadoCuenta && e.target.estadoCuenta.files[0]) {
      formData.append("estado_cuenta", e.target.estadoCuenta.files[0]);
    }
    if (e.target.identificacion && e.target.identificacion.files[0]) {
      formData.append("identificacion", e.target.identificacion.files[0]);
    }

    try {
      const response = await fetch("/api/uploadImportantDocument", {
        method: "POST",
        headers: {
          token: dataUserCurrent.token,
          uid: dataUserCurrent.userData.response.response.userId,
        },
        body: formData,
      });

      const data = await response.json();

      setRespuesta(data);
      setLoding(false);
      router.reload();
    } catch (error) {
      console.error("Error en la subida de archivos:", error);
      setLoding(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : autenticacion.comprobanteDomicilio &&
        autenticacion.estadoCuenta &&
        autenticacion.identificacion ? (
        <div className={Styles.contenedorRespuesta}>
          {dataUserCurrent.userData.response.response.rol == "user" ? (
            <>
              <h4>
                Perfil completo, obten premium gratis en el siguiente link
              </h4>
              <Link href="/getPremium">Obtener premium</Link>
            </>
          ) : dataUserCurrent.userData.response.response.rol == "premium" ? (
            <h4>Ya eres premium</h4>
          ) : dataUserCurrent.userData.response.response.rol == "admin" ? (
            <h4>Felicidades eres admin</h4>
          ) : (
            <h4>Ha ocurrido un error al cargar el usuario</h4>
          )}
        </div>
      ) : !respuesta ? (
        <form className={Styles.container} onSubmit={handleSubmit}>
          {error ? (
            <h4>{error}</h4>
          ) : (
            <>
              <h3>Completa tu perfil</h3>
              {autenticacion.comprobanteDomicilio ? (
                ""
              ) : (
                <label>
                  Comprobante domicilio <br />
                  <input
                    name="comprobanteDomicilio"
                    id="comprobanteDomicilio"
                    type="file"
                  />
                </label>
              )}
              {autenticacion.estadoCuenta ? (
                ""
              ) : (
                <label>
                  Estado cuenta <br />
                  <input name="estadoCuenta" id="estadoCuenta" type="file" />
                </label>
              )}
              {autenticacion.identificacion ? (
                ""
              ) : (
                <label>
                  Identificacion <br />
                  <input
                    name="identificacion"
                    id="identificacion"
                    type="file"
                  />
                </label>
              )}
              {errorInInput ? <h3>{errorInInput}</h3> : ""}
              <button type="Submit">Enviar</button>
            </>
          )}
        </form>
      ) : (
        <div className={Styles.contenedorRespuesta}>
          <h4>{respuesta}</h4>
        </div>
      )}
    </>
  );
};

export default CompleteProfile;
