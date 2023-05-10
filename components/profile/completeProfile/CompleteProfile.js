import React, { useEffect, useState } from "react";
import { useData } from "@/context/dataContext";
import Styles from "./profile.module.css";
import Loader from "@/components/loader/Loader";

const CompleteProfile = () => {
  let dataUserCurrent = useData();
  let [errorInInput, setErrorInInput] = useState(null);
  let [error, setError] = useState(null);
  let [response, setResponse] = useState(null);
  let [loading, setLoding] = useState(false);

  useEffect(() => {
    if (!dataUserCurrent.isLoading) {
      let user = dataUserCurrent.userData.response.response;
      if (!user) {
        setError("USUARIO NO ENCONTRADO");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    setLoding(true);
    e.preventDefault();

    const formData = new FormData();
    if (e.target.comprobanteDomicilio.files[0]) {
      formData.append(
        "comprobante_domicilio",
        e.target.comprobanteDomicilio.files[0]
      );
    }
    if (e.target.estadoCuenta.files[0]) {
      formData.append("estado_cuenta", e.target.estadoCuenta.files[0]);
    }
    if (e.target.identificacion.files[0]) {
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
      console.log(data);
      if (data.status == 400) {
        setResponse(data.response);
        setLoding(false);
      }
    } catch (error) {
      console.error("Error en la subida de archivos:", error);
      setLoding(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : !response ? (
        <form className={Styles.container} onSubmit={handleSubmit}>
          {error ? (
            <h4>{error}</h4>
          ) : (
            <>
              {" "}
              <h3>Completa tu perfil</h3>
              <label>
                Comprobante domicilio <br />
                <input
                  name="comprobanteDomicilio"
                  id="comprobanteDomicilio"
                  type="file"
                />
              </label>
              <label>
                Estado cuenta <br />
                <input name="estadoCuenta" id="estadoCuenta" type="file" />
              </label>
              <label>
                Identificacion <br />
                <input name="identificacion" id="identificacion" type="file" />
              </label>
              {errorInInput ? <h3>{errorInInput}</h3> : ""}
              <button type="Submit">Enviar</button>
            </>
          )}
        </form>
      ) : (
        <h4>{response}</h4>
      )}
    </>
  );
};

export default CompleteProfile;
