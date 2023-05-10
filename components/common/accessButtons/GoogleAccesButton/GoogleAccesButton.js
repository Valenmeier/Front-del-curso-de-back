import React from "react";
import { FcGoogle } from "react-icons/fc";
import Styles from "./googleAccesButton.module.css";

const GoogleAccesButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={Styles.googleAccessButton}>
      <FcGoogle />
      <h4> Inicia sesión con Google</h4>
    </button>
  );
};

export default GoogleAccesButton;
