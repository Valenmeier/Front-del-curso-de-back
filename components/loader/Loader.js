import React from "react";
import Styles from "./styles.module.css";

const Loader = () => {
  return (
    <div className={Styles.loaderContainer}>
      <span className={Styles.loader}></span>
    </div>
  );
};

export default Loader;
