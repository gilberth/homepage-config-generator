import React, { useEffect } from 'react';
import DragDropBuilder from './components/DragDropBuilder';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import './App.css';

function AppContent() {
  const { theme } = useTheme();

  useEffect(() => {
    // Establecer variables CSS dinámicas para elementos que no pueden usar styled-components
    const root = document.documentElement;
    root.style.setProperty('--scrollbar-track', theme.colors.background);
    root.style.setProperty('--scrollbar-thumb', theme.colors.border);
    root.style.setProperty('--scrollbar-thumb-hover', theme.colors.borderLight);
    root.style.setProperty('--border-color', theme.colors.border);
    
    // Aplicar colores al body
    document.body.style.backgroundColor = theme.colors.background;
    document.body.style.color = theme.colors.text;
  }, [theme]);

  return (
    <div className="App" style={{ background: theme.colors.background, color: theme.colors.text }}>
      <DragDropBuilder />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;