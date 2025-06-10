// Debug component para verificar el tema
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeDebug = () => {
  const { theme, currentTheme } = useTheme();
  
  console.log('🔍 Debug Theme:', {
    currentTheme,
    theme: theme,
    themeColors: theme?.colors,
    textColor: theme?.colors?.text
  });
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px',
      fontSize: '12px',
      zIndex: 9999 
    }}>
      <div>Theme: {currentTheme}</div>
      <div>Text Color: {theme?.colors?.text || 'UNDEFINED'}</div>
      <div>Theme Defined: {theme ? '✅' : '❌'}</div>
    </div>
  );
};

export default ThemeDebug;
