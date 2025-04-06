import userService from "../services/user.service.js";
import { JWT_SECRET } from "../constants/constants.js";
import HttpError from "../utils/HttpError.js";

const create = async (req, res, next) => {
  const { username, firstName, lastName, email, phoneNum, password } = req.body;
  try {
    const newUser = await userService.create({
      username,
      firstName,
      lastName,
      email,
      phoneNum,
      password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export default {
  create,
};
