import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";
import { useData } from "@/context/dataContext";
import { useEffect } from "react";

const PriceComponent = ({
  price,
  productArray,
  setProductArray,
  setLoading,
  updateCartComponents,
  setCantidadesConfirmadas,
  cantidadesConfirmadas,
  setResponse,
}) => {
  let user = useData();
  let vaciarCarrito = () => {
    setLoading(true);
    fetch("/api/deleteAllProductCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
        cid: user.userData.response.response.cart,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          updateCartComponents();
        }
      });
    setProductArray([]);
    setLoading(false);
  };

  let confirmarCantidades = () => {
    fetch("/api/confirmarCantidades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
        cid: user.userData.response.response.cart,
        products: productArray,
      }),
    });
    setCantidadesConfirmadas(true);
  };

  let comprarProductos = () => {
    setLoading(true);
    fetch("/api/confirmarCompra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
        cid: user.userData.response.response.cart,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          updateCartComponents();
          setResponse(res.response);
        }
      });
    setProductArray([]);
    setLoading(false);
  };

  useEffect(() => {
    setCantidadesConfirmadas(false);
  }, [productArray]);

  return (
    <section className={styles.container}>
      <section className={styles.monto}>
        <div className={styles.montoTotalTitle}>
          <h3>Monto total:</h3>
        </div>
        <div className={styles.totalPrice}>
          <h3> ${price}</h3>
        </div>
      </section>
      <section className={styles.buttonSection}>
        <button onClick={vaciarCarrito}>Vaciar carrito</button>
        {cantidadesConfirmadas ? (
          <button onClick={comprarProductos}>Comprar</button>
        ) : (
          <button onClick={confirmarCantidades}>Confirmar cantidades</button>
        )}
      </section>
    </section>
  );
};

export default PriceComponent;
