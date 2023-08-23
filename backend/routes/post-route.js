import express from "express"
import { addPost, getAllPosts } from "../controller/postController.js"

const router = express.Router();

router.get("/", getAllPosts);
router.post("/addPost", addPost);
// router.post("/addOrEdit/:id", updatePost);
// router.post("/postDetail/:id", getPostById);
// router.post("/postDelete/:id", deletePost);

export default router;