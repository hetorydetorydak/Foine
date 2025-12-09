import { useEffect, useState } from "react";
import { Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import profile from "../images/profile.png";
import { getAllImagePosts } from "../api/imagePosts";
import { toggleLike, getLikeStatus } from "../api/like";
import { getCommentsByPost, addComment } from "../api/comment";

export default function Landing() {
  const [imagePosts, setImagePosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const resPosts = await getAllImagePosts();
      const posts = resPosts.data;

      // Fetch likes and comments for each post
      const postsWithExtras = await Promise.all(
        posts.map(async (post) => {
          const resLike = await getLikeStatus(post.id);
          const likeState = {
            liked: resLike.data.likedByCurrentUser,
            count: resLike.data.likeCount,
          };

          const resComments = await getCommentsByPost(post.id);
          const comments = resComments.data || [];

          return { ...post, likeState, comments, newComment: "" };
        })
      );

      setImagePosts(postsWithExtras);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await toggleLike(postId);
      setImagePosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, likeState: { liked: res.data.likedByCurrentUser, count: res.data.likeCount } }
            : p
        )
      );
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  const handleCommentSubmit = async (postId, commentText) => {
    console.log(postId);
    if (!commentText) return;
    try {
      await addComment(postId, commentText);
      const res = await getCommentsByPost(postId);
      setImagePosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, comments: res.data, newComment: "" } : p))
      );
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Grid container>
      {loading ? (
        <Grid item size={12} sx={{ textAlign: "center" }}>
          Loading posts...
        </Grid>
      ) : (
        <Grid container sx={{ padding: "0 100px" }}>
          {imagePosts.map((post) => (
            <Grid size={12} key={post.id} sx={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ width: "630px", margin: "20px" }}>
                {/* Post Header */}
                <CardContent>
                  <Grid sx={{ display: "flex" }}>
                    <CardMedia
                      component="img"
                      sx={{ width: "50px", height: "50px", marginRight: "10px" }}
                      image={profile}
                      alt="profile"
                    />
                    <Grid sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="body1" fontWeight="bold" fontSize="20px">
                        {post.username}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid sx={{ marginTop: "20px" }}>
                    <Typography variant="caption" fontSize="16px">
                      {post.caption}
                    </Typography>
                  </Grid>
                </CardContent>

                {/* Post Image */}
                <CardMedia component="img" height="630" image={post.imageUrl} alt={post.caption} />

                {/* Action Items */}
                <Grid sx={{ display: "flex", textAlign: "center", alignItems: "center" }}>
                  <Grid sx={{ padding: "20px 0", width: "25%" }}>
                    <Typography variant="caption">{post.likeState.count} likes</Typography>
                  </Grid>
                  <ActionsGrid onClick={() => handleLike(post.id)} sx={{ width: "25%" }}>
                    <Typography
                      variant="caption"
                      fontSize="14px"
                      sx={{
                        color: post.likeState.liked ? "blue" : "inherit",
                        fontWeight: post.likeState.liked ? "bold" : "inherit",
                      }}
                    >
                      Like
                    </Typography>
                  </ActionsGrid>
                  <ActionsGrid sx={{ width: "25%" }}>
                    <Typography variant="caption" color="textSecondary" fontSize="14px">
                      Comments
                    </Typography>
                  </ActionsGrid>
                  <ActionsGrid sx={{ width: "25%" }}>
                    <Typography variant="caption" color="textSecondary" fontSize="14px">
                      Share
                    </Typography>
                  </ActionsGrid>
                </Grid>

                {/* Comments Section */}
                <Grid sx={{ padding: "10px 20px" }}>
                  {post.comments.length > 0 ? (
                    post.comments.map((c) => (
                      <Grid sx={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                        <Grid item sx={{ display: "flex" }}>
                          <CardMedia
                            component="img"
                            sx={{ width: "40px", height: "40px", marginRight: "10px" }}
                            image={profile}
                            alt="profile"
                          />
                          <Typography key={c.id} variant="body2" sx={{ marginBottom: "4px" }}>
                            <Grid>
                              <strong>{c.username}</strong>
                            </Grid>
                            <Grid>
                              <Typography variant="caption" color="textSecondary">
                                ({new Date(c.createdAt).toLocaleDateString()})
                              </Typography>
                            </Grid>
                          </Typography>
                        </Grid>
                        <Typography variant="subtitle2" margin="0 50px">
                          {c.comment}
                        </Typography>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No comments yet.
                    </Typography>
                  )}

                  {/* Add comment input */}
                  <Grid sx={{ display: "flex", margin: "10px 0" }}>
                    <TextField
                      variant="filled"
                      type="text"
                      placeholder="Add a comment..."
                      value={post.newComment}
                      onChange={(e) =>
                        setImagePosts((prev) =>
                          prev.map((p) => (p.id === post.id ? { ...p, newComment: e.target.value } : p))
                        )
                      }
                      style={{ flex: 1 }}
                    />
                    <Button variant="outlined"
                      onClick={() => handleCommentSubmit(post.id, post.newComment)}
                      style={{ marginLeft: "5px", padding: "5px 10px" }}
                    >
                      Post
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
}

const ActionsGrid = styled(Grid)`
  padding: 20px 0;
  &:hover {
    background: whitesmoke;
    cursor: pointer;
  }
`;
