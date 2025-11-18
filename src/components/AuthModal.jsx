// components/AuthModal.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from './Button';
import { Input } from './Input';

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutToRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const AuthModal = ({ isOpen, initialType = 'login', onClose }) => {
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
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <ModalOverlay onClick={handleOverlayClick} isClosing={isClosing}>
      <ModalContent isClosing={isClosing}>
        <ModalHeader>
          <WelcomeSection>
            <WelcomeTitle>
              {activeTab === 'login' ? 'Welcome Back Creative!' : 'Join Our Creative Community!'}
            </WelcomeTitle>
            <WelcomeSubtitle>
              {activeTab === 'login' 
                ? 'We Are Happy To See You Again' 
                : 'Start Your Artistic Journey With Us'
              }
            </WelcomeSubtitle>
          </WelcomeSection>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>

        <TabContainer>
          <TabButton 
            active={activeTab === 'login'} 
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </TabButton>
          <TabButton 
            active={activeTab === 'register'} 
            onClick={() => setActiveTab('register')}
          >
            Sign Up
          </TabButton>
        </TabContainer>

        {activeTab === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

const LoginForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    // Handle login logic here
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      
      <FormOptions>
        <CheckboxLabel>
          <HiddenCheckbox
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <CustomCheckbox checked={formData.rememberMe}>
            ✓
          </CustomCheckbox>
          <span>Remember me</span>
        </CheckboxLabel>
        <ForgotPassword href="#">Forgot password?</ForgotPassword>
      </FormOptions>

      <Button type="submit">Sign In</Button>

      <Divider>
        <span>OR</span>
      </Divider>

      <SocialButtons>
        <SocialButton type="apple">
          <AppleIcon></AppleIcon>
          Sign in with Apple
        </SocialButton>
        <SocialButton type="google">
          <GoogleIcon></GoogleIcon>
          Sign in with Google
        </SocialButton>
      </SocialButtons>
    </Form>
  );
};

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Register data:', formData);
    // Handle registration logic here
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      
      <FormOptions>
        <CheckboxLabel>
          <HiddenCheckbox
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <CustomCheckbox checked={formData.rememberMe}>
            ✓
          </CustomCheckbox>
          <span>Remember me</span>
        </CheckboxLabel>
      </FormOptions>

      <Button type="submit" >Sign Up</Button>

      <Divider>
        <span>OR</span>
      </Divider>

      <SocialButtons>
        <SocialButton type="apple">
          <AppleIcon> a </AppleIcon>
          Sign up with Apple
        </SocialButton>
        <SocialButton type="google">
          <GoogleIcon>g</GoogleIcon>
          Sign up with Google
        </SocialButton>
      </SocialButtons>
    </Form>
  );
};

// Styled Components
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 1000;
    animation: ${props => props.isClosing ? slideOutToRight : 'none'} 0.3s ease;
`;

const ModalContent = styled.div`
    width: 50%;
    min-width: 420px;
    max-width:  600px;
    height: -webkit-fill-available;
    padding: 75px 50px;
    background: white;
    border-radius: 24px;
    color: #003B5C;
    animation: ${props => props.isClosing ? slideOutToRight : slideInFromRight} 0.3s ease;
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

const WelcomeSection = styled.div`
    flex: 1;
`;

const WelcomeTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #003B5C;
`;

const WelcomeSubtitle = styled.p`
    color: #666;
    font-size: 0.9rem;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #666;
    line-height: 1;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: #003B5C;
    }
`;

const TabContainer = styled.div`
    display: flex;
    border-radius: 12px;
    border: 2px solid #003B5C;
    border-radius : 50px;
    overflow: hidden;
    margin: 1.5rem 2.5rem 0;
`;

const TabButton = styled.button`
    flex: 1;
    padding: 0.8rem;
    border: none;
    cursor: pointer;
    font-weight: 600;
    background: ${props => props.active ? '#0a1e23' : 'transparent'};
    color: ${props => props.active ? 'white' : '#0a1e23'};
    transition: all 0.3s ease;

    &:hover {
        background: ${props => props.active ? '#0a1e23' : '#f0f4f8'};
    }
`;

const Form = styled.form`
    padding: 2rem 2.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const FormOptions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    user-select: none;
`;

const HiddenCheckbox = styled.input`
    display: none;
`;

const CustomCheckbox = styled.div`
    width: 18px;
    height: 18px;
    border: 2px solid #ddd;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: white;
    background: ${props => props.checked ? '#0a1e23' : 'transparent'};
    border-color: ${props => props.checked ? '#0a1e23' : '#ddd'};
    transition: all 0.2s ease;
`;

const ForgotPassword = styled.a`
    color: #0a1e23;
    text-decoration: none;
    font-weight: 500;

    &:hover {
        text-decoration: underline;
    }
`;

const Divider = styled.div`
    text-align: center;
    margin: 1.5rem 0;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: #ddd;
    }

    span {
        background: white;
        padding: 0 1rem;
        color: #666;
        font-size: 0.9rem;
    }
`;

const SocialButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: auto;
`;

const SocialButton = styled.button`
    padding: 0.75rem 1.5rem;
    border: 2px solid #ddd;
    border-radius: 50px;
    background: white;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
        border-color: #0a1e23;
        background: #f8f9fa;
    }
`;

const AppleIcon = styled.span`
    font-size: 1.2rem;
  
`;

const GoogleIcon = styled.span`
    font-size: 1.2rem;
`;

export default AuthModal;