import axiosInstance from "./axiosInstance";

const listAll = async () => {
  try {
    const response = await axiosInstance.get("/api/date");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  listAll,
};
