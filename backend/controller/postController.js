import Post from "../models/Post.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const addPost = async (req, res) => {
  console.log(req.body);
    const { title, description, userId, username } = req.body;
    

    try {
        // Create a new post
        const newPost = await Post.create({
          title,
          content : description,
          username,
          userId, // Assign the user ID to the post
        });
    
        res.status(201).json({ message: 'Post created successfully', post: newPost });
      } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
      }
}

export const getAllPosts = async (req, res) => {
    try {
      // Fetch all posts
      const posts = await Post.findAll();
  
      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  };

  export const getPostById = async (req, res) => {
    const postId = req.params.id; // Get the post ID from the URL parameter
  
    try {
      // Find the post by its ID
      const post = await Post.findByPk(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json({ post });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  };

  export const deletePost = async (req, res) => {
    const postId = req.params.id; // Get the post ID from the URL parameter
  
    try {
      // Find the post by its ID
      const post = await Post.findByPk(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Delete the post
      await post.destroy();
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  };

  export const updatePost = async (req, res) => {
    const postId = req.params.id; // Get the post ID from the URL parameter
    const { title, content } = req.body;
  
    try {
      // Find the post by its ID
      const post = await Post.findByPk(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Update the post
      post.title = title;
      post.content = content;
      await post.save();
  
      res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  };
  
