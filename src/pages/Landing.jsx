import { useEffect, useState } from "react"
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { getAllImagePosts } from "../api/imagePosts";

export default function Landing() {
  const [imagePosts, setImagePosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
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

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Grid container>
        {loading ? <Grid size={12} sx={{ textAlign: "center" }}>Loading posts...</Grid> :

        <Grid container size={12} sx={{ padding: "0 100px" }}>
          {imagePosts.map((post, i) => (
            <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ width: "500px", margin: "20px" }}>
                <CardMedia
                  component="img"
                  height="500"
                  image={post.imageUrl}
                  alt={post.caption}
                />
                <CardContent>
                  <Typography variant="body1" fontWeight="bold" fontSize="20px">{post.caption}</Typography>
                  <Grid size={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="subtitle3" color="textSecondary">by {post.username}</Typography>
                    <Typography variant="caption" color="textSecondary">{new Date(post.createdAt).toLocaleDateString()}</Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        }
      </Grid>
    </>
  )
}