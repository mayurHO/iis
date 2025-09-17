// src/backend/middleware/uploadMiddleware.js
import fs from "fs";
import path from "path";

export const uploadSingleImage = async (req, fieldName) => {
  const formData = await req.formData();
  const fields = {};
  let imagePath = null;

  for (const [key, value] of formData.entries()) {
    if (key === fieldName && value instanceof File) {
      const uploadDir = path.join(process.cwd(), "src/Upload");
      fs.mkdirSync(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${value.name}`;
      const filePath = path.join(uploadDir, fileName);

      const buffer = Buffer.from(await value.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      imagePath = `/Upload/${fileName}`;
    } else {
      fields[key] = value;
    }
  }

  return { fields, imagePath };
};
