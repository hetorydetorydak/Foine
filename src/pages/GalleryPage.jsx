import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AppBar, Logo, RightNav } from "../components/AppBar";
import { Button } from "../components/Button";
import { getAllImagePosts } from "../api/imagePosts";
import { useNavigate } from "react-router-dom";
import { NavLink, LeftNav } from "../components/AppBar";
import AuthModal from '../components/AuthModal';
import { getAllArtists } from "../api/auth";
import profile from "../images/profile.png";
import { Card, CardMedia, Grid, Typography } from "@mui/material";

export default function GalleryPage() {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState('login'); // 'login' or 'register'

  // Posts state
  const [posts, setPosts] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openAuthModal = (type) => {
    setAuthModalType(type);
    setIsAuthModalOpen(true);
  };

  const handleHome = () => {
    navigate('/');
  }


  useEffect(() => {
    fetchPosts();
    fetchArtists();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAllImagePosts();
      setPosts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch posts", err);
      setError("Failed to load gallery posts");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  const fetchArtists = async () => {
    try {
      setLoading(true);
      const res = await getAllArtists();
      console.log(res.data);
      setArtists(res.data || []);
    } catch (err) {
      console.error("Failed to fetch artists", err);
      setArtists([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchPosts();
  }

  return (
    <>
      <AppBar>
        <LeftNav>
          <Logo>Foine</Logo>
          <NavLink onClick={() => handleHome()}href="#gallery">Home</NavLink>
        </LeftNav>

        <RightNav>
          <Button variant="text" onClick={() => openAuthModal('login')}>
            Login
          </Button>
          <Button variant="outline" onClick={() => openAuthModal('register')}>
            Sign up
          </Button>
        </RightNav>
      </AppBar>

      <Container>
        <Header>
          <Title>The Gallery</Title>
          <Subtitle>Discover amazing creations from our community</Subtitle>
          {/* <Button onClick={handleRefresh} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh Gallery"}
          </Button> */}
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {loading && <LoadingMessage>Loading gallery posts...</LoadingMessage>}
        
        {!loading && posts.length === 0 && !error && (
          <EmptyState>
            <EmptyIcon>🖼️</EmptyIcon>
            <EmptyTitle>No public posts yet</EmptyTitle>
            <EmptyText>Be the first to share your work with the community!</EmptyText>
            <Button onClick={() => navigate('/create')}>Create First Post</Button>
          </EmptyState>
        )}

        <GalleryGrid>
          {posts.map((post) => (
            <GalleryCard key={post.id}>
              {(post.imageUrl) ? (
                <GalleryImage 
                  src={post.imageUrl} 
                  alt={post.caption}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : null}
              <ImagePlaceholder style={{ display: 'none' }}>
                <PlaceholderIcon>📷</PlaceholderIcon>
                <PlaceholderText>Image not available</PlaceholderText>
              </ImagePlaceholder>
              
              <CardContent>
                <PostCaption>{post.caption || "Untitled"}</PostCaption>
                <PostMeta>
                  <UserInfo>by {post.username || "anonymous"}</UserInfo>
                  {post.createdAt && (
                    <PostDate>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </PostDate>
                  )}
                </PostMeta>
              </CardContent>
            </GalleryCard>
          ))}
        </GalleryGrid>
        <Header>
          <Title>Featured Artists</Title>
          <Subtitle>Discover talents</Subtitle>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {loading && <LoadingMessage>Loading featured artists...</LoadingMessage>}


        <Grid container size={12}>
          {artists.map((artist, i) => (
            <Grid key={i} size={4} sx={{ display: "flex", justifyContent: "center" }}>
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
                      <Typography variant="body1" fontWeight="bold" fontSize="20px">{artist.username}</Typography>
                      <Typography variant="caption" fontSize="16px">{artist.email}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <AuthModal
        isOpen={isAuthModalOpen}
        initialType={authModalType}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  )
}

const Container = styled.div`
  padding: 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 1px solid #e0e0e0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #003B5C;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.div`
  background: #ffe6e6;
  color: #d63031;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
  border: 1px solid #ffcccc;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const EmptyText = styled.p`
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const GalleryCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 250px;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
`;

const PlaceholderIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 0.5rem;
`;

const PlaceholderText = styled.p`
  font-size: 0.9rem;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const PostCaption = styled.h3`
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #333;
  line-height: 1.4;
  font-size: 1.1rem;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
`;

const UserInfo = styled.span`
  font-size: 0.9rem;
  color: #003B5C;
  font-weight: 500;
`;

const PostDate = styled.span`
  font-size: 0.8rem;
  color: #888;
`;