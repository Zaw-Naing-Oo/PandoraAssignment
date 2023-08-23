import express from "express"
import { addPost, getAllPosts, getPostById } from "../controller/postController.js"

const router = express.Router();

router.get("/", getAllPosts);
router.post("/addPost", addPost);
// router.post("/addOrEdit/:id", updatePost);
router.get("/postDetail/:id", getPostById);
// router.post("/postDelete/:id", deletePost);

export default router;