import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/constants.js";

const authOptional = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      // Hiba esetén ne dobjunk, csak menjünk tovább user nélkül
      req.user = null;
    }
  } else {
    req.user = null;
  }

  next();
};

export default { authOptional };
