import styled from 'styled-components';

export const Input = styled.input`
  padding: 0.75rem 1rem;
  width: 350px;
  margin: 10px 0;
  border: 2px solid #ddd;
  border-radius: 20px;
  font-size: 1rem;
  font-family: 'Times New Roman', serif;
  transition: border 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2E8B57;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  width: 500px;
  padding: 20px;
  font-family: 'Times New Roman', serif;
  justify-content: center;
  align-items: center;
`;

export const AuthLink = styled.a`
  font-weight: 500;
  transition: 0.3s ease;

  &:hover {
    cursor: pointer;
  }
`;

export const Title = styled.h1`
  font-family: 'Times New Roman', serif;
  margin-top: 80px;
`;

export default {
  Input,
  Form,
  AuthLink,
}
