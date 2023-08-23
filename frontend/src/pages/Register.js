import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link,  useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import { useForm, Resolver, } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Avatar, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signUp } from '../api/api';
import {  useDispatch } from "react-redux"
import { setUser } from '../features/UserSlice';

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const schema = yup.object({
    username: yup
    .string()
    .required('Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces'),

    email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),

    password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password should be at least 5 characters'),

  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });


  const mutation = useMutation( (data) => signUp(data),
  {
    onSuccess: async (data) => {
      console.log(data);
      const { username, email, id } = data?.data?.user
      const token = data?.data?.token;
      const userInfo = { username, email, id, token };
      dispatch(setUser(userInfo));
      toast.success('Register Successfully');
      navigate('/');
    },
    onError: (error) => {
      // console.log(error);
      toast.error(error?.response?.data?.message);
      navigate("/register")
    }
  })
  

  const onSubmit = async (data) => {
    // console.log(data);
    await mutation.mutateAsync(data);
    reset();
  };


  return (
    <Container component="main" maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar  sx={{ m: 1, }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h3" variant='h2'>
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField 
              label="Name" 
              required
              fullWidth
              type="text"
              {...register('username')}
            />
            {errors.username && (
              <Typography variant='caption' color="red" sx={{ lineHeight: 0, marginBottom: "0.5rem"}}>{errors.username.message}</Typography>
            )}

          </Grid>
          <Grid item xs={12}>
            <TextField 
                label="Email" 
                required
                fullWidth
                type="email"
                {...register('email')}
              />
              {errors.email && (
                <Typography variant='caption' color="red" sx={{ lineHeight: 0, marginBottom: "0.5rem"}}>{errors.email.message}</Typography>
              )}
          </Grid>
          <Grid item xs={12}>
            <TextField 
                label="Password" 
                required
                fullWidth
                type="password"
                {...register('password')}
              />
              {errors.password && (
                <Typography variant='caption' color="red" sx={{ lineHeight: 0, marginBottom: "0.5rem"}}>{errors.password.message}</Typography>
              )}
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
          <Typography component='p'>Do you have an account?</Typography>
          <Link to="/login">&nbsp;Sign In</Link>
        </Box>
      </Box>
    </Box>
  </Container>
  )
}

export default Register