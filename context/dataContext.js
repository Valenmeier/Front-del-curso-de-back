import { createContext, useContext } from "react";
const DataContext = createContext({
  userData: null,
  setUserData: () => {},
  isLoading: false,
  token: null,
  setToken: () => {},
});

export function useData() {
  return useContext(DataContext);
}

export default DataContext;
