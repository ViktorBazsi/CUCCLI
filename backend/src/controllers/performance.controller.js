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

    const performances = await performanceService.listArchived(filter);

    const enriched = performances.map((perf) => {
      const isLiked = req.user
        ? perf.likes.some((like) => like.userId === req.user.id)
        : false;

      const ratings = perf.ratings || [];
      const ratingCount = ratings.length;
      const averageRating =
        ratingCount > 0
          ? ratings.reduce((sum, r) => sum + r.value, 0) / ratingCount
          : null;

      return {
        ...perf,
        isLiked,
        averageRating,
        ratingCount,
      };
    });

    res.status(200).json(enriched);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const performanceById = await performanceService.getById({
      where: { id },
    });
    res.status(200).json(performanceById);
  } catch (error) {
    next(error);
  }
};

const getPerformanceWithAverage = async (req, res) => {
  try {
    const { id } = req.params;

    const performance = await performanceService.getById({ where: { id } });

    if (!performance) {
      return res.status(404).json({ message: "Performance not found" });
    }

    const ratings = performance.ratings;
    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length
        : null;

    res.json({
      ...performance,
      averageRating,
    });
  } catch (error) {
    console.error("Error fetching performance:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  listArchived,
  getById,
  getPerformanceWithAverage,
};
