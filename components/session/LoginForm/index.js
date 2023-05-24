import React, { useState } from "react";
import Styles from "./logginForm.module.css";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import GoogleAccesButton from "@/components/common/accessButtons/GoogleAccesButton/GoogleAccesButton";
import GithubAccesButton from "@/components/common/accessButtons/GithubAccesButton/GithubAccesButton";
import { useRouter } from "next/router";
import { useData } from "@/context/dataContext";

const LoginForm = () => {
  const router = useRouter();
  const data = useData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  let handleSubmit = async (e) => {
    e.preventDefault();
  };
  let iniciarSesion = async () => {
    if (email && password) {
      let response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        data.setToken(responseData.response.token); // Actualiza el token en el contexto
        router.push("/");
      } else {
        setError(true);
      }
    }
  };

  async function loginWithGoogle() {
    try {
      window.location.href = `${process.env.DOMAIN_API_URL}/session/google`;
    } catch (error) {
      console.error("Error al iniciar sesión con Google");
    }
  }

  const loginWithGithub = async () => {
    try {
      window.location.href = `${process.env.DOMAIN_API_URL}/session/github`;
    } catch (error) {
      console.error("Error al iniciar sesión con GitHub");
    }
  };

  return (
    <div className={Styles.sessionContainer}>
      <div className={Styles.vistaForm}>
        <form onClick={handleSubmit} className={Styles.login}>
          <h2>Iniciar sesión</h2>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="username"
            required
          />
          <div className={Styles.passwordContainer}>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              autoComplete="current-password"
              id={Styles.passwordInput}
            />
            {showPassword ? (
              <AiFillEye
                onClick={() => setShowPassword(!showPassword)}
                className={Styles.ojito}
              />
            ) : (
              <AiFillEyeInvisible
                onClick={() => setShowPassword(!showPassword)}
                className={Styles.ojito}
              />
            )}
          </div>
          {error ? <h5>Nombre de usuario/contraseña incorrecta</h5> : ""}
          <button
            type="submit"
            onClick={iniciarSesion}
            className={Styles.iniciarSesionBoton}
          >
            Iniciar sesión
          </button>
        </form>
        <div>
          <h4>
            ¿No tienes cuenta? <br /> <Link href="/register">Registrate</Link>{" "}
          </h4>
          <h4>
            Olvidaste tu contraseña <br />{" "}
            <Link href="/changePassword">Cambiar</Link>{" "}
          </h4>
        </div>
        <div className={Styles.redesSociales}>
          <h5> O inicia sesión con tus redes</h5>
          <GoogleAccesButton onClick={loginWithGoogle} />
          <GithubAccesButton onClick={loginWithGithub} />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
