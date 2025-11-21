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
            <WelcomeTitle>{activeTab === "login" ? "Welcome Back Creative!" : "Join Our Creative Community!"}</WelcomeTitle>
            <WelcomeSubtitle>{activeTab === "login" ? "We Are Happy To See You Again" : "Start Your Artistic Journey With Us"}</WelcomeSubtitle>
          </WelcomeSection>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>

        <TabContainer>
          <TabButton $active={activeTab === "login"} onClick={() => setActiveTab("login")}>Sign In</TabButton>
          <TabButton $active={activeTab === "register"} onClick={() => setActiveTab("register")}>Sign Up</TabButton>
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
  color: #003B5C;
  animation: ${props => props.$isClosing ? slideOutToRight : slideInFromRight} 0.3s ease;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

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
  border-bottom: 1px solid #eee;
`;

const WelcomeSection = styled.div`flex: 1;`;
const WelcomeTitle = styled.h2`
  font-size:1.5rem; 
  font-weight:700;
  margin-bottom:0.5rem; 
  color:#003B5C;
`;
const WelcomeSubtitle = styled.p`
  color:#666; 
  font-size:0.9rem;

`;
const CloseButton = styled.button`
  background:none; 
  border:none; 
  font-size:2rem; 
  cursor:pointer; 
  color:#666; l
  ine-height:1; 
  padding:0; 
  width:30px; 
  height:30px;
  display:flex; 
  align-items:center; 
  justify-content:center;

  &:hover { 
    color:#003B5C; 
  }
`;

const TabContainer = styled.div`
  display:flex; 
  border:2px solid #003B5C; 
  border-radius:50px; 
  overflow:hidden; 
  margin:1.5rem 2.5rem 0;
`;

const TabButton = styled.button`
  flex:1; padding:0.8rem; 
  border:none; 
  cursor:pointer; 
  font-weight:600;
  background: ${props => props.$active ? '#0a1e23' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#0a1e23'};
  transition: all 0.3s ease;
  
  &:hover { 
    background: ${props => props.$active ? '#0a1e23' : '#f0f4f8'}; 
  }
`;
