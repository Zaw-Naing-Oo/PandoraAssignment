import express from "express"
import { addPost, getAllPosts, getPostById, getPostsByUser, deletePost } from "../controller/postController.js"

const router = express.Router();

router.get("/", getAllPosts);
router.post("/addPost", addPost);
// router.post("/addOrEdit/:id", updatePost);
router.get("/postDetail/:id", getPostById);
router.get("/dashboard/:id", getPostsByUser);
router.delete("/dashboard/:id", deletePost);

export default router;