import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const axiosInstance = axios.create({
  baseURL: API_BASE,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const setAuthToken = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export const registerUser = (user) => {
  return axiosInstance.post("/register", user);
};

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/login", credentials);
  const { token } = response.data;
  localStorage.setItem("authToken", token);
  setAuthToken();
  return response;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/me");
  return response.data;
};

export const getAllArtists = async () => {
  const response = await axiosInstance.get("/artists");
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("authToken");
  setAuthToken();
};

export const getAllImagePosts = async () => {
  const response = await axiosInstance.get("/image-posts");
  return response;
};

export const getImagePostById = async (id) => {
  const response = await axiosInstance.get(`/image-posts/${id}`);
  return response.data;
};

export const createImagePost = (file, caption) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("caption", caption);
  return axiosInstance.post("/image-posts", formData);
};

export const addComment = (imagePostId, comment) => {
  return axiosInstance.post("/comments", { imagePostId, comment });
};

export const getCommentsByPost = (postId) => {
  return axiosInstance.get(`/comments/post/${postId}`);
};

export const toggleLike = (postId) => {
  return axiosInstance.post(`/likes/${postId}/toggle`);
};

export const getLikeStatus = (postId) => {
  return axiosInstance.get(`/likes/${postId}/status`);
};