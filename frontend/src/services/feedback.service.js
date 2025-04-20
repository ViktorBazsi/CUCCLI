import axiosInstance from "./axiosInstance";

const addFeedback = async (performanceId, message) => {
  try {
    const response = await axiosInstance.post(
      `/api/feedback/${performanceId}`,
      { message }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  addFeedback,
};
