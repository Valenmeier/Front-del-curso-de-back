import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { SiProducthunt } from "react-icons/si";
import { BsCart3 } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import Styles from "./profileButtons.module.css";
import { useState } from "react";
import Link from "next/link";

export const ProfileButtons = () => {
  let [openMenu, setOpenMenu] = useState(false);
  let abrirMenu = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <nav className={Styles.container}>
      <Link href="/profile" className={openMenu ? Styles.translate : ""}>
        <FaUserAlt />
      </Link>
      <Link href="/cart" className={openMenu ? Styles.translate : ""}>
        <BsCart3 />
      </Link>
      <Link href="/myProducts" className={openMenu ? Styles.translate : ""}>
        <SiProducthunt />
      </Link>
      <section className={Styles.firstComponent} onClick={abrirMenu}>
        {openMenu ? <RxCross1 /> : <FaUserAlt />}
      </section>
    </nav>
  );
};
