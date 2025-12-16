// components/Input.js
import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid rgba(93, 64, 55, 0.3);
  border-radius: 50px;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  font-family: 'Lora', serif;
  color: #3E2723;

  &:focus {
    outline: none;
    border-color: #5D4037;
    box-shadow: 0 0 0 3px rgba(93, 64, 55, 0.2);
  }

  &::placeholder {
    color: #8D6E63;
    font-style: italic;
  }
`;

export default {
  Input,
};