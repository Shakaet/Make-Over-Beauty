"use client"
import axios from 'axios'

const api = axios.create({
  baseURL: "https://beauty-server-nine.vercel.app",
//    baseURL: process.env.NEXT_PUBLIC_BASE_API,
    headers: { 'Content-Type': 'application/json' },
})


// Add token in requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = token;
    return config;
});

// Auto refresh token if expired
api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refresh = await api.get("/api/auth/refresh-token");

            const newToken = refresh?.data?.data?.accessToken;
            if (newToken) {
                localStorage.setItem("accessToken", newToken);
                originalRequest.headers.Authorization = newToken;
                return api(originalRequest);
            }
        }

        return Promise.reject(err);
    }
);

export default api;
