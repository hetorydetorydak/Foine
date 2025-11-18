import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AppBar, HomeContainer } from "../components/AppBar";
import { Button, ButtonNoFill } from "../components/Button";

function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar>
        <div>Foine</div>
        <div>
          <ButtonNoFill onClick={() => navigate("/login")}>Login</ButtonNoFill>
          <Button onClick={() => navigate("/register")}>Sign up</Button>
        </div>
      </AppBar>
      <HomeContainer>
        <h1>DESIGN REDEFINED</h1>
        <h3>Discover a vibrant digital gallery where creativity thrives <br /> and inspiration flows endlessly. This platform connects <br /> artists and enthusiasts by showcasing a vast collection of <br /> unique artwork.</h3> <br /><br /><br />
      </HomeContainer>
    </>
  );
}

export default Landing;


