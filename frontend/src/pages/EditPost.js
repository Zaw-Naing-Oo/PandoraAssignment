import React, { useState, useRef, useCallback, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify"
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdatePostMutation } from '../react-query/query';
import { getPost } from '../api/api';
import { useQuery } from '@tanstack/react-query';




// import { getTourToEdit } from '../redux/api';
// import { useCreateTourMutation, useUpdateTourMutation } from '../react-query/query';

const EditPost = () => {

    const navigate = useNavigate();
    const { id : postId} = useParams();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const user = JSON.parse(localStorage.getItem("profile"));

    const { isLoading, isError, data, error } = useQuery({  
        queryKey: ['post'],
        queryFn:  () => getPost(postId),
      })
    const existingPost = data?.data?.post;

    const updateMutation = useUpdatePostMutation();


    const schema = yup.object({
        title: yup
        .string()
        .required('Title is required'),
    
        description: yup
        .string()
        .required('Password is required')    
      });

      const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: existingPost?.title || "",
            description: existingPost?.content || "",
        },
      });

      const onSubmit = async (data) => {
        console.log(data);
        try {
           // update post
           console.log(data);
            await updateMutation.mutateAsync({ data, postId });
            toast.success('Post Update successfully');
            reset(); 
            navigate("/");
        } catch (error) {
            console.error('Something was wrong:', error);
            toast.error('An error occurred');
        }
      };

      useEffect(() => {
        if (existingPost) {
          reset({
            title: existingPost.title || "",
            description: existingPost.content || "",
          });
        }
      }, [existingPost, reset]);

      if (isLoading) {
        return <div>Loading...</div>;
      } 

  return (
    <Box sx={{ minHeight: "100vh" }}>
        <Box sx={{margin: 'auto', maxWidth: 600, padding: isMobile ? 6 : 7, }}>

        <Typography variant="h1" align="center"  gutterBottom sx={{ marginBottom: "2rem", fontStyle: "oblique"}}>
            Update Post
        </Typography>
        
       <Box component="form" onSubmit={handleSubmit(onSubmit)} >
            <Paper elevation={3} sx={{ padding: isMobile ? 2 : 5}} >
            <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth 
                        required
                        type="text"
                        label="Title"
                        {...register('title')}
                        defaultValue={existingPost?.title || ""}
                    />
                    {errors.title && (
                        <Typography variant='caption' color="red" sx={{ lineHeight: 0, marginBottom: "0.5rem"}}>{errors.title.message}</Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        multiline
                        label="Description"
                        rows={2}
                        {...register('description')}
                        defaultValue={existingPost?.content || ""}
                    />
                    {errors.description && (
                        <Typography variant='caption' color="red" sx={{ lineHeight: 0, marginBottom: "0.5rem"}}>{errors.description.message}</Typography>
                    )}
                </Grid>
                <Grid item style={{ marginTop: 20 }}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className='me-3'
                >
                    Update Post
                </Button>
                </Grid>
            </Grid>
            </Paper>
        </Box>
        </Box>
  </Box>
  )
}

export default EditPost