import ratingService from "../services/rating.service.js";
const create = async (req, res, next) => {
  const userId = req.user && req.user.id;
  const {
    performanceId
  } = req.params;
  const {
    value
  } = req.body;
  try {
    if (!userId) {
      return res.status(401).json({
        message: "Bejelentkezés szükséges."
      });
    }
    const alredyRated = await ratingService.beenRated(userId, performanceId);
    if (alredyRated) {
      return res.status(400).json("Already rated this performance");
    }
    const newRating = await ratingService.create(userId, performanceId, value);
    res.status(201).json(newRating);
  } catch (error) {
    next(error);
  }
};
const listall = async (req, res, next) => {
  try {
    const allRatings = await ratingService.listall();
    res.status(200).json(allRatings);
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const getById = await ratingService.getById(id);
    res.status(200).json(getById);
  } catch (error) {
    next(error);
  }
};
const destroy = async (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const deleteById = await ratingService.destroy(id);
    res.status(200).json({
      deleteById
    });
  } catch (error) {
    next(error);
  }
};
export default {
  create,
  listall,
  getById,
  destroy
};