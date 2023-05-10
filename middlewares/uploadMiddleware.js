import formidable from "formidable";
import fs from "fs";

export const uploadMiddleware = async (req, res, next) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res
        .status(400)
        .json({ status: "error", error: "Error parsing form data" });
      return;
    }

    req.body = fields;
    req.files = {};

    for (const fileKey of Object.keys(files)) {
      req.files[fileKey] = {
        ...files[fileKey],
        stream: fs.createReadStream(files[fileKey].filepath),
      };
    }
    if (Object.keys(req.files).length === 0) {
      res
        .status(400)
        .json({ status: 400, response: "No se subió ningún archivo" });
      return;
    }

    next();
  });
};
