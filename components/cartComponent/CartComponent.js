import Loader from "@/components/loader/Loader";
import { useState } from "react";
import { useData } from "@/context/dataContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CartVoid from "./CartVoid/CartVoid";
import CartDetailComponents from "./cartDetailComponents/CartDetailComponents";
import PriceComponent from "./priceComponent.js/PriceComponent";
import styles from "./estilos.module.css";
import Link from "next/link";

const CartComponent = () => {
  let [loading, setLoading] = useState(true);
  let [cart, setCart] = useState(null);
  let [error, setError] = useState(false);
  let [productArray, setProductArray] = useState([]);
  let [priceTotal, setPriceTotal] = useState(0);
  let [cantidadesConfirmadas, setCantidadesConfirmadas] = useState(false);
  let [response, setResponse] = useState(null);
  const router = useRouter();
  let { id } = router.query;
  const [deletingProduct, setDeletingProduct] = useState(null);

  let user = useData();

  let updateCartComponents = () => {
    fetch("/api/getCart", {
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
        // Ahora 'products' contiene la cantidad como una propiedad adicional
        const products = res[0].products.map((product) => ({
          ...product._id,
          quantity: parseInt(product.quantity),
        }));
        setCart(products.filter((product) => product._id !== deletingProduct));
      })
      .catch((e) => setError(e));
  };

  useEffect(() => {
    if (!user.isLoading) {
      // ...resto del código...
      if (id == user.userData.response.response.cart) {
        updateCartComponents();
      } else {
        setError("Lo sentimos, no hemos encontrado el id de tu carrito");
      }
    }
    setLoading(false);
  }, [user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h5>{error}</h5>
      ) : response ? (
        <div className={styles.background}>
        <div className={`${styles.cartContainer} ${styles.responseStyle}`}>
          <h5>{response}</h5>
          <Link href="/products">Ver otros productos</Link>
        </div>
        </div>
      ) : cart ? (
        cart.length == 0 ? (
          <CartVoid />
        ) : (
          <div className={styles.background}>
            {
              <div className={styles.cartContainer}>
                <h5>Bienvenido a tu carrito</h5>
                <div className={styles.cartDetaildContainer}>
                  {cart.map((product) => {
                    return (
                      <CartDetailComponents
                        key={product._id}
                        product={product}
                        quantity={product.quantity}
                        productArray={productArray}
                        setProductArray={setProductArray}
                        priceTotal={priceTotal}
                        setPriceTotal={setPriceTotal}
                        updateCartComponents={updateCartComponents}
                        setDeletingProduct={setDeletingProduct}
                      />
                    );
                  })}
                </div>
                <PriceComponent
                  price={priceTotal}
                  productArray={productArray}
                  setProductArray={setProductArray}
                  setLoading={setLoading}
                  updateCartComponents={updateCartComponents}
                  setCantidadesConfirmadas={setCantidadesConfirmadas}
                  cantidadesConfirmadas={cantidadesConfirmadas}
                  setResponse={setResponse}
                />
              </div>
            }
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CartComponent;
