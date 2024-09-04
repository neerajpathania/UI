import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",

    headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
    },
});

//Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem("token");
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;