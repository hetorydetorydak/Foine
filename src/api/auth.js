import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const registerUser = (user) => {
    return axios.post(`${API}/register`, user);
}

export const loginUser = async (credentials) => {
    const res = await axios.post(`${API}/login`, credentials);

    const token = res.data.token;
    console.log(token);

    localStorage.setItem("token", token);

    return res.data;
}

export const logout = () => {
    axios.post(`${API}/logout`).catch(() => {});
    localStorage.removeItem("token");
}