import React from "react";
import styles from "./CartVoid.module.css";
import Link from "next/link";

const CartVoid = () => {
  return (
    <section className={styles.cartContainer}>
      <div className={styles.informacion}>
        <h4>
          El carrito se <br /> encuentra vacio
        </h4>
        <Link href="/products">Ver productos</Link>
      </div>
      <div className={styles.capa}></div>
    </section>
  );
};

export default CartVoid;
