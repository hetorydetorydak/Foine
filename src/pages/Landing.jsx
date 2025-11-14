import styled from "styled-components";
import AppBar from "../components/AppBar";
import Button from "../components/Button";
import { logout } from "../api/auth";

export default function Landing() {
  
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  }

  return (
    <>
      <h1>Welcome</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

const WelcomeMessage = styled.div`
  border: 1px solid black;
  height: 100vh;
  text-align: center;
  align-content: center;
  font-size: 25px;
  font-weight: bold;
`