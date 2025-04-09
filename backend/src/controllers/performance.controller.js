import performanceService from "../services/performance.service.js";

const listArchived = async (req, res, next) => {
  try {
    const { archived } = req.query;

    const filter =
      archived !== undefined
        ? {
            where: {
              archived: archived === "true",
            },
          }
        : {};

    const archivedPerformances = await performanceService.listArchived(filter);

    const enrichedPerformances = archivedPerformances.map((perf) => {
      const isLiked = perf.likes.some(
        (like) => like.userId === req.user?.id
      );

      return {
        ...perf,
        isLiked,
      };
    });

    res.status(200).json(enrichedPerformances);
  } catch (error) {
    next(error);
  }
};

export default {
  listArchived,
};
