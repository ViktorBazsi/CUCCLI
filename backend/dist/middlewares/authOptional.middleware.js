import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/constants.js";
var authOptional = function authOptional(req, res, next) {
  var authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    var token = authHeader.split(" ")[1];
    try {
      var decoded = jwt.verify(token, JWT_SECRET);
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
export default {
  authOptional: authOptional
};