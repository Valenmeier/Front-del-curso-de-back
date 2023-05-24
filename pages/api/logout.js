export default async function handler(req, res) {
  if (req.method === "POST") {
    // Extrae el cuerpo de la solicitud
    const { token } = req.body;

    try {
      // Realiza una solicitud POST al servidor de Node.js utilizando fetch
      const response = await fetch(
        `${process.env.DOMAIN_API_URL}/api/sessions/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token,
          },
        }
      );

      if (response.ok) {
        // Si la respuesta es exitosa, extrae los datos
        const data = await response.json();
        res.status(200).json(data);
      } else {
        // Si hay un error, devuelve el error al cliente
        const errorData = await response.json();

        res.status(response.status).json(errorData);
      }
    } catch (error) {
      // Si hay un error en la solicitud, devuelve un error 500 (Error interno del servidor)
      res.status(500).json({ message: "Error interno del servidor" });
    }
  } else {
    // Si el método de la solicitud no es POST, devuelve un error 405 (Método no permitido)
    res.setHeader("Allow", "POST");
    res.status(405).end("Método no permitido");
  }
}
