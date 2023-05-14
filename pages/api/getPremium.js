export default async function handler(req, res) {
  if (req.method === "POST") {
    // Extrae el cuerpo de la solicitud
    const { token, uid } = req.headers;

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/premium/${uid}`,
        {
          method: "PUT",
          headers: {
            token: token,
          },
        }
      );

      if (response.ok) {
        // Si la respuesta es exitosa, extrae los datos
        const data = await response.json();

        res.status(200).send(data);
      } else {
        // Si hay un error, devuelve el error al cliente
        const errorData = await response.json();
        res.status(response.status).json(errorData);
      }
    } catch (error) {
      // Si hay un error en la solicitud, devuelve un error 500 (Error interno del servidor)
      console.log(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  } else {
    // Si el método de la solicitud no es POST, devuelve un error 405 (Método no permitido)
    res.setHeader("Allow", "POST");
    res.status(405).end("Método no permitido");
  }
}
