import React from "react";
import Style from "./GetPremium.module.css";
import { useData } from "@/context/dataContext";
import Loader from "../loader/Loader";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const GetPremium = () => {
  let [error, setError] = useState(null);
  let [response, setResponse] = useState(null);
  let [loading, setLoading] = useState(true);
  let user = useData();
  let router = useRouter();
  let premiumCheck = () => {
    let documents = user.userData.response.response.documentsStatus;
    let { identificacion, comprobanteDomicilio, estadoCuenta } = documents;
    if (identificacion && comprobanteDomicilio && estadoCuenta) {
      fetch("/api/getPremium", {
        method: "POST",
        headers: {
          uid: user.userData.response.response.userId,
          token: user.token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          if (res.status == 200) {
            setResponse("Felicidades eres premium");

            fetch("/api/getInfo", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: user.token,
              }),
            })
              .then((res) => res.json())
              .then((updatedUserData) => {
                user.setUserData(updatedUserData);
                router.reload();
              })
              .catch((err) => console.error(err));
          } else {
            setResponse(
              "Ha ocurrido un error al obtener premium, intentalo nuevamente"
            );
          }
        });
    } else {
      setError("Completa todos tus datos para poder obtener premium");
    }
  };

  useEffect(() => {
    let rol = user.userData.response.response.rol;
    if (rol == "premium") {
      setResponse("Felicidades eres premium");
    } else if (rol == "admin") {
      setResponse("Felicidades eres admin");
    }
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : response ? (
        <div className={Style.container}>
          <h4>{response}</h4>
        </div>
      ) : (
        <div className={Style.container}>
          {error ? (
            <>
              <h4>{error}</h4>
              <Link href="/completeProfile">
                Click aquí para completar los datos
              </Link>
            </>
          ) : (
            <button onClick={premiumCheck}>Obtener premium</button>
          )}
        </div>
      )}
    </>
  );
};

export default GetPremium;
