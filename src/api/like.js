import { axiosInstance } from "./auth"

export const toggleLike = (postId) => {
    return axiosInstance.post(`/likes/${postId}/toggle`);
};

export const getLikeStatus = (postId) => {
    return axiosInstance.get(`/likes/${postId}/status`);
};