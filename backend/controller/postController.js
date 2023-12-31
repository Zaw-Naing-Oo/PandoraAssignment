import Post from "../models/Post.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js";

export const getAllPosts = async (req, res) => {
    try {

      // Fetch all posts
      const posts = await Post.findAll();
  
      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

export const getAllPostsWIthPaginatoin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0; // Default page to 0
    const limit = 4; // Number of posts per page

    const startIndex = page * limit;

    // Fetch posts with pagination using Sequelize
    const posts = await Post.findAll({
      offset: startIndex,
      limit: limit,
      order: [['createdAt', 'DESC']], // Adjust based on your sorting preference
    });

    // Calculate the total number of posts
    const totalPosts = await Post.count();

    // Determine if there are more posts
    const hasMore = startIndex + posts.length < totalPosts;

    res.status(200).json({ posts, hasMore });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

export const addPost = async (req, res) => {
  const { title, description, username } = req.body;
  const userId = req.userId;

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

export const getPostsByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id); // Find the user by primary key

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const userPosts = await Post.findAll({ where: { userId: id } });
    return res.status(200).json({ userPosts });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
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
  const { title, description } = req.body;

  try {
    // Find the post by its ID
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Update the post
    post.title = title;
    post.content = description;
    await post.save();

    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};
  
