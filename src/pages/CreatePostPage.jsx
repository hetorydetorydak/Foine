import { Grid, Typography } from "@mui/material";
import CreatePost from "../components/CreatePost";
import { useEffect } from "react";
import { getAllImagePosts } from "../api/imagePosts";

export default function CreatePostPage() {

    const fetchPosts = async () => {
        const posts = await getAllImagePosts();
        return posts.data;
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            <Grid container sx={{ display: "flex", flexDirection: "column", textAlign: "center", marginTop: "150px" }}>
                <h1 style={{ marginBottom: "20px" }}>Create a Post</h1>
                <h5>Share your art to the world and be known.</h5>
                <Grid sx={{ marginTop: "50px" }}>
                    <CreatePost onPostCreated={fetchPosts} />
                </Grid>
            </Grid>
        </>
    )
}