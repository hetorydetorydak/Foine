import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { addComment } from '../../api/index';
import { useAuth } from '../../contexts/AuthContext';

const CommentForm = ({ postId, onCommentAdded }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please login to comment');
      return;
    }

    if (!comment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addComment(postId, comment);
      setComment('');
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (err) {
      setError('Failed to post comment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Box sx={{ py: 2, textAlign: 'center' }}>
        <Button 
          variant="outlined" 
          onClick={() => alert('Please login to comment')}
        >
          Login to comment
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <Avatar
          sx={{ width: 40, height: 40 }}
          src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
        />
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setError('');
            }}
            error={!!error}
            helperText={error}
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
              disabled={!comment.trim() || loading}
              sx={{ borderRadius: 2 }}
            >
              {loading ? 'Posting...' : 'Post Comment'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentForm;