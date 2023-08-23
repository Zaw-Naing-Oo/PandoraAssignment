import { useMutation } from '@tanstack/react-query';
import { createPost, updatePost } from '../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setUserPosts } from '../features/PostSlice';
import { deletePost } from '../api/api';

export const useCreatePostMutation = () => {
  return useMutation((data) => createPost(data));
};

export const useDeletePostMutation = () => {
  const dispatch = useDispatch();
  const userPosts = useSelector(state => state?.posts?.userPosts);
  
  const deleteMutation = useMutation(async (postId) => {
      await deletePost(postId);
  
      // Remove the deleted post from Redux state
      dispatch(setUserPosts(userPosts.filter(post => post.id !== postId)));
    });
    return {
      deleteMutation,
      isLoading: deleteMutation.isLoading,
    };
  };


  export const useUpdatePostMutation = () => {
    return useMutation(({ postId, data }) => updatePost(postId, data));
  };