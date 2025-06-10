// Script de diagnóstico para capturar errores
console.log('🔍 Iniciando diagnóstico de SettingsForm...');

// Capturar errores globales
window.addEventListener('error', (event) => {
  console.error('❌ Error capturado:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
});

// Capturar errores de React
window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Promise rechazada:', event.reason);
});

// Test específico de SettingsForm
setTimeout(() => {
  console.log('🧪 Verificando estado de componentes...');
  
  // Verificar si SettingsForm está montado
  const settingsForms = document.querySelectorAll('[data-testid="settings-form"], form');
  console.log(`📋 Formularios encontrados: ${settingsForms.length}`);
  
  // Verificar consola por errores específicos
  console.log('✅ Diagnóstico completado');
}, 2000);

console.log('🚀 Script de diagnóstico cargado');
