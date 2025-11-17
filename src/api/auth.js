import axios from "axios";

// Create a central axios instance for the app so auth and other APIs share the same configuration
const API = process.env.REACT_APP_API_URL || "http://localhost:8080/api";
export const apiClient = axios.create({
    baseURL: API,
});

// Read token from localStorage if it exists and set Authorization header
const existingToken = localStorage.getItem("token");
if (existingToken) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${existingToken}`;
}

export const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
};

export const clearAuthToken = () => {
    delete apiClient.defaults.headers.common["Authorization"];
};

// JWT helpers
const parseJwt = (token) => {
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) return null;
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};

export const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    return parseJwt(token);
};

export const getUserIdFromToken = () => {
    const user = getUserFromToken();
    if (!user) return null;
    // common claim names: userId, id, sub
    return user.userId || user.id || user.sub || null;
};

export const registerUser = (user) => {
    return apiClient.post(`/register`, user);
}

export const loginUser = async (credentials) => {
    const res = await apiClient.post(`/login`, credentials);

    const token = res.data.token;
    console.log(token);

    localStorage.setItem("token", token);
    setAuthToken(token);

    return res.data;
}

export const logout = () => {
    apiClient.post(`/logout`).catch(() => {});
    localStorage.removeItem("token");
    clearAuthToken();
}

// Image posts API (POST create and GET list)
// Image post functions moved to `src/api/imagePosts.js` (auth.js is for authentication only)