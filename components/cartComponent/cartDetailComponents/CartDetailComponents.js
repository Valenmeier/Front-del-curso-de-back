import { useData } from "@/context/dataContext";
import React, { useEffect, useState } from "react";
import styles from "./estilos.module.css";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { BsTrashFill } from "react-icons/bs";

const CartDetailComponents = ({
  product,
  setProductArray,
  setPriceTotal,
  updateCartComponents,
  setDeletingProduct,
}) => {
  let [newQuantity, setNewQuantity] = useState(product.quantity);
  let [price, setPrice] = useState(parseInt(product.price * newQuantity));
  let [error, setError] = useState(null);
  let user = useData();
  let incrementQuantity = () => {
    if (newQuantity < product.stock) {
      setNewQuantity(newQuantity + 1);
      setPriceTotal((prevPriceTotal) => prevPriceTotal + product.price);
    }
  };
  let decrementQuantity = () => {
    if (newQuantity > 1) {
      setNewQuantity(newQuantity - 1);
      setPriceTotal((prevPriceTotal) => prevPriceTotal - product.price);
    }
  };

  let removeProduct = () => {
    // 1. Remover el producto de productArray
    setProductArray((prevProductArray) =>
      prevProductArray.filter((item) => item._id !== product._id)
    );

    // 2. Actualizar el precio total
    setPriceTotal(
      (prevPriceTotal) => prevPriceTotal - product.price * newQuantity
    );

    // 3. Aquí podrías eliminar el producto de la base de datos o el estado del
    // componente padre, si es necesario.
    setDeletingProduct(product._id);
    fetch("/api/deleteProductCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
        cid: user.userData.response.response.cart,
        pid: product._id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          updateCartComponents();
        }else{
          setError("Ha ocurrido un error al actualizar los componentes")
        }
      });
  };

  useEffect(() => {
    setProductArray((prevProductArray) => {
      // Verifica si el producto ya existe en productArray
      const existingProductIndex = prevProductArray.findIndex(
        (item) => item._id === product._id
      );

      // Si existe, actualiza la cantidad
      if (existingProductIndex > -1) {
        const newProductArray = [...prevProductArray];
        newProductArray[existingProductIndex] = {
          ...newProductArray[existingProductIndex],
          quantity: newQuantity,
        };
        return newProductArray;
      } else {
        // Si no existe, lo agrega a productArray
        return [
          ...prevProductArray,
          { _id: product._id, quantity: newQuantity },
        ];
      }
    });
    setPrice(product.price * newQuantity);
  }, [newQuantity]);

  useEffect(() => {
    setPriceTotal((prevPriceTotal) => prevPriceTotal + price);
  }, []);

  return (
    <>
      <div className={styles.cartContainer}>
        <div className={styles.imagenContainer}>
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.titleAndTrash}>
            <h4>{product.title}</h4>
            <BsTrashFill onClick={removeProduct} />
          </div>
          <div>
            <h4 className={styles.cantidadContainer}>
              Cantidad=
              <GoTriangleDown
                onClick={decrementQuantity}
                disabled={newQuantity <= 1}
              />
              {newQuantity}
              <GoTriangleUp
                onClick={incrementQuantity}
                disabled={newQuantity >= product.stock}
              />
            </h4>
          </div>
          <div className={styles.priceIndividualProduct}>
            <h4>Price= ${price}</h4>
          </div>
        </div>
      </div>
      {error ? <h4>{error}</h4> : ""}
    </>
  );
};

export default CartDetailComponents;
