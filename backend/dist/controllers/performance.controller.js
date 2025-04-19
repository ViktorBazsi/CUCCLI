import performanceService from "../services/performance.service.js";
const listArchived = async (req, res, next) => {
  try {
    const {
      archived
    } = req.query;
    const filter = archived !== undefined ? {
      where: {
        archived: archived === "true"
      }
    } : {};
    const performances = await performanceService.listArchived(filter);
    const enriched = performances.map(perf => {
      const isLiked = req.user ? perf.likes.some(like => like.userId === req.user.id) : false;
      return {
        ...perf,
        isLiked
      };
    });
    res.status(200).json(enriched);
  } catch (error) {
    next(error);
  }
};
export default {
  listArchived
};