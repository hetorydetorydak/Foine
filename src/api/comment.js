import { axiosInstance } from "./auth"

export const addComment = (imagePostId, comment) => {
    return axiosInstance.post("/comments", { imagePostId, comment });
}

export const getCommentsByPost = (postId) => {
    return axiosInstance.get(`/comments/post/${postId}`);
}