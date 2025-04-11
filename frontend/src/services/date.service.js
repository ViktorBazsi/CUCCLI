import axiosInstance from "./axiosInstance";

const listAll = async ({ possible = true } = {}) => {
  try {
    const response = await axiosInstance.get("/api/date", {
      params: possible ? { possible: true } : {},
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  listAll,
};
