import feedbackService from "../services/feedback.service.js";
const create = async (req, res, next) => {
  const userId = req.user && req.user.id;
  const {
    performanceId
  } = req.params;
  const {
    message
  } = req.body;

  // trigger render rebuild

  try {
    if (!userId) {
      return res.status(401).json({
        message: "Bejelentkezés szükséges."
      });
    }
    const alredyFeedbacked = await feedbackService.beenFeedbacked(userId, performanceId);
    if (alredyFeedbacked) {
      return res.status(400).json("Already feedbacked this performance");
    }
    const newFeedback = await feedbackService.create(userId, performanceId, message);
    res.status(201).json(newFeedback);
  } catch (error) {
    next(error);
  }
};
const listall = async (req, res, next) => {
  try {
    const allFeedback = await feedbackService.listall();
    res.status(200).json(allFeedback);
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const getById = await feedbackService.getById(id);
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
    const deleteById = await feedbackService.destroy(id);
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