import { useData } from "@/context/dataContext";
import React from "react";
import styles from "./styles.module.css";
import Loader from "../loader/Loader";
import { useState } from "react";
import { useEffect } from "react";
import UserCardsAdmin from "./userCardsAdmin/UserCardsAdmin";

const AdminComponent = () => {
  let [loading, setLoading] = useState(false);
  let [response, setResponse] = useState(null);
  let [userList, setUserList] = useState([]);
  let [filterUserList, setFilterUserList] = useState(false);
  let user = useData();
  useEffect(() => {
    fetch("/api/getUserList", {
      method: "POST",
      headers: {
        token: user.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUserList(res.response);
      });
  }, []);

  let filtrarUsuarios = (e) => {
    setFilterUserList(
      userList.filter((user) =>
        user.user.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  let vaciarRespuesta = () => {
    setResponse(null);
    setLoading(true);
    fetch("/api/getUserList", {
      method: "POST",
      headers: {
        token: user.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUserList(res.response);
      });
    setLoading(false);
  };
  let eliminarInactivos = () => {
    setLoading(true);
    fetch("/api/deleteInactives", {
      method: "POST",
      headers: {
        token: user.token,
      },
    })
      .then((res) => res.json())
      .then((res) => setResponse(res.response));
    setLoading(false);
  };
  return (
    <>
      {user.userData.response.response.rol == "admin" ? (
        <section className={styles.adminPanelContainer}>
          {loading ? (
            <Loader />
          ) : response ? (
            <>
              <div>
                {" "}
                <h4>{response}</h4>
                <button onClick={vaciarRespuesta}>okey</button>
              </div>
            </>
          ) : (
            <>
              <section className={styles.title}>
                <h1>Bienvenido administrador</h1>
              </section>
              <div className={styles.filtros}>
                {userList ? (
                  userList.length > 0 ? (
                    <>
                      <h3>Buscar usuario:</h3>
                      <input onChange={filtrarUsuarios} type="text" />
                    </>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
              <section className={styles.usuariosActuales}>
                <h4>Usuarios actuales:</h4>
              </section>
              <section className={styles.listaDeUsuarios}>
                {userList ? (
                  userList.length > 0 ? (
                    filterUserList.length > 0 ? (
                      filterUserList.map((user) => (
                        <UserCardsAdmin
                          key={user._id}
                          data={user}
                          setResponse={setResponse}
                          setLoading={setLoading}
                        />
                      ))
                    ) : (
                      userList.map((user) => (
                        <UserCardsAdmin
                          key={user._id}
                          data={user}
                          setResponse={setResponse}
                          setLoading={setLoading}
                        />
                      ))
                    )
                  ) : (
                    <h4>No tienes ningún usuario</h4>
                  )
                ) : (
                  <Loader />
                )}
              </section>
              <section className={styles.base}>
                <button onClick={eliminarInactivos}>
                  Eliminar "user" inactivos <br /> en los ultimos dos dias
                </button>
              </section>
            </>
          )}
        </section>
      ) : (
        <div>No autorizado, solo administradores pueden ingresar</div>
      )}
    </>
  );
};

export default AdminComponent;
