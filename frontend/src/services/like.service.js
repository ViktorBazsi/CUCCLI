import axiosInstance from "./axiosInstance";

const toggleLike = async (performanceId) => {
  try {
    const response = await axiosInstance.post(`/api/like/${performanceId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  toggleLike,
};
