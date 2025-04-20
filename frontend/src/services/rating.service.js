import axiosInstance from "./axiosInstance";

const addRating = async (performanceId, value) => {
  try {
    const response = await axiosInstance.post(`/api/rating/${performanceId}`, {
      value,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const listByIdWithAvgRating = async (performanceId) => {
  try {
    const response = await axiosInstance.get(
      `/api/rating/average/${performanceId}`
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  addRating,
  listByIdWithAvgRating,
};
