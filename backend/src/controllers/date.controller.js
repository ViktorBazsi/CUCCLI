import dateService from "../services/date.service.js";

const listAll = async (req, res, next) => {
  try {
    const allDates = await dateService.listAll();
    res.status(200).json(allDates);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dateById = await dateService.getById(id);
    res.status(200).json(dateById);
  } catch (error) {
    next(error);
  }
};

export default {
  listAll,
  getById,
};
