import Styles from "./footer.module.css";

const FooterGeneral = () => {
  return (
    <footer className={Styles.footerModel}>
      <h4>Proyecto consumiendo mi propia API.</h4>
      <h4>Autor: Valentin Meier. ©Copyright todos los derechos reservados.</h4>
      <h4>Api documentation="Link de la api"</h4>
    </footer>
  );
};

export default FooterGeneral;
