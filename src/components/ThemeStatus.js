import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const StatusContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${props => props.theme?.colors.surface};
  border: 1px solid ${props => props.theme?.colors.border};
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  color: ${props => props.theme?.colors.textSecondary};
  box-shadow: 0 2px 8px ${props => props.theme?.colors.shadow};
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 1000;
  transition: all 0.3s ease;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`;

const StatusIcon = styled.span`
  font-size: 14px;
`;

const StatusText = styled.span`
  font-weight: 500;
  text-transform: capitalize;
`;

const ThemeStatus = () => {
  const { themeName, isDark } = useTheme();

  return (
    <StatusContainer theme={useTheme().theme}>
      <StatusIcon>{isDark ? '🌙' : '☀️'}</StatusIcon>
      <StatusText>Modo {themeName === 'dark' ? 'Oscuro' : 'Claro'}</StatusText>
    </StatusContainer>
  );
};

export default ThemeStatus;
