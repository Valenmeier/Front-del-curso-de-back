import React, { useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { SiProducthunt } from "react-icons/si";
import { BsCart3 } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import Styles from "./profileButtons.module.css";
import { useState } from "react";
import Link from "next/link";
import { useData } from "@/context/dataContext";

export const ProfileButtons = () => {
  let [openMenu, setOpenMenu] = useState(false);
  let [id, setId] = useState(null);
  let abrirMenu = () => {
    setOpenMenu(!openMenu);
  };
  let user = useData();

  useEffect(() => {
    setId(user.userData.response.response.cart);
  }, [user]);
  return (
    <nav className={Styles.container}>
      <Link href="/profile" className={openMenu ? Styles.translate : ""}>
        <FaUserAlt />
      </Link>
      <Link href={`/cart/${id}`} className={openMenu ? Styles.translate : ""}>
        <BsCart3 />
      </Link>
      {user.userData.response.response.rol == "admin" ? (
        <Link href="/panelAdmin" className={openMenu ? Styles.translate : ""}>
          <SiProducthunt />
        </Link>
      ) : (
        <Link href="/myProducts" className={openMenu ? Styles.translate : ""}>
          <SiProducthunt />
        </Link>
      )}

      <section className={Styles.firstComponent} onClick={abrirMenu}>
        {openMenu ? <RxCross1 /> : <FaUserAlt />}
      </section>
    </nav>
  );
};
