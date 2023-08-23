import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DetailsIcon from '@mui/icons-material/Details';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

export default function SingleCard({ post }) {
    const navigate = useNavigate();

  return (
       <Card sx={{ maxWidth: '25rem', margin: '1rem auto', cursor: "pointer"}} >
            <CardHeader
               avatar={<Avatar>{post.username[0]}</Avatar>}
                title={post.title}
            />
            <CardContent sx={{ margin: 'auto'}}>
                <Typography component="p" sx={{ fontSize: '1rem' }}>
                {post.content.length > 200 ? `${post.content.substring(0, 180)}...` : post.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Tooltip title="Detail">
                    <IconButton aria-label="postDetail" color='primary' onClick={ () => navigate(`postDetail/${post?.id}`)} >
                    <DetailsIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
  );
}