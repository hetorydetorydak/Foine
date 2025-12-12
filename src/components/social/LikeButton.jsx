import React, { useState, useEffect } from 'react';
import { IconButton, Typography, Box, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { toggleLike, getLikeStatus } from '../../api/index';
import { useAuth } from '../../contexts/AuthContext';

const LikeButton = ({ postId, initialLiked = false, initialCount = 0 }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLikeStatus();
  }, [postId]);

  const fetchLikeStatus = async () => {
    if (!user) return;
    
    try {
      const response = await getLikeStatus(postId);
      setLiked(response.data.likedByCurrentUser);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error('Failed to fetch like status:', error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert('Please login to like artworks');
      return;
    }

    setLoading(true);
    try {
      const response = await toggleLike(postId);
      setLiked(response.data.likedByCurrentUser);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title={liked ? "Unlike" : "Like"}>
        <IconButton 
          aria-label="like" 
          onClick={handleLike}
          disabled={loading}
          color={liked ? "error" : "default"}
        >
          {liked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Tooltip>
      <Typography variant="body2" color="text.secondary">
        {likeCount} {likeCount === 1 ? 'like' : 'likes'}
      </Typography>
    </Box>
  );
};

export default LikeButton;