// src/backend/middleware/uploadImageMiddleware.js
import fs from "fs";
import path from "path";

export const uploadSingleImage = async (req, fieldName) => {
  const formData = await req.formData();
  const fields = {};
  let imagePath = null;

  for (const [key, value] of formData.entries()) {
    if (key === fieldName && value instanceof File) {
      // Folder: public/Upload
      const uploadDir = path.join(process.cwd(), "public", "Upload");
      fs.mkdirSync(uploadDir, { recursive: true });

      // Create unique filename
      const fileName = `${Date.now()}-${value.name}`;
      const filePath = path.join(uploadDir, fileName);

      // Save file
      const buffer = Buffer.from(await value.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      // Return relative path for DB or frontend
      imagePath = `/Upload/${fileName}`;
    } else {
      fields[key] = value;
    }
  }

  return { fields, imagePath };
};
