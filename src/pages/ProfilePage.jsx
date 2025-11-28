import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AppBar, Logo, Nav, RightNav } from '../components/AppBar';
import { Button } from '../components/Button';
import ProfileHeader from '../components/ProfileHeader';
import ProfileNav from '../components/ProfileNav';
import PostGrid from '../components/PostGrid';
import { logout, getUserFromToken } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userData = getUserFromToken();
//     if (!userData) {
//       navigate('/');
//       return;
//     }
//     setUser(userData);
//   }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock user data - replace with actual user data from your API
  const profileData = {
    username: user?.username || 'artist123',
    bio: "digital artist | coffee lover | travel enthusiast",
    stats: {
      posts: 24,
      followers: 1542,
      following: 283,
      likes: 4289 // Added likes count
    },
    isOwnProfile: true
  };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

  return (
    <>
      <AppBar>
        <Logo>Foine</Logo>
        <RightNav>
          <Button variant="text" onClick={() => navigate('/landing')}>
            Gallery
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </RightNav>
      </AppBar>

      <ProfileContainer>
        <ProfileHeader {...profileData} />
        <ProfileNav activeTab={activeTab} onTabChange={setActiveTab} />
        <TabContent>
          {activeTab === 'posts' && <PostGrid type="posts" />}
          {activeTab === 'saves' && <PostGrid type="saves" />}
        </TabContent>
      </ProfileContainer>
    </>
  );
};

export default ProfilePage;

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: white;
  padding-top: 1rem;
`;

const TabContent = styled.div`
  min-height: 400px;
`;