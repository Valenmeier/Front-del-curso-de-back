import Link from "next/link";
import styles from "./ProductCard.module.css";
import Image from "next/image";

const Cards = ({ data }) => {

  const { title, thumbnail, price, status, id, stock } = data;

  return (
    <Link href={`/products/${id}`} className={styles.card}>
      {status && stock > 0 ? (
        <div className={`${styles.status} ${styles.available}`}>Disponible</div>
      ) : (
        <div className={`${styles.status} ${styles.notAvailable}`}>
          No disponible
        </div>
      )}
      <div className={styles.thumbnail}>
        <Image src={thumbnail} alt={title} width={400} height={400} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.price}>${price}</p>
    </Link>
  );
};

export default Cards;
