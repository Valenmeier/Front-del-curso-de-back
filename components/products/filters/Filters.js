import Styles from "./filters.module.css";
import { MdOutlineFilterList, MdOutlineFilterListOff } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";

const Filters = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  let filterHandler = () => {
    setFilterOpen(!filterOpen);
  };

  const [getFilter, setGetFilter] = useState({});

  let getFilterHandler = (data) => {
    let newObject = { ...getFilter, ...data };
    setGetFilter(newObject);
  };

  useEffect(() => {
    updateUrl();
  }, [getFilter]);

  let [urlControl, setUrlControl] = useState("/products");
  let updateUrl = () => {
    let url = "/products";
    let { query, limit, sort } = getFilter;
    if (limit || sort || query) {
      url += "?";
      if (limit) url += `limit=${limit}&`;
      if (sort) url += `sort=${sort}&`;
      if (query) url += `query=${query}&`; // Agregar nuevo parámetro de consulta
    }
    setUrlControl(url+"page=1");
  };

  let [ascFilter, setAscFilter] = useState("");
  let [disponible, setDisponible] = useState("");
  return (
    <>
      <div className={Styles.filtersHandler}>
        {filterOpen ? (
          <MdOutlineFilterListOff onClick={filterHandler} />
        ) : (
          <MdOutlineFilterList onClick={filterHandler} />
        )}
      </div>
      <div className={filterOpen ? Styles.filtersOn : Styles.filtersOff}>
        <div className={Styles.filtersContainer}>
          <h5>Ordenar por</h5>
          <div>
            <h5>Precio:</h5>
            <div>
              <h5
                className={ascFilter == "asc" ? Styles.filtroActivo : ""}
                onClick={() => {
                  setAscFilter("asc");
                  getFilterHandler({ sort: "asc" });
                }}
              >
                Ascenedente
              </h5>
              <h5
                className={ascFilter == "desc" ? Styles.filtroActivo : ""}
                onClick={() => {
                  setAscFilter("desc");
                  getFilterHandler({ sort: "desc" });
                }}
              >
                Descendente
              </h5>
            </div>
          </div>
          <div>
            <h5>Disponibilidad:</h5>
            <div>
              <h5
                className={
                  disponible == "disponible" ? Styles.filtroActivo : ""
                }
                onClick={() => {
                  setDisponible("disponible");
                  getFilterHandler({
                    query: "disponible",
                  });
                }}
              >
                Disponible
              </h5>
              <h5
                className={disponible == "agotado" ? Styles.filtroActivo : ""}
                onClick={() => {
                  setDisponible("agotado");
                  getFilterHandler({ query: "agotado" });
                }}
              >
                Agotado
              </h5>
            </div>
          </div>
          <Link
            className={`${Styles.onOffFiltros} ${Styles.activarFiltros}`}
            href={urlControl}
          >
            Activar filtros
          </Link>
          <Link
            className={`${Styles.onOffFiltros} ${Styles.desactivarFiltros}`}
            onClick={() => {
              setAscFilter("");
              setDisponible("");
              setUrlControl("/products");
            }}
            href="/products"
          >
            Borrar filtros
          </Link>
        </div>
      </div>
    </>
  );
};

export default Filters;
