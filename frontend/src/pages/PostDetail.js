import React, { useState } from 'react'
import Grid from "@mui/material/Grid"
import Typography  from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Chip from '@mui/material/Chip'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Link from "@mui/material/Link"
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getPost } from '../api/api'


const PostDetail = () => {

  const { id: postId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['post'],
    queryFn:  () => getPost(postId),
  })

  console.log(data)
  const post = data?.data?.post;

  return (
    <Box sx={{ paddingY: 3}}>
      <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ fontSize: 17 , marginLeft: isMobile ? '2rem' :'6rem', marginBottom: isMobile ? '1rem' : 0}}>
        <Link color="inherit" href='/' sx={{ textDecoration: "none", cursor: "pointer", '&:hover': { color: "#64ffda"},}} >
          Back
        </Link>
        <Typography color="text.primary" sx={{ fontSize: 17 }}>Detail</Typography>
      </Breadcrumbs>

      <Box textAlign="center" sx={{ paddingX : isMobile ? 4 : 4, marginTop: "2rem" }}>
        <Typography variant='h1' color="primary">{post?.username}</Typography> 
      </Box>

      <Box textAlign="center" sx={{ paddingX : isMobile ? 4 : 4, paddingBottom : 6, marginTop: "2rem" }}>
        <Grid container>
          <Grid item xs={12} sx={{ textAlign: "center",}}>
            <Typography variant='h1' gutterBottom sx={{ fontWeight: 600}}>{ post?.title }</Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "left", paddingX: isMobile ? 0 : 15 }}>
            <Typography variant='h5' gutterBottom>
            { post?.content }
            </Typography>
          </Grid>
        </Grid>      
      </Box>
  </Box>
  )
}

export default PostDetail