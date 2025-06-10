import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto de tema
const ThemeContext = createContext();

// Hook personalizado para usar el contexto de tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};

// Temas predefinidos
export const themes = {
  light: {
    name: 'light',
    colors: {
      // Colores principales
      primary: '#007acc',
      primaryHover: '#0056b3',
      secondary: '#6c757d',
      secondaryHover: '#5a6268',
      
      // Fondos
      background: '#f5f5f5',
      surface: '#ffffff',
      surfaceHover: '#f8f9fa',
      
      // Textos
      text: '#333333',
      textSecondary: '#666666',
      textMuted: '#999999',
      
      // Bordes
      border: '#dee2e6',
      borderLight: '#e9ecef',
      
      // Estados
      success: '#28a745',
      successHover: '#218838',
      warning: '#ffc107',
      warningHover: '#e0a800',
      danger: '#dc3545',
      dangerHover: '#c82333',
      info: '#17a2b8',
      infoHover: '#138496',
      
      // Shadows
      shadow: 'rgba(0,0,0,0.1)',
      shadowLight: 'rgba(0,0,0,0.05)',
      
      // Code editor
      codeBackground: '#f8f9fa',
      codeText: '#333333',
      codeBorder: '#e9ecef'
    }
  },
  dark: {
    name: 'dark',
    colors: {
      // Colores principales
      primary: '#4fa8da',
      primaryHover: '#3d8bce',
      secondary: '#6c757d',
      secondaryHover: '#545b62',
      
      // Fondos
      background: '#121212',
      surface: '#1e1e1e',
      surfaceHover: '#2d2d2d',
      
      // Textos
      text: '#ffffff',
      textSecondary: '#b3b3b3',
      textMuted: '#888888',
      
      // Bordes
      border: '#404040',
      borderLight: '#333333',
      
      // Estados
      success: '#4caf50',
      successHover: '#45a049',
      warning: '#ff9800',
      warningHover: '#f57c00',
      danger: '#f44336',
      dangerHover: '#d32f2f',
      info: '#2196f3',
      infoHover: '#1976d2',
      
      // Shadows
      shadow: 'rgba(0,0,0,0.3)',
      shadowLight: 'rgba(0,0,0,0.2)',
      
      // Code editor
      codeBackground: '#2d2d2d',
      codeText: '#ffffff',
      codeBorder: '#404040'
    }
  }
};

// Proveedor del contexto de tema
export const ThemeProvider = ({ children }) => {
  // Obtener tema inicial del localStorage o usar 'light' por defecto
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('homepage-config-theme');
    return savedTheme && themes[savedTheme] ? savedTheme : 'light';
  });

  // Guardar tema en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('homepage-config-theme', currentTheme);
  }, [currentTheme]);

  // Función para cambiar el tema
  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Función para establecer un tema específico
  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  // Valor del contexto
  const value = {
    theme: themes[currentTheme],
    themeName: currentTheme,
    toggleTheme,
    setTheme,
    isDark: currentTheme === 'dark',
    isLight: currentTheme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
