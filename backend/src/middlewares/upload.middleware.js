import multer from "multer";
import path from "path";
import fs from "fs";

// Alap mappa, ahova mentjük a képeket
const uploadFolder = "uploads/pictures/performer";

// Ha nem létezik, létrehozzuk
fs.mkdirSync(uploadFolder, { recursive: true });

// Multer konfiguráció
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, "").replace(/\s+/g, "_");
    cb(null, `${name}_${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;
