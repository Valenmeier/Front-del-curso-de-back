import React from "react";
import Styles from "./styles.module.css";
import { useState } from "react";
import Loader from "@/components/loader/Loader";
import Link from "next/link";

const TokenSection = (token) => {
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let [response, setResponse] = useState(false);
  let [redirect, setRedirect] = useState(null);

  let cambiarContraseña = async () => {
    let password = document.querySelector(".contraseña");
    if (password.value == "") {
      setError("Ingresa tu contraseña");
    } else {
      setLoading(true);
      fetch("/api/completeChangePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token.token,
          password: password.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status == 200) {
            setResponse(res.response);

            setRedirect("/login");
          } else {
            if (
              res.response ==
              "Su token de cambio de contraseña expiró, envie otro mail nuevamente"
            ) {
              setResponse(res.response);
              setRedirect("/changePassword");
            } else {
              setResponse(false);
              setError("Coloca una contraseña diferente a la actual")
            }
          }
          setLoading(false);
        })
        .catch((e) => console.log("Ha ocurrido un error", e));
    }
  };

  return (
    <section className={Styles.container}>
      {!loading ? (
        !response ? (
          <>
            <h1 className={Styles.title}>Establece tu nueva contraseña</h1>
            <input type="password" className="contraseña" />
            {error ? <h3>{error}</h3> : ""}
            <button onClick={cambiarContraseña}>Confirmar</button>
          </>
        ) : (
          <>
            <h4>{response}</h4>
            <Link href={redirect == "/login" ? "/login" : "/changePassword"}>
              {redirect == "/login" ? "Iniciar Sesión" : "Intentar nuevamente"}{" "}
            </Link>
          </>
        )
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default TokenSection;
