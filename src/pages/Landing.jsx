import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar>Foine</AppBar>
      <Container>
        <h1>Welcome to Foine</h1>
        <p>Design Redefined.</p>
        <div>
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/register")}>Register</Button>
        </div>
      </Container>
    </>
  );
}

export default Landing;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f4f8;
`;

const AppBar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: #003b5c;
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  background: #2e8b57;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #246c45;
  }
`;
