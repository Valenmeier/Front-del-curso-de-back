import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

const MyProductsCards = ({ info }) => {
  return (
    <Link className={styles.imageContainer} href={`/products/${info._id}`}>
      <img src={info.thumbnail} alt={info.title} />
    </Link>
  );
};

export default MyProductsCards;
