import userService from "../services/user.service.js";

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

const listAll = async (req, res, next) => {
  try {
    const allUsers = await userService.listAll();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  listAll,
};
