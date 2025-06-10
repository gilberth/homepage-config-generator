// Test script para verificar que SettingsForm funciona sin errores de theme
console.log('🧪 Iniciando prueba de SettingsForm con theme props...');

// Función para probar el tab de configuraciones
function testSettingsTab() {
  setTimeout(() => {
    console.log('🔍 Buscando tab de configuraciones...');
    
    // Buscar botón de Settings
    const settingsButton = document.querySelector('[data-tab="settings"], button[aria-label*="ettings"], button[title*="ettings"]') || 
                          Array.from(document.querySelectorAll('button')).find(btn => 
                            btn.textContent.toLowerCase().includes('settings') || 
                            btn.textContent.toLowerCase().includes('configuración')
                          );
    
    if (settingsButton) {
      console.log('✅ Tab de configuraciones encontrado:', settingsButton);
      
      // Hacer click en el tab
      settingsButton.click();
      
      // Verificar después del click
      setTimeout(() => {
        testSettingsForm();
      }, 1000);
    } else {
      console.log('❌ No se encontró el tab de configuraciones');
      console.log('🔍 Botones disponibles:', Array.from(document.querySelectorAll('button')).map(btn => btn.textContent));
    }
  }, 2000);
}

function testSettingsForm() {
  console.log('🔍 Verificando componentes de SettingsForm...');
  
  // Buscar elementos del formulario
  const labels = document.querySelectorAll('label');
  const inputs = document.querySelectorAll('input');
  const selects = document.querySelectorAll('select');
  
  console.log(`📋 Elementos encontrados:`);
  console.log(`  - Labels: ${labels.length}`);
  console.log(`  - Inputs: ${inputs.length}`);
  console.log(`  - Selects: ${selects.length}`);
  
  // Verificar errores en consola
  const originalError = console.error;
  let hasThemeErrors = false;
  
  console.error = function(...args) {
    const message = args.join(' ');
    if (message.includes('Cannot read properties of undefined (reading \'text\')') ||
        message.includes('props.theme.colors') ||
        message.includes('theme') && message.includes('undefined')) {
      hasThemeErrors = true;
      console.log('❌ Error de theme detectado:', message);
    }
    originalError.apply(console, args);
  };
  
  setTimeout(() => {
    if (!hasThemeErrors) {
      console.log('✅ ¡No se detectaron errores de theme! Las correcciones funcionaron.');
    } else {
      console.log('❌ Aún hay errores de theme detectados.');
    }
    
    console.error = originalError; // Restaurar console.error original
  }, 3000);
}

// Iniciar la prueba
console.log('🚀 Iniciando prueba en 2 segundos...');
testSettingsTab();
