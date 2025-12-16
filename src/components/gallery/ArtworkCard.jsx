import React, { useState, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Comment as CommentIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';
import { getLikeStatus, toggleLike, getCommentsByPost } from '../../api/index';
import ArtworkDetailModal from './ArtworkDetailModal';

// Styled components for art-themed design
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: '100%',
  borderRadius: 20,
  boxShadow: theme.palette.mode === 'light' 
    ? '0 8px 30px rgba(93, 64, 55, 0.12)' 
    : '0 8px 30px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.palette.mode === 'light' 
      ? '0 12px 40px rgba(93, 64, 55, 0.18)' 
      : '0 12px 40px rgba(0, 0, 0, 0.4)',
  },
  className: 'artwork-card',
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  objectFit: 'cover',
  cursor: 'pointer',
  borderBottom: theme.palette.mode === 'light' 
    ? '1px solid rgba(93, 64, 55, 0.1)' 
    : '1px solid rgba(255, 255, 255, 0.1)',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: theme.palette.secondary.main,
  color: '#FFFFFF',
  fontSize: '1rem',
  fontWeight: 600,
}));

const ArtworkCard = ({ artwork }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(artwork.likeCount || 0);
  const [commentCount, setCommentCount] = useState(artwork.commentCount || 0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchLikeStatus();
    fetchCommentCount();
  }, [artwork.id]);

  const fetchLikeStatus = async () => {
    try {
      const response = await getLikeStatus(artwork.id);
      setLiked(response.data.likedByCurrentUser);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error('Failed to fetch like status:', error);
    }
  };

  const fetchCommentCount = async () => {
    try {
      const response = await getCommentsByPost(artwork.id);
      setCommentCount(response.data.length);
    } catch (error) {
      console.error('Failed to fetch comment count:', error);
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();
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

  const handleCardClick = () => {
    if (user) {
      setModalOpen(true);
    }
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    if (user) {
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <StyledCard onClick={handleCardClick}>
        <StyledCardMedia
          component="img"
          height="auto"
          image={artwork.imageUrl}
          alt={artwork.caption}
        />
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <StyledAvatar>
              {artwork.username?.[0]?.toUpperCase()}
            </StyledAvatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {artwork.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(artwork.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
          </Box>
          <Typography variant="body1" color="text.primary" paragraph sx={{ fontStyle: 'italic' }}>
            "{artwork.caption}"
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ pl: 2, pr: 2, pb: 2 }}>
          {user && (
            <>
              <IconButton 
                aria-label="like" 
                onClick={handleLike}
                sx={{ 
                  color: liked ? '#D81B60' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'rgba(216, 27, 96, 0.1)'
                  }
                }}
              >
                {liked ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              <Typography variant="body2" sx={{ mr: 2, color: liked ? '#D81B60' : 'inherit' }}>
                {likeCount}
              </Typography>
              <IconButton 
                aria-label="comment" 
                onClick={handleCommentClick}
                sx={{ 
                  '&:hover': {
                    backgroundColor: 'rgba(93, 64, 55, 0.1)'
                  }
                }}
              >
                <CommentIcon />
              </IconButton>
              <Typography variant="body2" sx={{ mr: 2 }}>
                {commentCount}
              </Typography>
            </>
          )}
          <Box sx={{ flexGrow: 1 }} />
        </CardActions>
      </StyledCard>
      
      {user && (
        <ArtworkDetailModal 
          open={modalOpen} 
          onClose={handleModalClose} 
          artwork={artwork} 
        />
      )}
    </>
  );
};

export default ArtworkCard;