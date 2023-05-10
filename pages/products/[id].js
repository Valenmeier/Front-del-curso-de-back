import React, { useState } from "react";
import GeneralLayout from "@/components/common/Layout/GeneralLayout";
import Styles from "../../components/products/Detalles/details.module.css";
import ProductDetails from "@/components/products/ProductDetails/ProductDetails";
import Loader from "@/components/loader/Loader";

const Detalles = ({ data }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <GeneralLayout>
      {isImageLoading && <Loader />}
      <div className={Styles.divVideo}>
        <img
          className={Styles.imagenFondoDetalles}
          src="https://res.cloudinary.com/dyjpscesp/image/upload/v1682088439/Meiercommerce/fondoProductos_thv4ow.gif"
          alt={`${data.title}`}
          onLoad={handleImageLoad}
        />
      </div>
      <div className={Styles.divCapa}></div>
      <div className={Styles.divDetalles}>
        <ProductDetails data={data} />
      </div>
    </GeneralLayout>
  );
};

export default Detalles;

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
