import { useEffect, useState } from "react"
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { getAllImagePosts } from "../api/imagePosts";
import profile from "../images/profile.png";
import styled from "styled-components";

export default function Landing() {
  const [imagePosts, setImagePosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState({});
  
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const resPosts = await getAllImagePosts();
      setImagePosts(resPosts.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (postId) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Grid container>
        {loading ? <Grid size={12} sx={{ textAlign: "center" }}>Loading posts...</Grid> :

        <Grid container size={12} sx={{ padding: "0 100px" }}>
          {imagePosts.map((post, i) => (
            <Grid key={i} size={12} sx={{ display: "flex", justifyContent: "center" }}>
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
                      <Typography variant="body1" fontWeight="bold" fontSize="20px">{post.username}</Typography>
                      <Typography variant="caption" color="textSecondary">{new Date(post.createdAt).toLocaleDateString()}</Typography>
                    </Grid>
                  </Grid>
                  <Grid size={12} sx={{ marginTop: "20px" }}>
                    <Typography variant="caption" fontSize="16px">{post.caption}</Typography>
                  </Grid>
                </CardContent>
                <CardMedia
                  component="img"
                  height="630"
                  image={post.imageUrl}
                  alt={post.caption}
                />
                <Grid size={12} sx={{ display: "flex", textAlign: "center", alignItems: "center" }}>
                  <ActionsGrid onClick={() => handleLike(i)} size={4}>
                    <Typography sx={{ color: likes[i] ? "blue" : "inherit", fontWeight: likes[i] ? "bold" : "inherit" }} variant="caption" color="textSecondary" fontSize="14px">Like</Typography>
                  </ActionsGrid>
                  <ActionsGrid size={4}>
                    <Typography variant="caption" color="textSecondary" fontSize="14px">Comments</Typography>
                  </ActionsGrid>
                  <ActionsGrid size={4}>
                    <Typography variant="caption" color="textSecondary" fontSize="14px">Share</Typography>
                  </ActionsGrid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
        }
      </Grid>
    </>
  )
}

const ActionsGrid = styled(Grid)`
  padding: 20px 0;
  &:hover {
    background: whitesmoke;
    cursor: pointer;
  }
`;