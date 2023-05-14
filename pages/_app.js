import "@/styles/globals.css";
import "@/styles/variables.css";

import DataContext from "../context/dataContext.js";
import useDataWithToken from "../hooks/useDataWithToken.js";
import { useState, useEffect } from "react";
import hookToken from "@/hooks/hookToken.js";

function MyApp({ Component, pageProps }) {
  const cookieToken = hookToken();
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (cookieToken) {
      setToken(cookieToken);
    }
  }, [cookieToken]);

  const data = useDataWithToken(token);

  return (
    <DataContext.Provider
      value={{ userData, setUserData, ...data, token, setToken }}
    >
      <Component {...pageProps} />
    </DataContext.Provider>
  );
}

export default MyApp;
