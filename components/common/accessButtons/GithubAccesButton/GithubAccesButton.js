import React from "react";
import { FaGithubAlt } from "react-icons/fa";
import Styles from "./githubAccesButton.module.css";

const GithubAccesButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={Styles.googleAccessButton}>
      <FaGithubAlt />
      <h4> Inicia sesión con Github</h4>
    </button>
  );
};

export default GithubAccesButton;
