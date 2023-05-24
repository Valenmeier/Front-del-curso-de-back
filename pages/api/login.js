import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Extrae el cuerpo de la solicitud
    const { email, password } = req.body;

    try {
      // Realiza una solicitud POST al servidor de Node.js utilizando fetch
      const response = await fetch(`${process.env.DOMAIN_API_URL}/api/sessions/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        // Si la respuesta es exitosa, extrae los datos
        const data = await response.json();

        // Extrae el token y setea la cookie
        const token = data.response.token;
        const tokenCookie = serialize("meierCommerceLoginCookie", token, {
          httpOnly: false,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "lax",
          maxAge: 60 * 60 * 24, // 7 días
          path: "/",
        });
        res.setHeader("Set-Cookie", tokenCookie);

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
