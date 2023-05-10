import Cards from "../Cards/index.js";
import Styles from "./cardContainer.module.css";

const CardContainer = ({ data }) => {
  let message;
  if (data.payload) {
    message = data.payload.map((datos) => (
      <Cards key={datos.id} data={datos} />
    ));
  } else {
    message = <h2>No hay ningún producto con esas caracteristicas</h2>;
  }
  return data.length === 0 ? (
    <h3> No hay ningún producto</h3>
  ) : (
    <div className={Styles.cardContainer}>{message}</div>
  );
};

export default CardContainer;
