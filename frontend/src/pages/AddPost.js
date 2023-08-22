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
import { useCreatePostMutation, useUpdatePostMutation } from '../react-query/query';




// import { getTourToEdit } from '../redux/api';
// import { useCreateTourMutation, useUpdateTourMutation } from '../react-query/query';

const AddPost = () => {

    const navigate = useNavigate();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const user = JSON.parse(localStorage.getItem("profile"));
    const userId = user?.id;

    const oldPostData = null

    const createMutation = useCreatePostMutation();
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
            title: "",
            description: "",
        },
      });

      const onSubmit = async (data) => {
        console.log(data);
        const newPost = {...data, userId}
        try {
            if (oldPostData) {
                // Update post
                // await updateMutation.mutateAsync({ id: postData.id, data });
                toast.success('Post updated successfully');
            } else {
                // Create post
                await createMutation.mutateAsync(newPost);
                toast.success('Post created successfully');
                navigate("/");
            }
            reset(); 
        } catch (error) {
            console.error('Something was wrong:', error);
            toast.error('An error occurred');
        }
      };

  return (
    <Box sx={{ minHeight: "100vh" }}>
        <Box sx={{margin: 'auto', maxWidth: 600, padding: isMobile ? 6 : 7, }}>

        <Typography variant="h1" align="center"  gutterBottom sx={{ marginBottom: "2rem", fontStyle: "oblique"}}>
            {/* { id ? "Update You Post" : "Share Your Experience"} */}
            Share Your Experience
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
                    {/* { id ? 
                    updateTourMutation.isLoading ? "Updating..." : "Update"   
                    : 
                    createTourMutation.isLoading ? "Creating..." : "Create" } */}
                    create
                </Button>
                {/* <Button
                    variant="contained"
                    color="error"
                    onClick={handleClear}
                >
                    Clear
                </Button> */}
                </Grid>
            </Grid>
            </Paper>
        </Box>
        </Box>
  </Box>
  )
}

export default AddPost