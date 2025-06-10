// Test simple para SettingsForm
import React from 'react';
import { createRoot } from 'react-dom/client';
import SettingsForm from './src/components/SettingsForm.js';
import { ThemeProvider } from './src/contexts/ThemeContext.js';

// Configuración de test
const testSettings = {
  title: 'Test Homepage',
  theme: 'dark',
  color: 'slate'
};

const TestApp = () => {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px' }}>
        <SettingsForm 
          settings={testSettings} 
          onUpdate={(data) => console.log('Updated:', data)} 
        />
      </div>
    </ThemeProvider>
  );
};

// Crear elemento de test
const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);

try {
  root.render(<TestApp />);
  console.log('✅ SettingsForm renderizado correctamente');
} catch (error) {
  console.error('❌ Error en SettingsForm:', error);
}
