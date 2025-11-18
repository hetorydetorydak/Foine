import styled from 'styled-components';

export const Button1 = styled.button`
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

export const ButtonNoFill = styled.button`
  margin: 10px;
  border: none;
  background: none;
  color: white;
  font-size: 1rem;
  font-family: 'Times New Roman', serif;
  cursor: pointer;
`;

export const Button = styled.button`
  margin: 10px;
  margin-right: 50px;
  padding: 10px 20px;
  font-size: 1rem;
  font-family: 'Times New Roman', serif;
  background: #D9D9D9;
  color: black;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #246c45;
    color: white;
  }
`;

export const FormButton = styled.button`
  margin: 10px;
  margin-right: 50px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: 'Times New Roman', serif;
  background: #D9D9D9;
  margin: 10px auto;
  color: black;
  width: 385px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #246c45;
    color: white;
  }
`;

export const NavButton = styled.button`
  margin: 10px;
  margin-right: 50px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: 'Times New Roman', serif;
  background: #D9D9D9;
  margin: 10px auto;
  color: black;
  width: 200px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #246c45;
    color: white;
  }
`;

export default {
  Button,
  ButtonNoFill,
  FormButton,
}
