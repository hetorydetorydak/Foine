import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Collapse,
  Avatar,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Comment,
  Share,
  MoreVert,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { toggleLike } from '../../api/index';
import { useAuth } from '../../contexts/AuthContext';
import CommentSection from '../social/CommentSection';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ArtworkCard = ({ artwork }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleLike = async () => {
    if (!user) {
      alert('Please login to like artworks');
      return;
    }
    try {
      const response = await toggleLike(artwork.id);
      setLiked(response.data.likedByCurrentUser);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardMedia
        component="img"
        height="auto"
        image={artwork.imageUrl}
        alt={artwork.caption}
        sx={{ objectFit: 'cover', cursor: 'pointer' }}
      />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
            {artwork.username?.[0]?.toUpperCase()}
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            {artwork.username}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="caption" color="text.secondary">
            {new Date(artwork.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.primary" paragraph>
          {artwork.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={handleLike}>
          {liked ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
        <Typography variant="body2" sx={{ mr: 2 }}>
          {likeCount}
        </Typography>
        <IconButton aria-label="comment" onClick={handleExpandClick}>
          <Comment />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentSection postId={artwork.id} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ArtworkCard;