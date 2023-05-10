import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import { useEffect } from "react";

const ProductDetails = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = data.thumbnail;

    img.onload = () => {
      setImage(img);
      setLoading(false);
    };
  }, [data.thumbnail]);

  if (data.error) {
    return (
      <div className={styles.error}>
        <h5>{data.error}</h5>
      </div>
    );
  }

  return (
    <div className={styles.contenedorDetalles}>
      <div className={styles.capa}></div>
      <div className={styles.contenedorInformacion}>
        {loading && (
          <div className={styles.loader}>
            <div className={styles.spinner}></div>
          </div>
        )}
        {image && (
          <img
            src={image.src}
            alt={data.title}
            title={data.title}
            style={{ display: loading ? "none" : "block" }}
          />
        )}
        <h3 className={styles.tituloProducto}>{data.title}</h3>
      </div>
      <div
        className={
          styles.contenedorInformacion + " " + styles.comprasContenedor
        }
      >
        <div className={styles.descripcionProducto}>
          <h4>Descripción:</h4>
          <p>{data.description}</p>
        </div>
        <div className={styles.stock}>
          <h3>Stock= {data.stock}</h3>
          <h3>Id Producto= {data._id}</h3>
        </div>
        <div className={styles.botones}>
          <button className={styles.compraBoton}>Comprar</button>
          <button className={styles.compraBoton}>Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await fetch(`${process.env.DOMAIN_API_URL}/api/products/${id}`);
  const getData = await res.json();
  let data = await getData[0];
  return {
    props: {
      data,
    },
  };
}
