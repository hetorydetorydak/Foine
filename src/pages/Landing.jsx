import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AppBar, Logo, Nav } from "../components/AppBar";
import { Button } from "../components/Button";
import { logout } from "../api/auth";
import { createImagePost, getImagePosts } from "../api/imagePosts";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  // Tab state: 'create' or 'public'
  const [tab, setTab] = useState("create");

  // Create form state
  const [caption, setCaption] = useState("");
  const [userId, setUserId] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Posts state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // always fetch public posts on mount
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await getImagePosts();
      setPosts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch posts", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please choose an image file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("userId", userId);
    formData.append("file", file);

    try {
      await createImagePost(formData);
      setCaption("");
      setUserId("");
      setFile(null);
      setPreview(null);
      // refresh posts
      setTab("public");
      fetchPosts();
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed: " + (err.response?.data || err.message));
    }
  }

  return (
    <>
      <AppBar>
        <Logo>Foine</Logo>
        <Nav>
          <Button variant="text" onClick={() => navigate('/profile')}>Profile</Button>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </Nav>
      </AppBar>

      <Container>
        <Tabs>
          <Tab active={tab === "create"} onClick={() => setTab("create")}>Create Post</Tab>
          <Tab active={tab === "public"} onClick={() => setTab("public")}>Public Posts</Tab>
        </Tabs>

        {tab === "create" && (
          <Form onSubmit={handleCreatePost}>
            <label>
              Caption
              <input value={caption} onChange={(e) => setCaption(e.target.value)} />
            </label>
            <label>
              User ID
              <input value={userId} onChange={(e) => setUserId(e.target.value)} />
            </label>
            <label>
              Image File
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>

            {preview && <Preview src={preview} alt="preview" />}

            <Button type="submit">Upload</Button>
          </Form>
        )}

        {tab === "public" && (
          <div>
            {loading && <p>Loading posts...</p>}
            {!loading && posts.length === 0 && <p>No public posts yet.</p>}

            <PostList>
              {posts.map((p) => (
                <PostCard key={p.id || p._id}>
                  {p.imageUrl || p.url || p.fileUrl ? (
                    <PostImage src={p.imageUrl || p.url || p.fileUrl} alt={p.caption} />
                  ) : null}
                  <PostCaption>{p.caption}</PostCaption>
                  <PostMeta>by {p.userId || p.username || "anonymous"}</PostMeta>
                </PostCard>
              ))}
            </PostList>
          </div>
        )}
      </Container>
    </>
  )
}

const WelcomeMessage = styled.div`
  border: 1px solid black;
  height: 100vh;
  text-align: center;
  align-content: center;
  font-size: 25px;
  font-weight: bold;
`

const Container = styled.div`
  padding: 4rem 2rem 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Tabs = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 1rem;
`;

const Tab = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: ${(p) => (p.active ? "#003B5C" : "#f0f4f8")} ;
  color: ${(p) => (p.active ? "white" : "#003B5C")};
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 600px;
`;

const Preview = styled.img`
  max-width: 250px;
  border-radius: 8px;
`;

const PostList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`;

const PostCard = styled.div`
  background: white;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const PostCaption = styled.p`
  font-weight: 600;
`;

const PostMeta = styled.div`
  font-size: 12px;
  color: #666;
`;