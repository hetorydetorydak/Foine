// components/Form.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "./Input";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/index";

export const LoginForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      navigate("/landing");
      onSuccess && onSuccess();
    } catch (err) {
      console.log(err);
      setError("*Invalid email or password");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <ErrorMessage>{error}</ErrorMessage>
      <Button type="submit">Sign In to Gallery</Button>

      <Divider><span>OR</span></Divider>

      <SocialButtons>
        <SocialButton type="apple"><span></span> Sign in with Apple</SocialButton>
        <SocialButton type="google"><span>G</span> Sign in with Google</SocialButton>
      </SocialButtons>
    </Form>
  );
};

export const RegisterForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("*Passwords do not match");
      return;
    }
    try {
      await registerUser({ email, username, password });
      navigate("/");
      onSuccess && onSuccess();
    } catch (err) {
      console.log(err);
      setError("*Registration failed. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Input type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
      <ErrorMessage>{error}</ErrorMessage>
      <Button type="submit">Join the Art Community</Button>

      <Divider><span>OR</span></Divider>

      <SocialButtons>
        <SocialButton type="apple"><span></span> Sign up with Apple</SocialButton>
        <SocialButton type="google"><span>G</span> Sign up with Google</SocialButton>
      </SocialButtons>
    </Form>
  );
};

const Form = styled.form`
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
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
    background: rgba(93, 64, 55, 0.2);
  }

  span {
    padding: 0 1rem;
    color: #8D6E63;
    font-size: 0.9rem;
    background: #FFFFFF;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SocialButton = styled.button`
  padding: 0.75rem;
  border-radius: 50px;
  border: 2px solid rgba(93, 64, 55, 0.3);
  background: transparent;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  transition: 0.3s;
  color: #5D4037;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    border-color: #5D4037;
    background: rgba(93, 64, 55, 0.05);
  }
`;

const ErrorMessage = styled.h6`
  color: #D81B60;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
`;