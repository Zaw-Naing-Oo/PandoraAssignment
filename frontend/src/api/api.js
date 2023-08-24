import axios from "axios"

// const API = axios.create({ baseURL: "http://localhost:3001"})
const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

API.interceptors.request.use( req => {
    if(localStorage.getItem("profile")) {
        const token = JSON.parse(localStorage.getItem("profile")).token;
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
})

export const signIn = (formData ) => API.post("/user/login", formData);

export const signUp = (data) => API.post("/user/register", data);

export const createPost = (data) => API.post("/post/addPost", data);
export const getAllPosts = () => API.get("/post");
export const getAllPostsByPagination = (page) => API.get(`/post?page=${page}`);
export const getPost = (id) => API.get(`/post/postDetail/${id}`);
export const getPostsByUser = (userId) => API.get(`/post/dashboard/${userId}`);
export const deletePost = (postId) => API.delete(`/post/dashboard/${postId}`);
export const updatePost = (id, data) => API.patch(`/post/editPost/${id}`, data);