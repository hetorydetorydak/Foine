// components/Input.js
import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 50px;
  font-size: 1rem;
  transition: border 0.3s ease;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #003B5C;
    box-shadow: 0 0 0 3px rgba(0, 59, 92, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export default {
  Input,
};