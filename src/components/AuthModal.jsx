// components/AuthModal.jsx
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { LoginForm, RegisterForm } from "./Form";

const slideInFromRight = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideOutToRight = keyframes`
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
`;

const AuthModal = ({ isOpen, initialType = "login", onClose }) => {
  const [activeTab, setActiveTab] = useState(initialType);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialType);
      setIsClosing(false);
    }
  }, [isOpen, initialType]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isOpen && !isClosing) return null;

  return (
    <ModalOverlay onClick={handleOverlayClick} $isClosing={isClosing}>
      <ModalContent $isClosing={isClosing}>
        <ModalHeader>
          <WelcomeSection>
            <WelcomeTitle>{activeTab === "login" ? "Welcome Back to Your Gallery" : "Join Our Artistic Community"}</WelcomeTitle>
            <WelcomeSubtitle>{activeTab === "login" ? "Continue Your Creative Journey" : "Begin Showcasing Your Artwork"}</WelcomeSubtitle>
          </WelcomeSection>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>

        <TabContainer>
          <TabButton $active={activeTab === "login"} onClick={() => setActiveTab("login")}>Sign In</TabButton>
          <TabButton $active={activeTab === "register"} onClick={() => setActiveTab("register")}>Join Now</TabButton>
        </TabContainer>

        {activeTab === "login" ? <LoginForm onSuccess={handleClose} /> : <RegisterForm onSuccess={handleClose} />}
      </ModalContent>
    </ModalOverlay>
  );
};

export default AuthModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 1000;
  animation: ${props => props.$isClosing ? slideOutToRight : 'none'} 0.3s ease;
`;

const ModalContent = styled.div`
  width: 50%; min-width: 420px; max-width: 600px;
  height: -webkit-fill-available;
  padding: 20px 50px;
  background: white;
  border-radius: 24px;
  color: #3E2723;
  background: #FFFFFF;
  animation: ${props => props.$isClosing ? slideOutToRight : slideInFromRight} 0.3s ease;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(93, 64, 55, 0.2);

  @media (max-width: 768px) {
    width: 85%;
    min-width: 320px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2.5rem 2.5rem 1.5rem;
  border-bottom: 1px solid rgba(93, 64, 55, 0.1);
`;

const WelcomeSection = styled.div`
  flex: 1;
`;

const WelcomeTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem; 
  font-weight: 700;
  margin-bottom: 0.5rem; 
  color: #3E2723;
  letter-spacing: 0.02em;
`;

const WelcomeSubtitle = styled.p`
  color: #8D6E63; 
  font-size: 1rem;
  font-family: 'Lora', serif;
  font-style: italic;
`;

const CloseButton = styled.button`
  background: none; 
  border: none; 
  font-size: 2rem; 
  cursor: pointer; 
  color: #8D6E63; 
  line-height: 1; 
  padding: 0; 
  width: 30px; 
  height: 30px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover { 
    color: #3E2723;
    background: rgba(93, 64, 55, 0.1);
  }
`;

const TabContainer = styled.div`
  display: flex; 
  border: 2px solid #5D4037; 
  border-radius: 50px; 
  overflow: hidden; 
  margin: 1.5rem 2.5rem 0;
`;

const TabButton = styled.button`
  flex: 1; 
  padding: 0.8rem; 
  border: none; 
  cursor: pointer; 
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  background: ${props => props.$active ? '#5D4037' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#5D4037'};
  transition: all 0.3s ease;
  
  &:hover { 
    background: ${props => props.$active ? '#3E2723' : 'rgba(93, 64, 55, 0.1)'}; 
  }
`;