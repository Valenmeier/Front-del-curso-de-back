import { createContext, useContext } from "react";
const DataContext = createContext({
  userData: null,
  isLoading: false,
  token: null, // Nuevo valor para almacenar el token
});

export function useData() {
  return useContext(DataContext);
}

export default DataContext;
