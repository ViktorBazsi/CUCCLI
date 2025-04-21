import userService from "../services/user.service.js";
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

const listAll = async (req, res, next) => {
  try {
    const allUsers = await userService.listAll();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userById = await userService.getById({
      where: { id },
    });
    res.status(200).json(userById);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { username, firstName, lastName, email, phoneNum, password, role } =
    req.body;
  try {
    const existing = await userService.getById({ where: { id } });
    if (!existing) {
      throw new HttpError("A megadott felhasználó nem található", 404);
    }
    const updated = await userService.update(id, {
      username,
      firstName,
      lastName,
      email,
      phoneNum,
      password,
      role,
    });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const updated = await userService.updateRole(id, role);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userToDelete = await userService.remove(id);
    res.status(201).json({ userToDelete });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  listAll,
  getById,
  update,
  updateRole,
  remove,
};
