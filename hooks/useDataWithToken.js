import { useState, useEffect } from "react";


const useDataWithToken = (token) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (token) {
      setIsLoading(true);
      fetch("/api/getInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Token not found");
          }
          return res.json();
        })
        .then((res) => {
          setUserData({ response: res });
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch((error) => {
          setUserData({ response: "usuario no encontrado" });
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    } else {
      setUserData({ response: "usuario no encontrado" });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [token]);

  return { userData, isLoading };
};

export default useDataWithToken;
