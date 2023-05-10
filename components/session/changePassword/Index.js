import React, { useState } from "react";
import Styles from "./changePassword.module.css";

const ChangePassword = () => {
  let [envioCorreo, setEnvioCorreo] = useState(false);
  let [message, setMessage] = useState(false);

  let verifiqueCambio = () => {
    let data = document.querySelector(".emailDelUsuario");
    fetch("/api/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setMessage(data.response);
        } else {
          setMessage(data.response);//probando 
        }
      });
  };

  return (
    <section className={Styles.container}>
      {message ? (
        <h3 className={Styles.mensaje}>{message}</h3>
      ) : (
        <>
          <input
            type="email"
            className="emailDelUsuario"
            placeholder="Coloca tu email"
            required
          />
          <button type="submit" onClick={verifiqueCambio}>
            Cambiar contraseña
          </button>
        </>
      )}
    </section>
  );
};
export default ChangePassword;
