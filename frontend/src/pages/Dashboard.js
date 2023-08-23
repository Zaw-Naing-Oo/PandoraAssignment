import React, { useEffect } from 'react'
import Box from "@mui/material/Box"
import Typography  from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from '@mui/material/CardContent';
import CardMedia from "@mui/material/CardMedia"
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from "@mui/material/IconButton"
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import { useDispatch, useSelector} from "react-redux"
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify"
import { getPostsByUser } from '../api/api';

// icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { setUserPosts } from '../features/PostSlice';


const Dashboard = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();

    // const queryClient = useQueryClient();
    const { id: userId } = useParams();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("profile"))
    const username = user?.username

    // fetch user Posts
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['postsByUser'],
        queryFn:  () => getPostsByUser(userId),
      })
    const userPosts = data?.data?.userPosts

    // set to redux state
    useEffect(() => {
        if (userPosts) {
          // Dispatch the action to update Redux state with new user posts
          dispatch(setUserPosts(userPosts));
        }
    }, [data, dispatch]);

    const posts = useSelector((state) => state?.posts?.userPosts);

    
  return (
    <Box paddingX={ isMobile ? 1 : 8} paddingY={4} sx={{ margin: 'auto', minHeight: "100vh"}}>
      <Typography variant='h1' gutterBottom sx={{ textAlign: "center",}}>
        Dashboard of { isMobile ? <br /> : " "}
        { username }
      </Typography>
      <Divider />

      <Stack direction="column" spacing={2} paddingX={isMobile ? 3 : 8} sx={{ display: "flex", justifyContent: "center", marginTop: "2rem"}}>

      { isLoading ? (
        [...Array(3)].map((_,index) => {
           return (
            <Box  sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", padding: 1, height: isMobile ? 400 : 300,}} >
              <Skeleton variant="rectangular" sx={{ width: isMobile ? "100%" : "50%" , height: isMobile ? 300 : "auto"}} />
              <Box sx={{ justifyContent: "space-between", width: isMobile ? "100%" : "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingX: isMobile ? 1 : 3}}>
                <Skeleton width="40%" />
                <Skeleton width={ !isMobile ? "100%" : "60%"} sx={{ height: !isMobile ? 300 : "auto" }} /> 
                <Box sx={{ display: "flex", width: "100%"} }>
                  <Skeleton width="10%" sx={{ marginRight: "2rem"}} />
                  <Skeleton width="10%" />
                </Box>
              </Box>
           </Box>
           )
        })
      ) : (
        posts?.length > 0 &&  posts.map( post => (
          <Card 
            key={post?.id}
            sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", padding: 1, height: !isMobile && "300px", overflow: "auto", boxShadow: "none",  transition: "border-color 0.2s", }}
            >
            <CardContent sx={{ justifyContent: "space-between", width: isMobile ? "100%" : "90%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingX: isMobile ? 1 : 3}}>
              <Typography gutterBottom variant="h4" sx={{ fontSize: isMobile ? 18 : 25, paddingX: isMobile ? 1 : 2, fontWeight: 500}}>
                { post?.title } 
              </Typography>
              <Typography gutterBottom  component="h6" sx={{ fontSize: 14, paddingX: isMobile ? 1 : 2, overflow: "auto", lineHeight: 1.7 }}>
                { post?.content }
              </Typography>
              <Box sx={{ display: "flex", marginTop: 1, paddingX: isMobile ? 0 : 2,}}>
                <IconButton aria-label="delete" size='small' color="error" sx={{ padding : 0, marginRight: 1}} 
                // onClick = { () => handleDelete(tour?._id)}
                >
                  <DeleteIcon />
                </IconButton>
                <Link to={`/tours/createOrEdit/${post?._id}`}>
                  <IconButton  size='small' sx={{ padding : 0, color: "#00897b"}}>
                    <EditIcon />
                  </IconButton>
                </Link>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
      </Stack>
    </Box>
  )
}

export default Dashboard