import { useRouter } from "next/router";
import { useEffect } from "react";
import { useData } from "@/context/dataContext";
import Cookies from "js-cookie"; // Importa la biblioteca js-cookie

const LoggedIn = () => {
  const router = useRouter();
  const { setToken } = useData();

  useEffect(() => {
    if (!router.isReady) return;

    const { token } = router.query;

    if (token) {
      setToken(token);

      // Configura la cookie con el token
      Cookies.set("meierCommerceLoginCookie", token, {
        expires: 7,
      });
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [router, setToken]);

  return <div>Procesando...</div>;
};

export default LoggedIn;
