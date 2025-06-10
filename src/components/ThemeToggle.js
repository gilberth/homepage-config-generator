import React from 'react';
import styled from 'styled-components';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ToggleButton = styled.button`
  background: ${props => props.theme?.colors?.surface || '#ffffff'};
  border: 2px solid ${props => props.theme?.colors?.border || '#dee2e6'};
  border-radius: 20px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: ${props => props.theme?.colors?.surfaceHover || '#f8f9fa'};
    border-color: ${props => props.theme?.colors?.primary || '#007acc'};
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const IconWrapper = styled.div`
  color: ${props => props.theme?.colors?.text || '#333333'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.3s ease;
  
  ${props => props.isDark ? `
    transform: rotate(180deg);
  ` : `
    transform: rotate(0deg);
  `}
`;

const ToggleLabel = styled.span`
  color: ${props => props.theme?.colors?.textSecondary || '#666666'};
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ThemeToggle = ({ showLabel = true, size = 'normal' }) => {
  const { theme, isDark, toggleTheme } = useTheme();

  const iconSize = size === 'small' ? 14 : 18;
  const buttonSize = size === 'small' ? 32 : 40;
  const padding = size === 'small' ? 6 : 8;

  return (
    <ToggleContainer>
      {showLabel && (
        <ToggleLabel theme={theme}>
          {isDark ? 'Oscuro' : 'Claro'}
        </ToggleLabel>
      )}
      <ToggleButton 
        onClick={toggleTheme}
        theme={theme}
        style={{ 
          width: buttonSize, 
          height: buttonSize, 
          padding: padding 
        }}
        title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
      >
        <IconWrapper isDark={isDark} theme={theme}>
          {isDark ? (
            <FiMoon size={iconSize} />
          ) : (
            <FiSun size={iconSize} />
          )}
        </IconWrapper>
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ThemeToggle;
