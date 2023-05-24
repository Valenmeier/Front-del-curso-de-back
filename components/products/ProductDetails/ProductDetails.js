import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import { useEffect } from "react";
import Loader from "@/components/loader/Loader";
import { useData } from "@/context/dataContext";
import { useRouter } from "next/router";

const ProductDetails = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  const [loader, setLoader] = useState(true);
  const [response, setResponse] = useState(null);
  let user = useData();

  let router = useRouter();

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
  let addProductCart = () => {
    setLoader(true);
    fetch("/api/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
        pid: router.query.id,
        cid: user.userData.response.response.cart,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          setResponse(res.response);
        }
      })
      .catch((err) => console.error(err));
    setLoader(false);
  };
  useEffect(() => {
    if (!user.isLoading) {
      setLoader(false);
    }
  }, [user]);

  let eliminarProducto = () => {
    setLoader(true);
    fetch("/api/deleteIndividualProduct", {
      method: "POST",
      headers: {
        pid: data._id,
        token: user.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setResponse(res.response);
        setLoader(false);
      });
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : response ? (
        <div className={styles.contenedorRespuesta}>
          <h4>{response}</h4>
        </div>
      ) : (
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
              {data.stock > 0 ? (
                data.owner == user.userData.response.response.email ||
                user.userData.response.response.rol == "admin" ? (
                  <section className={styles.eliminarProducto}>
                    {" "}
                    {data.owner == user.userData.response.response.email ? (
                      <h4>Este producto es tuyo</h4>
                    ) : (
                      ""
                    )}
                    <button onClick={eliminarProducto}>
                      Eliminar producto
                    </button>
                  </section>
                ) : (
                  <button
                    className={styles.compraBoton}
                    onClick={addProductCart}
                  >
                    Agregar al carrito
                  </button>
                )
              ) : (
                <h4>Lo sentimos no hay suficiente stock</h4>
              )}
            </div>
          </div>
        </div>
      )}
    </>
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
