"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userValidationSchemaForRegister = exports.userValidationSchemaForLoginName = exports.userValidationSchemaForLoginEmail = void 0;
var yup = _interopRequireWildcard(require("yup"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var userValidationSchemaForRegister = exports.userValidationSchemaForRegister = yup.object({
  username: yup.string().required("Név megadása kötelező").min(3, "Legalább három karakterből álljon a név"),
  email: yup.string().email("Érvényes email formátumot adj meg!").required("email cím megadása kötelező"),
  password: yup.string().min(6, "Legalább hat karakterből álljon a jelszó").required("Jelszó megadása kötelező")
});
var userValidationSchemaForLoginEmail = exports.userValidationSchemaForLoginEmail = yup.object({
  username: yup.string(),
  email: yup.string().email("Érvényes email formátumot adj meg!").required("email cím megadása kötelező"),
  password: yup.string().required("Jelsző megadása kötelező")
});
var userValidationSchemaForLoginName = exports.userValidationSchemaForLoginName = yup.object({
  username: yup.string().required("Név megadása kötelező").min(3, "Legalább három karakterből álljon a név"),
  email: yup.string(),
  password: yup.string().required("Jelsző megadása kötelező")
});