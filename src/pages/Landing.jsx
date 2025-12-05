import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, logout, setAuthToken } from "../api/auth";
import { AppBar, LeftNav, Logo, RightNav } from "../components/AppBar";
import { Button } from "../components/Button";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { getAllImagePosts } from "../api/imagePosts";

export default function Landing() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [imagePosts, setImagePosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuthToken();

    const fetchUser = async () => {
      try {

        const resUser = await getCurrentUser();
        setUsername(resUser.username);
      
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    }

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
    }

    fetchUser();
    fetchPosts();

  }, [navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");

  }

  return (
    <>
      <Grid container>
        <Grid item size={12}>
          <AppBar>
            <LeftNav>
              <Logo>Foine</Logo>
              <NavLink>Gallery</NavLink>
            </LeftNav>
            <RightNav>
              <h4>{username}</h4>
              <Button variant="text" onClick={handleLogout}>Logout</Button>
            </RightNav>
          </AppBar>
        </Grid>

        {loading ? <Grid size={12} sx={{ textAlign: "center" }}>Loading posts...</Grid> :

        <Grid container size={12} sx={{ padding: "0 100px" }}>
          {imagePosts.map((post, i) => (
            <Grid size={4} sx={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ width: "400px", margin: "20px" }}>
                <CardMedia
                  component="img"
                  height="400"
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