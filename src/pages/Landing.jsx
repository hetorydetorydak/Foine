import styled from "styled-components";

export default function Landing() {
  return (
    <WelcomeMessage>
      Welcome BitchAss
    </WelcomeMessage>
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