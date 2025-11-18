import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { AppBar, AuthContainer, Container } from "../components/AppBar";
import { Button, ButtonNoFill, FormButton, NavButton } from "../components/Button";
import { Input, Form, Title, AuthLink } from "../components/Form";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await registerUser({ email, password, username });

        console.log("Register success:", response.data);

        navigate("/login");
        
    } catch (error) {
        console.error("Registration error:", error);
        let msg = "Registration failed";
        if (error.response && error.response.data) {
            msg = error.response.data;
        }
        alert(msg);
    }
  };

  return (
    <>
      <AppBar>
          <AuthLink onClick={() => navigate("/")}>Foine</AuthLink>
          <div>
            <ButtonNoFill onClick={() => navigate("/login")}>Login</ButtonNoFill>
            <Button onClick={() => navigate("/register")}>Sign up</Button>
          </div>
        </AppBar>
      <Container>
        <AuthContainer>
          <Title>Create an Account</Title>
          <Form onSubmit={handleRegister}>
              <div>
                <NavButton type="button" onClick={() => navigate("/login")}>Login</NavButton>
                <NavButton type="button" style={{ background: "#333", color: "white", }} onClick={() => navigate("/register")}>Sign up</NavButton>
              </div>
              <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
              <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              />
              <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
              <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              />
              <FormButton type="submit">Register</FormButton>
          </Form>
        </AuthContainer>
      </Container>
    </>
  );
}

export default Registration;