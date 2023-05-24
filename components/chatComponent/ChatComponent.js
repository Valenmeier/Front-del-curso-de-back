import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./ChatComponent.module.css";
import { useData } from "@/context/dataContext";
import { MdSend } from "react-icons/md";
import AuthorizedPremium from "../common/authorizedPremium/authorizedPremium";

const ChatComponent = () => {
  const [socket, setSocket] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [mensajeActual, setMensajeActual] = useState("");

  let user = useData();

  useEffect(() => {
    const socketIo = io(`${process.env.DOMAIN_API_URL}`);
    setSocket(socketIo);

    socketIo.on("messages", (allMessages) => {
      setMensajes(allMessages);
    });
    setUsuario(user.userData.response.response.user);
    return () => {
      socketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (nuevoMensaje) => {
        setMensajes((mensajes) => [...mensajes, nuevoMensaje]);
      });
    }
  }, [socket]);

  const enviarMensaje = (event) => {
    event.preventDefault();
    if (mensajeActual.trim().length > 0) {
      socket.emit("newMessage", {
        user: usuario,
        message: mensajeActual,
        profileImage: user.userData.response.response.profileImage
          ? user.userData.response.response.profileImage
          : null,
      });
      setMensajeActual("");
    }
  };

  const handleInputChange = (event) => {
    setMensajeActual(event.target.value);
  };

  return (
    <AuthorizedPremium>
      <div className={styles.chatWrapper}>
        <div className={styles.contenedorMsg}>
          <div className={styles.contenedorChats}>
            {mensajes.map((mensaje, index) => (
              <div
                key={index}
                className={
                  mensaje.user === usuario
                    ? styles.mensajePropio
                    : styles.mensajeAjeno
                }
              >
                <section className={styles.profileContainer}>
                  <span className={styles.profileImage}>
                    {mensaje.profileImage ? (
                      <img
                        src={mensaje.profileImage}
                        alt={`${mensaje.user} profile Image`}
                      />
                    ) : (
                      <div className={styles.letterContainer}>
                        <h4>{mensaje.user.slice(0, 1).toUpperCase()}</h4>
                      </div>
                    )}
                  </span>
                </section>

                <section className={styles.contenedorMensajesEnviados}>
                  <section className={styles.mensajeEnviado}>
                    <h4>{mensaje.user}:</h4>
                    <p>{mensaje.message}</p>
                  </section>
                </section>
              </div>
            ))}
          </div>
          <div className={styles.vistaMsg}>
            <div className={styles.cabecera}></div>
            <div className={styles.chatMsg}>
              <div className={styles.contenedorFlexibleMensajes}></div>
            </div>
            <div className={styles.barraMsg}>
              <form
                className={styles.contenedorEnviarMensajes}
                onSubmit={enviarMensaje}
              >
                <textarea
                  className={styles.escribirMsg}
                  placeholder="Ingrese su mensaje"
                  value={mensajeActual}
                  onChange={handleInputChange}
                ></textarea>
                <button type="submit" className={styles.enviarMensaje}>
                  <MdSend />
                </button>
              </form>
            </div>
            <div className={styles.capaMsg}></div>
          </div>
        </div>
        <div className={styles.capaWrapper}></div>
      </div>
    </AuthorizedPremium>
  );
};

export default ChatComponent;
