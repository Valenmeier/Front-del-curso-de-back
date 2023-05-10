import React, { useState } from "react";
import Styles from "./register.module.css";
import Link from "next/link";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailRegistrado, setEmailRegistrado] = useState(false);
  const [confirmRegister, setConfirmRegister] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState("a");
  const [buttonText, setButtonText] = useState("Mostrar Contraseñas");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setButtonText(showPassword ? "Mostrar Contraseñas" : "Ocultar Contraseñas");
  };

  const checkPasswordsMatch = () => {
    const passwordInput = document.querySelector(".contraseñaa");
    const confirmPasswordInput = document.querySelector(".confirmarClave");
    setPasswordsMatch(passwordInput.value === confirmPasswordInput.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    checkPasswordsMatch();
    if (!passwordsMatch) return;

    const form = document.querySelector("#registerForm");
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      const data = await response.json();
      if (data.status == 401) {
        setEmailRegistrado(true);
      } else if (data.status == 200) {
        setConfirmRegister(true);
      }
    } catch (error) {
      console.error("Ha ocurrido un error");
    }
  };

  return (
    <div className={Styles.registrerContainer}>
      {confirmRegister ? (
        <div>
          <h2>Registro confirmado exitosamente</h2>
          <Link href="/login">Iniciar Sesion</Link>
        </div>
      ) : (
        <div className={Styles.fondoForm}>
          <form
            id="registerForm"
            action="/api/register"
            method="post"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                className={Styles.requisitos}
                name="first_name"
                type="text"
                placeholder="Nombre"
                required
              />
              <input
                className={Styles.requisitos}
                name="age"
                type="number"
                placeholder="edad"
                min="1"
                max="130"
                required
              />
              <input
                className={Styles.requisitos}
                name="user"
                type="text"
                placeholder="Nombre de usuario"
                required
              />
              <input
                className={Styles.requisitos}
                name="email"
                type="email"
                placeholder="Email"
                required
              />
              {emailRegistrado ? <h3>Email ya registrado</h3> : ""}
            </div>
            <div>
              <input
                className={Styles.requisitos}
                name="last_name"
                type="text"
                placeholder="Apellido"
                required
              />

              <input
                className={`${Styles.requisitos} ${Styles.clave} contraseñaa`}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                required
              />
              <input
                className={`${Styles.requisitos} ${Styles.clave} confirmarClave`}
                type={showPassword ? "text" : "password"}
                placeholder="Confirma la contraseña"
                onChange={checkPasswordsMatch}
                required
              />
              <div className={Styles.mostrarClave}>
                <button
                  className={Styles.mostrarContraseña}
                  type="button"
                  onClick={toggleShowPassword}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </form>
          {!passwordsMatch ? (
            <span className={Styles.error}>
              ⚠⚠⚠ Las contraseñas no coinciden ⚠⚠⚠
            </span>
          ) : (
            ""
          )}
          <button
            form="registerForm"
            className={Styles.confirmarIngreso}
            type="submit"
          >
            Crear usuario
          </button>
        </div>
      )}
    </div>
  );
};

export default Register;
