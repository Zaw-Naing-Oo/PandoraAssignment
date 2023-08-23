import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

export default function SingleCard({ post }) {
  return (
       <Card sx={{ maxWidth: '25rem', margin: '1rem auto', cursor: "pointer"}} >
            <CardHeader
                title={post.title}
            />
            <CardContent sx={{ margin: 'auto'}}>
                <Typography paragraph>
                {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
                </Typography>
            </CardContent>
        </Card>
  );
}