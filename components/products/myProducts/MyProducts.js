import React from "react";
import styles from "./myProducts.module.css";
import { useState } from "react";
import Loader from "@/components/loader/Loader";
import ImageDragDrop from "@/components/common/imageDrop/ImageDragDrop";
import { useData } from "@/context/dataContext";
import MyProductsCards from "./myProductsCards/MyProductsCards";

const MyProducts = () => {
  let [selection, setSelection] = useState(null);
  const [image, setImage] = useState(null);
  let [loading, setLoading] = useState(false);
  let [response, setResponse] = useState(null);
  let [myProductResponse, setMyProductResponse] = useState(null);
  let user = useData();
  let mostrarProductos = () => {
    setSelection("myProducts");
    fetch("/api/traerPorDueno", {
      method: "POST",
      headers: {
        token: user.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 400) {
          setMyProductResponse(<h5>{res.response}</h5>);
        } else if (res.status === 200) {
          const info = res.response.map((product, i) => (
            <MyProductsCards key={i} info={product} />
          ));
          setMyProductResponse(info);
        }
      });
  };

  let subirProductos = () => {
    setSelection("uploadProducts");
  };
  let formHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("code", e.target.code.value);
    formData.append("price", e.target.price.value);
    formData.append("description", e.target.description.value);
    formData.append("stock", e.target.stock.value);
    formData.append("thumbnail", image);
    const response = await fetch("/api/products", {
      method: "POST",
      body: formData,
      headers: {
        token: user.token,
      },
    });
    const data = await response.json();
    setResponse(data.message);
    setLoading(false);
  };

  const handleImageDrop = (imageFile) => {
    setImage(imageFile);
  };
  const ocultarResponse = () => {
    setResponse(null);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : response ? (
        <section className={styles.responseContainer}>
          <div>
            {response}
            <button onClick={ocultarResponse}>Aceptar</button>
          </div>
        </section>
      ) : (
        <section className={styles.productsContainer}>
          <h1>Productos</h1>
          <section className={styles.titleSections}>
            <div
              onClick={mostrarProductos}
              className={selection == "myProducts" ? styles.titleSelection : ""}
            >
              <h3>Mis productos</h3>
            </div>
            <div
              onClick={subirProductos}
              className={
                selection == "uploadProducts" ? styles.titleSelection : ""
              }
            >
              <h3>Subir productos</h3>
            </div>
          </section>
          <section className={styles.productsSelection}>
            {selection ? (
              selection == "myProducts" ? (
                <div className={styles.myProductsSection}>
                  {myProductResponse ? myProductResponse : <Loader />}
                </div>
              ) : selection == "uploadProducts" ? (
                <form
                  onSubmit={formHandler}
                  className={styles.formProductContainer}
                >
                  <div className={styles.principalData}>
                    <div className={styles.imageContainer}>
                      <ImageDragDrop onImageDrop={handleImageDrop} />
                    </div>
                    <div className={styles.infoData}>
                      <input
                        type="text"
                        placeholder="Titulo del producto"
                        name="title"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Código del producto"
                        name="code"
                      />
                      <input
                        type="number"
                        placeholder="Precio individual del producto"
                        name="price"
                        min={1}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.importantData}>
                    <textarea
                      type="text"
                      placeholder="Descripción del producto"
                      name="description"
                      required
                    />

                    <input
                      type="number"
                      placeholder="Cantidad a subir"
                      min={1}
                      name="stock"
                      required
                    />
                    {image ? <button type="submit">Subir producto</button> : ""}
                  </div>
                </form>
              ) : (
                <h5>ha ocurrido un error</h5>
              )
            ) : (
              <div className={styles.selectionProduct}>
                <h5>Selecciona una opción</h5>
              </div>
            )}
          </section>
        </section>
      )}
    </>
  );
};

export default MyProducts;
