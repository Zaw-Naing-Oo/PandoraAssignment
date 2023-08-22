import { useMutation } from '@tanstack/react-query';
import { createPost, updatePost } from '../api/api';

export const useCreatePostMutation = () => {
  return useMutation((data) => createPost(data));
};

export const useUpdatePostMutation = () => {
    return useMutation(({ id, data }) => updatePost(id, data));
  };