import express from "express"
import { addPost, getAllPosts, getPostById, getPostsByUser, deletePost, updatePost, getAllPostsWIthPaginatoin } from "../controller/postController.js"
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/", getAllPosts);
router.get("/", getAllPostsWIthPaginatoin);
router.get("/postDetail/:id", getPostById);

router.post("/addPost", verifyToken, addPost);
router.get("/dashboard/:id", getPostsByUser);
router.delete("/dashboard/:id", verifyToken, deletePost);
router.patch("/editPost/:id", verifyToken, updatePost);

export default router;