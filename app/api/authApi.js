import api from "../libs/axios";

export const registerUser = async (data) => {
    const res = await api.post("/users", data);
    return res.data;
};

export const loginUser = async (data) => {
    const res = await api.post("/auth/login", data, {
        withCredentials: true,
    });
    // save access token
    localStorage.setItem("accessToken", res.data.data.accessToken);
    return res.data;
};

export const getUserRole = async (email, role) => {
    const res = await api.get(`/users/get${role}/${email}`);
    return res.data;
};
