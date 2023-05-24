import GeneralLayout from "@/components/common/Layout/GeneralLayout";
import { useData } from "@/context/dataContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Loader from "@/components/loader/Loader";

const logout = () => {
  const data = useData();
  const router = useRouter();
  let [message, setMessage] = useState("Cerrando sesión");
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!data.isLoading) {
      let token = data.token;
      fetch("api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status == 200) {
            setLoading(false);
            data.setToken("");
            Cookies.remove("meierCommerceLoginCookie");
            setMessage("Sesión cerrada correctamente");
            router.push("/");
          } else {
            setLoading(false);
            setMessage("Error al cerrar sesión");
          }
        });
    }
  }, []);
  return (
    <GeneralLayout>{loading ? <Loader /> : <h2>{message}</h2>}</GeneralLayout>
  );
};

export default logout;
