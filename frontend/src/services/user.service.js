import axiosInstance from "./axiosInstance";

const getById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  getById,
};
