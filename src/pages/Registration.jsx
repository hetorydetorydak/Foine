import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await registerUser({ email, password });

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
    <Container>
        <h2>Register</h2>
        <Form onSubmit={handleRegister}>
            <Input
            type="text"
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
            <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
            <Button type="submit">Register</Button>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Button onClick={() => navigate("/")}>Back to Home</Button>
                <Button onClick={() => navigate("/login")}>Go to Login</Button>
                
            </div>
        </Form>
    </Container>
  );
}

export default Registration;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f4f8;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin: 8px 0;
  padding: 10px;
  width: 250px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background: #003b5c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #002b44;
  }
`;