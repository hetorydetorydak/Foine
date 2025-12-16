// components/Button.js
import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ variant }) => 
    variant === 'outline' ? 'transparent' : 
    variant === 'text' ? 'transparent' : 
    variant === 'dark-outline' ? 'transparent' : '#5D4037'}; /* Rich brown */
  
  color: ${({ variant }) => 
    variant === 'outline' ? '#5D4037' : 
    variant === 'text' ? '#5D4037' : 
    variant === 'dark-outline' ? '#5D4037' : '#FFFFFF'};
    
  
  border: ${({ variant }) => 
    variant === 'text' ? 'none' : 
    variant === 'outline' ? '2px solid #5D4037': 
    variant === 'dark-outline' ? '2px solid #5D4037': 'none'};
  
  padding: ${({ variant }) => 
    variant === 'text' ? '0.6rem 1.2rem' : '0.8rem 1.8rem'};
  
  border-radius: 50px; /* Pill-shaped for soft, artistic feel */
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); /* Smooth easing */
  text-decoration: ${({ variant }) => variant === 'text' ? 'underline' : 'none'};
  letter-spacing: 0.02em;
  box-shadow: ${({ variant }) => 
    variant === 'text' || variant === 'outline' ? 'none' : '0 4px 15px rgba(93, 64, 55, 0.2)'};

  &:hover {
    background-color: ${({ variant }) => 
      variant === 'outline' ? 'rgba(93, 64, 55, 0.1)' : 
      variant === 'text' ? 'rgba(93, 64, 55, 0.1)' : '#3E2723'}; /* Darker brown on hover */
    
    color: ${({ variant }) => 
      variant === 'text' ? '#3E2723' : '#FFFFFF'};
    
    transform: translateY(-2px);
    
    box-shadow: ${({ variant }) => 
      variant === 'text' ? 'none' : '0 8px 20px rgba(93, 64, 55, 0.3)'};
    
    text-decoration: none;
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ variant }) => 
      variant === 'text' ? 'none' : '0 4px 10px rgba(93, 64, 55, 0.2)'};
  }

  /* Art-themed focus state */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(216, 27, 96, 0.3);
  }
`;

