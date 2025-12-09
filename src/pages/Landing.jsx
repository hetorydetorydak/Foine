import { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { getAllImagePosts } from "../api/imagePosts";
import profile from "../images/profile.png";
import styled from "styled-components";
import { toggleLike, getLikeStatus } from "../api/like";

export default function Landing() {
  const [imagePosts, setImagePosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //  Stores like status PER POST
  const [likeMap, setLikeMap] = useState({});

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const resPosts = await getAllImagePosts();
      const posts = resPosts.data;
      setImagePosts(posts);

      //  Load like status for each post
      const likeStates = {};
      for (const post of posts) {
        const res = await getLikeStatus(post.id);
        likeStates[post.id] = {
          liked: res.data.likedByCurrentUser,
          count: res.data.likeCount,
        };
      }
      setLikeMap(likeStates);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await toggleLike(postId);

      //  Update UI instantly
      setLikeMap((prev) => ({
        ...prev,
        [postId]: {
          liked: res.data.likedByCurrentUser,
          count: res.data.likeCount,
        },
      }));

    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Grid container>
      {loading ? (
        <Grid size={12} sx={{ textAlign: "center" }}>
          Loading posts...
        </Grid>
      ) : (
        <Grid container size={12} sx={{ padding: "0 100px" }}>
          {imagePosts.map((post) => {
            const likeState = likeMap[post.id] || { liked: false, count: 0 };
            console.log(post.id + " ");

            return (
              <Grid key={post.id} size={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Card sx={{ width: "630px", margin: "20px" }}>
                  <CardContent>
                    <Grid size={12} sx={{ display: "flex" }}>
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

                    <Grid size={12} sx={{ marginTop: "20px" }}>
                      <Typography variant="caption" fontSize="16px">
                        {post.caption}
                      </Typography>
                    </Grid>
                  </CardContent>

                  <CardMedia
                    component="img"
                    height="630"
                    image={post.imageUrl}
                    alt={post.caption}
                  />

                  {/* ACTION BAR */}
                  <Grid size={12} sx={{ display: "flex", textAlign: "center", alignItems: "center" }}>
                    <Grid size={1.5}>
                      <Typography variant="caption" color="textSecondary" fontSize="14px">
                        {likeState.count} likes
                      </Typography>
                    </Grid>
                    <ActionsGrid onClick={() => handleLike(post.id)} size={3.5}>
                      <Typography
                        variant="caption"
                        fontSize="14px"
                        sx={{
                          color: likeState.liked ? "blue" : "inherit",
                          fontWeight: likeState.liked ? "bold" : "inherit",
                        }}
                      >
                      Like
                      </Typography>
                    </ActionsGrid>

                    <ActionsGrid size={3.5}>
                      <Typography variant="caption" color="textSecondary" fontSize="14px">
                        Comments
                      </Typography>
                    </ActionsGrid>

                    <ActionsGrid size={3.5}>
                      <Typography variant="caption" color="textSecondary" fontSize="14px">
                        Share
                      </Typography>
                    </ActionsGrid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
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
