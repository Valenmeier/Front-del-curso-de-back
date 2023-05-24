import React, { useState } from "react";
import styles from "./styles.module.css";
import { useData } from "@/context/dataContext";

const UserCardsAdmin = ({ data, setLoading, setResponse }) => {
  let user = useData();
  let [cambiarRol, setCambiarRol] = useState(false);
  const [selectedRol, setSelectedRol] = useState(data.rol);
  let eliminarUsuario = () => {
    setLoading(true);
    fetch("/api/deleteUser", {
      method: "POST",
      headers: {
        token: user.token,
        owner: data.email,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setResponse(res.response);
        setLoading(false);
      });
  };

  let confirmarCambioRol = async () => {
    if (data.rol !== selectedRol) {
      setLoading(true);
      fetch("/api/editarRol", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          id: data._id,
          token: user.token,
        },
        body: JSON.stringify({
          nuevoRol: selectedRol,
        }),
      })
        .then((res) => res.json())
        .then((res) => setResponse(res.response));
      setLoading(false);
    }
    setCambiarRol(false);
  };
  return (
    <section className={styles.cardContainer}>
      <h4>{data.user}</h4>
      {cambiarRol ? (
        <select
          value={selectedRol}
          onChange={(e) => setSelectedRol(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="premium">Premium</option>
        </select>
      ) : (
        <h4>{data.rol}</h4>
      )}

      {data.user == "ProductPremium" ||
      data.user == user.userData.response.response.user ? (
        <h4>No es posible eliminar este usuario</h4>
      ) : (
        <>
          {cambiarRol ? (
            <section
              className={`${styles.buttonAdministation} ${styles.changeColors}`}
            >
              <button onClick={confirmarCambioRol}>Confirmar Cambio</button>
              <button onClick={() => setCambiarRol(false)}>Cancelar</button>
            </section>
          ) : (
            <section className={styles.buttonAdministation}>
              <button onClick={() => setCambiarRol(true)}>Cambiar rol</button>
              <button onClick={eliminarUsuario}>Eliminar usuario</button>
            </section>
          )}
        </>
      )}
    </section>
  );
};

export default UserCardsAdmin;
