import React from "react";
import Filters from "../filters/Filters";
import Styles from "./products.module.css";
import CardContainer from "../CardContainer";
import Pagination from "../Pagination/Pagination";

const ProductContainer = ({ data }) => {
  let { page, totalPages, prevPage, nextPage, prevLink, nextLink } = data;
  return (
    <div className={Styles.productsContainer}>
      <Filters />
      <CardContainer data={data} />
      <Pagination
        page={page}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
        prevLink={prevLink}
        nextLink={nextLink}
      />
    </div>
  );
};

export default ProductContainer;
