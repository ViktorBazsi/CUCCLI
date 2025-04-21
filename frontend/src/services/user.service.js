import axiosInstance from "./axiosInstance";

const getById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const listAll = async () => {
  try {
    const response = await axiosInstance.get(`/api/user/`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const create = async (userData) => {
  try {
    const response = await axiosInstance.post(`/api/user/`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const update = async (id, userData) => {
  try {
    const response = await axiosInstance.patch(`/api/user/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const updateRole = async (id, role) => {
  try {
    const response = await axiosInstance.patch(`/api/user/${id}`, { role });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const destroy = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  getById,
  listAll,
  create,
  update,
  updateRole,
  destroy,
};
