import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Avatar,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import {
  Close,
  Favorite,
  FavoriteBorder,
  ArrowUpward,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';
import { getLikeStatus, toggleLike, getCommentsByPost, addComment } from '../../api/index';

const ModalContainer = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '90%',
    maxWidth: '1200px',
    height: '90vh',
    maxHeight: '800px',
    borderRadius: '20px',
    overflow: 'hidden',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#333',
  padding: 0,
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    minHeight: '300px',
  },
}));

const ArtworkImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 0,
  boxShadow: 'none',
});

const LikeCountChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  bottom: '24px',
  left: '24px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  '& .MuiChip-label': {
    fontWeight: 600,
    color: '#3E2723',
  },
  zIndex: 10,
}));

const DetailContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const AuthorSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CommentsSection = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
}));

const CommentInputSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const ArtworkDetailModal = ({ open, onClose, artwork }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(artwork?.likeCount || 0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    if (open && artwork) {
      fetchLikeStatus();
      fetchComments();
    }
  }, [open, artwork?.id]);

  const fetchLikeStatus = async () => {
    try {
      const response = await getLikeStatus(artwork.id);
      setLiked(response.data.likedByCurrentUser);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error('Failed to fetch like status:', error);
    }
  };

  const fetchComments = async () => {
    try {
      setCommentsLoading(true);
      const response = await getCommentsByPost(artwork.id);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

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

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to comment');
      return;
    }

    if (!comment.trim()) {
      return;
    }

    setLoading(true);
    try {
      await addComment(artwork.id, comment);
      setComment('');
      fetchComments(); // Refresh comments
    } catch (error) {
      console.error('Failed to post comment:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!artwork) return null;

  return (
    <ModalContainer open={open} onClose={onClose} maxWidth="lg">
      <DialogContent sx={{ 
        display: 'flex', 
        padding: 0,
        height: '100%',
        [theme => theme.breakpoints.down('md')]: {
          flexDirection: 'column',
        },
      }}>
        <ImageContainer>
          <ArtworkImage 
            src={artwork.imageUrl} 
            alt={artwork.caption} 
          />
          <LikeCountChip 
            label={`${likeCount} likes`} 
            variant="filled" 
          />
        </ImageContainer>
        
        <DetailContainer>
          <AuthorSection>
            <Avatar sx={{ 
              bgcolor: 'secondary.main', 
              width: 50, 
              height: 50,
              fontSize: '1.2rem',
              fontWeight: 600,
            }}>
              {artwork.username?.[0]?.toUpperCase()}
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {artwork.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(artwork.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </AuthorSection>
          
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" color="text.primary" paragraph sx={{ fontStyle: 'italic' }}>
              "{artwork.caption}"
            </Typography>
          </Box>
          
          <CommentsSection>
            {commentsLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <List>
                {comments.map((comment) => (
                  <React.Fragment key={comment.id}>
                    <ListItem alignItems="flex-start" sx={{ py: 1 }}>
                      <Avatar 
                        sx={{ 
                          mr: 2,
                          width: 32,
                          height: 32,
                          backgroundColor: '#D81B60',
                          color: '#FFFFFF',
                          fontWeight: 600,
                          fontSize: '0.8rem'
                        }}
                      >
                        {comment.username?.[0]?.toUpperCase()}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography 
                              variant="subtitle2"
                              sx={{
                                fontWeight: 600,
                                color: '#5D4037'
                              }}
                            >
                              {comment.username}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{
                                fontStyle: 'italic'
                              }}
                            >
                              {new Date(comment.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            sx={{
                              fontFamily: '"Lora", serif',
                              mt: 0.5,
                              display: 'block'
                            }}
                          >
                            {comment.comment}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" sx={{ borderColor: 'rgba(93, 64, 55, 0.1)' }} />
                  </React.Fragment>
                ))}
                
                {comments.length === 0 && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    align="center" 
                    py={2}
                    sx={{
                      fontFamily: '"Lora", serif',
                      fontStyle: 'italic'
                    }}
                  >
                    No comments yet. Be the first to comment!
                  </Typography>
                )}
              </List>
            )}
          </CommentsSection>
          
          <CommentInputSection>
            {user ? (
              <Box component="form" onSubmit={handleAddComment} sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton 
                  onClick={handleLike}
                  sx={{ 
                    color: liked ? '#D81B60' : 'inherit',
                    mr: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(216, 27, 96, 0.1)'
                    }
                  }}
                >
                  {liked ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <Box sx={{ flexGrow: 1, position: 'relative' }}>
                  <input
                    placeholder="Share your thoughts on this artwork..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '12px 40px 12px 12px',
                      borderRadius: '50px',
                      border: '1px solid rgba(93, 64, 55, 0.3)',
                      fontFamily: '"Lora", serif',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: 'transparent',
                      color: 'inherit',
                    }}
                  />
                  <IconButton
                    type="submit"
                    disabled={!comment.trim() || loading}
                    sx={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: '#5D4037',
                      color: '#FFFFFF',
                      width: '28px',
                      height: '28px',
                      '&:hover': {
                        backgroundColor: '#3E2723',
                      },
                      '&:disabled': {
                        backgroundColor: 'rgba(93, 64, 55, 0.5)',
                        color: '#FFFFFF',
                      },
                    }}
                  >
                    <ArrowUpward sx={{ fontSize: '16px' }} />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              <Box sx={{ py: 2, textAlign: 'center' }}>
                <button 
                  onClick={() => alert('Please login to comment')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '50px',
                    backgroundColor: 'transparent',
                    color: '#5D4037',
                    fontWeight: 600,
                    fontFamily: '"Montserrat", sans-serif',
                    border: '1px solid #5D4037',
                    cursor: 'pointer',
                  }}
                >
                  Login to comment
                </button>
              </Box>
            )}
          </CommentInputSection>
        </DetailContainer>
      </DialogContent>
    </ModalContainer>
  );
};

export default ArtworkDetailModal;