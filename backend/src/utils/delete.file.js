import fs from "fs";
import path from "path";

const deleteFile = (filePath) => {
  if (!filePath) return;
  const absolutePath = path.resolve(filePath);
  fs.access(absolutePath, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(absolutePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("⚠️ Nem sikerült törölni a fájlt:", unlinkErr);
        }
      });
    }
  });
};

export default deleteFile;
