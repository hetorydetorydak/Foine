import { axiosInstance } from "./auth";

export const getAllImagePosts = async () => {
  const response = await axiosInstance.get("/image-posts");
  return response;
}

export const getImagePostsById = async (id) => {
  const response = await axiosInstance.get("/image-posts/${id}");
  return response.data;
}

export const createImagePost = (file, caption) => {
  const formData = new FormData()
  formData.append("image", file);
  formData.append("caption", caption);

  return axiosInstance.post("/image-posts", formData);
}
