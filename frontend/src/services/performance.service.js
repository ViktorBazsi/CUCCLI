import axiosInstance from "./axiosInstance";

const list = async (params = {}) => {
  try {
    const response = await axiosInstance.get("/api/performance", { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  list,
};
