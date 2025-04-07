import axiosInstance from "./axiosInstance";

const listAll = async () => {
  try {
    const response = await axiosInstance.get("/api/person");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const listPeopleByDate = async (dateId) => {
  try {
    const response = await axiosInstance.get(`/api/person/by-date/${dateId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  listAll,
  listPeopleByDate,
};
