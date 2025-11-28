import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = ({ 
  profilePicture, 
  username, 
  bio, 
  stats = {},
  isOwnProfile = false 
}) => {
  const { posts = 0, followers = 0, following = 0, likes = 0 } = stats;
  const navigate = useNavigate();
  const handleEditProfile = () => {
    navigate('/edit-profile');
  }
  return (
    <HeaderContainer>
      <ProfileSection>
        <ProfileImage>
          {profilePicture ? (
            <img src={profilePicture} alt={username} />
          ) : (
            <BlankProfile>
              <UserIcon>👤</UserIcon>
            </BlankProfile>
          )}
        </ProfileImage>
        
        <ProfileInfo>
          <UsernameSection>
            <Username>@{username}</Username>
            {isOwnProfile ? (
              <ActionButtons>
                <Button onClick={handleEditProfile}>Edit Profile</Button>
              </ActionButtons>
            ) : (
              <ActionButtons>
                <Button>Follow</Button>
                <Button variant="outline">Message</Button>
              </ActionButtons>
            )}
          </UsernameSection>
          
          <StatsSection>
            <Stat>
              <StatNumber>{posts}</StatNumber>
              <StatLabel>posts</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>{followers}</StatNumber>
              <StatLabel>followers</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>{following}</StatNumber>
              <StatLabel>following</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>{likes}</StatNumber>
              <StatLabel>likes</StatLabel>
            </Stat>
          </StatsSection>
          
          <BioSection>
            <DisplayName>{username}</DisplayName>
            <BioText>{bio || "No bio yet."}</BioText>
          </BioSection>
        </ProfileInfo>
      </ProfileSection>
    </HeaderContainer>
  );
};

export default ProfileHeader;

const HeaderContainer = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 1rem;
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  max-width: 935px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    gap: 2rem;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ProfileImage = styled.div`
  flex-shrink: 0;
  
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #dbdbdb;
  }
`;

const BlankProfile = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #f0f0f0;
  border: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserIcon = styled.span`
  font-size: 3rem;
  opacity: 0.5;
`;

const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const UsernameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Username = styled.h1`
  font-size: 1.75rem;
  font-weight: 300;
  color: #262626;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const StatsSection = styled.div`
  display: flex;
  gap: 2rem;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const StatNumber = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color: #262626;
`;

const StatLabel = styled.span`
  font-size: 1rem;
  color: #262626;
`;

const BioSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DisplayName = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #262626;
  margin: 0;
`;

const BioText = styled.p`
  font-size: 0.9rem;
  color: #262626;
  line-height: 1.4;
  margin: 0;
  max-width: 400px;
  white-space: pre-line;
`;