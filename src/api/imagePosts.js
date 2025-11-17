import { apiClient } from "./auth";

export const createImagePost = (data) => {
  // data should be a FormData instance with fields: caption, userId, file
  return apiClient.post(`/image-posts`, data);
}

export const getImagePosts = () => {
  return apiClient.get(`/image-posts`);
}
