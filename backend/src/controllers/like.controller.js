import likeService from "../services/like.service.js";

const toggleLike = async (req, res, next) => {
  try {
    const userId = req.user && req.user.id;
    const { performanceId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Bejelentkezés szükséges." });
    }

    const alreadyLiked = await likeService.hasLiked(userId, performanceId);

    if (alreadyLiked) {
      await likeService.dislikePerformance(userId, performanceId);
      return res.status(200).json({ liked: false });
    } else {
      await likeService.likePerformance(userId, performanceId);
      return res.status(200).json({ liked: true });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  toggleLike,
};
