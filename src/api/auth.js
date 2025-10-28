import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const axiosInstance = axios.create({
    baseURL: API_BASE,
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

export const registerUser = (user) => {
    return axiosInstance.post("/register", user);
}

export const loginUser = (credentials) => {
    return axiosInstance.post("/login", credentials);
}