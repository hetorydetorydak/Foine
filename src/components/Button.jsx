// components/Button.js
import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ variant }) => 
    variant === 'outline' ? 'transparent' : 
    variant === 'text' ? 'transparent' : '#0a1e23'};
  
  color: ${({ variant }) => 
    variant === 'outline' ? '#FFFFFF' : 
    variant === 'text' ? '#FFFFFF' : '#FFFFFF'};
    
  
  border: ${({ variant }) => 
    variant === 'text' ? 'none' : 
    variant === 'outline' ? '2px solid #FFFFFF': '#0a1e23'};
  
  padding: ${({ variant }) => 
    variant === 'text' ? '0.5rem 1rem' : '0.75rem 1.5rem'};
  
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: ${({ variant }) => variant === 'text' ? 'underline' : 'none'};

  &:hover {
    background-color: ${({ variant }) => 
      variant === 'outline' ? '#FFFFFF' : 
      variant === 'text' ? 'rgba(255, 255, 255, 0.1)' : '#F0F0F0'};
    
    color: ${({ variant }) => 
      variant === 'text' ? '#FFFFFF' : '#003B5C'};
    
    transform: ${({ variant }) => variant === 'text' ? 'none' : 'translateY(-1px)'};
    
    box-shadow: ${({ variant }) => 
      variant === 'text' ? 'none' : '0 4px 12px rgba(255, 255, 255, 0.3)'};
    
    text-decoration: ${({ variant }) => variant === 'text' ? 'none' : 'none'};
  }

  &:active {
    transform: ${({ variant }) => variant === 'text' ? 'none' : 'translateY(0)'};
  }
`;
