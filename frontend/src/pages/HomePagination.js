import React, { useState, useEffect } from 'react'
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getAllPostsByPagination } from '../api/api';
import SingleCard from '../components/SingleCard';


const HomePagination = () => {

  const [ page, setPage ] = useState(0);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => getAllPostsByPagination(page),
    keepPreviousData: true,
  });

  console.log(data)

  const posts = data?.data?.posts;
  const hasMore = data?.data?.hasMore;

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if(posts?.length === 0){
    return <p>No posts</p>
  }

  const handlePageChange = (event, value) => {
    setPage(value - 1)  // Since Material-UI Pagination uses 1-based index
  };



  return (
    <Box paddingX={8} paddingY={5} sx={{ margin: "auto", minHeight: "100vh" }}>
      { isLoading ? (
        <Grid container spacing={4}>
          {[...Array(8)].map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={350} sx={{ borderRadius: "25px" }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid key={post.id} item xs={12} sm={6} md={4} lg={3}>
               <SingleCard post={post} />
          </Grid>
          ))}
        </Grid>
       )}
         <Pagination
            shape="rounded"
            color='primary'
            count={hasMore ? page + 2 : page + 1}
            page={page + 1}
            onChange={handlePageChange}
            sx={{
              mt: 5,
              '& .MuiPagination-ul': { justifyContent: 'flex-end' },
            }}
        />
      </Box>

  )
}

export default HomePagination