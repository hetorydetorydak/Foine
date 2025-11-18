import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { AppBar, Container, AuthContainer } from "../components/AppBar";
import { Button, FormButton, ButtonNoFill, NavButton } from "../components/Button";
import { Input, Form, Title, AuthLink } from "../components/Form";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await loginUser({ email, password });

        // if (response.data) {
          // localStorage.setItem("token", response.data.token);
        console.log(localStorage.getItem("token"));
        navigate("/landing");
        // } else {
        //   alert("Login failed. No token received.");
        // }

    } catch (error) {
        console.log(error);
        let msg = "Login failed";
        if (error.response?.data) {
            msg = error.response.data;
        }
        alert(msg);
    };
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
          <Title>Login</Title>
          <Form onSubmit={handleSubmit}>
            <div>
              <NavButton type="button" style={{ background: "#333", color: "white", }} onClick={() => navigate("/Login")}>Login</NavButton>
              <NavButton type="button" onClick={() => navigate("/register")}>Sign up</NavButton>
            </div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FormButton type="submit">Login</FormButton>
          </Form>
        </AuthContainer>
      </Container>
    </>
  );
}

export default Login;