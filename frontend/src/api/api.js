import axios from "axios"

// const API = axios.create({ baseURL: "http://localhost:3001"})
const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

export const signIn = (formData ) => API.post("/user/login", formData, {
    headers: {
        "Content-Type": "application/json"
    }
});

export const signUp = (data) => API.post("/user/register", data, {
    headers: {
        "Content-Type": "application/json"
    }
});

export const createPost = (data) => API.post("/post/addPost", data);
export const getAllPosts = () => API.get("/post");
export const getPost = (id) => API.get(`/post/postDetail/${id}`);
export const updatePost = (id, data) => API.patch(`/addPostOrEdit/${id}`, data);