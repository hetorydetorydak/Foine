import styled from 'styled-components';
import backgroundImage from '../images/background.jpg';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  height: 100vh;
  color: white;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage});
  background-size: cover;
`;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-left: 100px;
  justify-content: end ;
  height: 100vh;
  color: #d9d9d9;
  font-family: 'Times New Roman', serif;
  font-size: 1.5rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage});
  background-size: cover;
  z-index: -1;
`;

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 40%;
  color: black;
  background: #fff;
  z-index: 1;
  border-radius: 20px 0px 0px 20px;
`;

export const AppBar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: #0A1E23;
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

export const NavLink = styled.a`
  font-weight: 500;
  transition: 0.3s ease;

  &:hover {
    color: #FFA500;
  }
`;

export default {
  AppBar,
  Container,
  AuthContainer,
  HomeContainer,
  Logo,
  Nav,
  NavLink,
}