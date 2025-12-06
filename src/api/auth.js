import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

export const axiosInstance = axios.create({
    baseURL: API_BASE,
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

export const setAuthToken = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
    }
}

export const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken();
}

export const registerUser = (user) => {
    return axiosInstance.post("/register", user);
}

export const loginUser = async (credentials) => {
    const response = await axiosInstance.post("/login", credentials);
    const { token } = response.data;
    localStorage.setItem("authToken", token);
    setAuthToken();
    return response;
}

export const getCurrentUser = async () => {
    const response = await axiosInstance.get("/me");
    return response.data;
}
