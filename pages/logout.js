import GeneralLayout from "@/components/common/Layout/GeneralLayout";
import { useData } from "@/context/dataContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const logout = () => {
  const data = useData();
  const router = useRouter();
  let [message, setMessage] = useState("Cerrando sesión");
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
            data.setToken("");
            Cookies.remove("meierCommerceLoginCookie");
            setMessage("Sesión cerrada correctamente");
            router.push("/");
          } else {
            setMessage("Error al cerrar sesión");
          }
        });
    }
  }, [data.isLoading, data.token]);
  return (
    <GeneralLayout>
      <h2>{message}</h2>
    </GeneralLayout>
  );
};

export default logout;
