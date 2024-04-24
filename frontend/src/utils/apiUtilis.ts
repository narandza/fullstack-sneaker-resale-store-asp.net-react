import api from "../api/apiService";

export const getItemById = async (category: string, id: string) => {
  if (category && id) {
    try {
      const response = await api.get(`/${category}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export const getPath = (path: string) => {
  const baseUrl = "http://localhost:5000";

  const absoluteUrl = `${baseUrl}/${path
    .replace(/wwwroot\\/i, "")
    .replace(/\\/g, "/")}`;

  return absoluteUrl;
};
