import React from 'react';
import styled from 'styled-components';

const ProfileNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { key: 'posts', label: 'POSTS', icon: '' },
    { key: 'saves', label: 'SAVES', icon: '' }
  ];

  return (
    <NavContainer>
      <NavList>
        {tabs.map(tab => (
          <NavItem key={tab.key}>
            <NavButton 
              $active={activeTab === tab.key}
              onClick={() => onTabChange(tab.key)}
            >
              <TabIcon>{tab.icon}</TabIcon>
              {tab.label}
            </NavButton>
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  );
};

export default ProfileNav;

const NavContainer = styled.nav`
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 2rem;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0;
`;

const NavItem = styled.li`
  margin: 0;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  color: ${props => props.$active ? '#262626' : '#8e8e8e'};
  border-bottom: 1px solid ${props => props.$active ? '#262626' : 'transparent'};
  transition: all 0.2s ease;
  text-transform: uppercase;

  &:hover {
    color: #262626;
    background: #fafafa;
  }
`;

const TabIcon = styled.span`
  font-size: 1rem;
`;