import { uploadMiddleware } from "../../middlewares/uploadMiddleware";
import axios from "axios";
import { Blob } from "fetch-blob";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    const { token, uid } = req.headers;
    const formData = new FormData();

    for (const [key, value] of Object.entries(req.files)) {
      const fileBuffer = await new Promise((resolve, reject) => {
        const chunks = [];
        value.stream.on("data", (chunk) => chunks.push(chunk));
        value.stream.on("error", reject);
        value.stream.on("end", () => resolve(Buffer.concat(chunks)));
      });

      const fileBlob = new Blob([fileBuffer], { type: value.mimetype });

      formData.append(key, fileBlob, value.originalFilename);
    }

    const response = await axios.post(
      `${process.env.DOMAIN_API_URL}/api/users/${uid}/documents`,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          token: token,
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ status: "error", response: "Unhandled error" });
  }
};

export default function (req, res) {
  return new Promise((resolve) => {
    uploadMiddleware(req, res, () => handler(req, res).then(resolve));
  });
}
