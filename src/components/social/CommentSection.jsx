import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
} from '@mui/material';
import { getCommentsByPost } from '../../api/index';
import CommentForm from './CommentForm';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await getCommentsByPost(postId);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: 'rgba(253, 246, 239, 0.7)',
      borderRadius: 3,
      p: 2,
      boxShadow: '0 4px 20px rgba(93, 64, 55, 0.1)'
    }}>
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 600,
          color: '#3E2723',
          mb: 2
        }}
      >
        Comments ({comments.length})
      </Typography>
      
      <CommentForm postId={postId} onCommentAdded={fetchComments} />
      
      <List>
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <ListItem alignItems="flex-start" sx={{ py: 2 }}>
              <Avatar 
                sx={{ 
                  mr: 2,
                  backgroundColor: '#D81B60',
                  color: '#FFFFFF',
                  fontWeight: 600
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
                      {new Date(comment.createdAt).toLocaleString()}
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
      </List>
      
      {comments.length === 0 && !loading && (
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
    </Box>
  );
};

export default CommentSection;