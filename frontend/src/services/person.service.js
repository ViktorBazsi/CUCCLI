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

const create = async (personData) => {
  try {
    const formData = new FormData();
    formData.append("name", personData.name);
    formData.append("bio", personData.bio || "");
    formData.append("roles", JSON.stringify(personData.roles || []));

    if (personData.imageFile) {
      formData.append("image", personData.imageFile); // 'image' ⬅️ backend multer .single("image")
    }

    const response = await axiosInstance.post("/api/person", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const update = async (id, personData) => {
  try {
    const formData = new FormData();
    formData.append("name", personData.name);
    formData.append("bio", personData.bio || "");
    formData.append("roles", JSON.stringify(personData.roles || []));

    if (personData.imageFile) {
      formData.append("image", personData.imageFile);
    }

    const response = await axiosInstance.patch(`/api/person/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const toggleRole = async (id, roles) => {
  try {
    const response = await axiosInstance.patch(`/api/person/${id}`, { roles });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const destroy = async (id) => {
  const res = await axiosInstance.delete(`/api/person/${id}`);
  return res.data;
};

export default {
  listAll,
  listPeopleByDate,
  create,
  update,
  toggleRole,
  destroy,
};
