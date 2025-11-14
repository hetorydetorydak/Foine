import styled from 'styled-components';

export const AppBar = styled.header`
  background-color: #003B5C;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
}