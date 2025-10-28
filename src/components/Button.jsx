import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ variant }) => 
    variant === 'outline' ? 'transparent' : '#2E8B57'};
  color: ${({ variant }) => 
    variant === 'outline' ? '#2E8B57' : 'white'};
  border: 2px solid #2E8B57;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ variant }) => 
      variant === 'outline' ? '#2E8B57' : '#256b46'};
    color: white;
  }
`;
