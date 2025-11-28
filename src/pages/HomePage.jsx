// pages/HomePage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { AppBar, Logo, RightNav, LeftNav, NavLink } from '../components/AppBar';
import { Button } from '../components/Button';
import AuthModal from '../components/AuthModal';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState('login'); // 'login' or 'register'
  const navigate = useNavigate();

  const openAuthModal = (type) => {
    setAuthModalType(type);
    setIsAuthModalOpen(true);
  };

  const handleGallery = () => {
    navigate('/gallery');
  }

  return (
    <>
      <AppBar>
        <LeftNav>
          <Logo>Foine</Logo>
          <NavLink onClick = {() => handleGallery()}>Gallery</NavLink>
          <NavLink href="#about">About Us</NavLink>
          <NavLink href="#news">News</NavLink>
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

      <HeroSection>
        <HeroContent>
          <HeroTitle>
            DESIGN
            <br />
            <span>REDEFINED</span>
          </HeroTitle>

          <HeroDescription>
            Discover a vibrant digital gallery where creativity thrives
            and inspiration flows endlessly. This platform connects
            artists and enthusiasts by showcasing a vast collection of
            unique artwork.
          </HeroDescription>

          <HeroActions>
            <Button onClick={() => openAuthModal('register')}>Get Started</Button>
            <Button onClick={() => handleGallery()} variant="outline">View Works</Button>
          </HeroActions>
        </HeroContent>
      </HeroSection>

      <AuthModal
        isOpen={isAuthModalOpen}
        initialType={authModalType}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

const HeroSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    rgba(234, 192, 102, 0.9) 0%,
    rgba(136, 131, 141, 1) 50%
  );
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
    transform-origin: center;
    opacity: 0.7;
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: left;
  color: white;
  max-width: 550px;
`;

const HeroTitle = styled.h1`
  font-size: 4.2rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -1px;

  span {
    /* color: #FFA500; */
  }

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.95;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export default HomePage;
