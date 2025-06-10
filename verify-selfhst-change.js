#!/usr/bin/env node

/**
 * Script de verificación: Cambio de Material Icons a selfh.st/icons
 * Verifica que el cambio se haya aplicado correctamente
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 VERIFICANDO CAMBIO: Material Icons → selfh.st/icons');
console.log('='.repeat(50));

// Archivos a verificar
const filesToCheck = [
  'src/components/IconSelector.js',
  'README.md',
  'ICON_GUIDE.md',
  'MANUAL_USUARIO.md',
  'EXAMPLE_CONFIG.md'
];

let allChangesCorrect = true;

filesToCheck.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${file} - Archivo no encontrado`);
    allChangesCorrect = false;
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Verificar que contenga selfh.st/icons
  const hasSelfhstIcons = content.includes('selfh.st/icons');
  
  // Verificar que NO contenga Material Icons en enlaces
  const hasMaterialIconsLink = content.includes('materialdesignicons.com');
  
  if (hasSelfhstIcons && !hasMaterialIconsLink) {
    console.log(`✅ ${file} - Cambio aplicado correctamente`);
  } else if (!hasSelfhstIcons) {
    console.log(`❌ ${file} - No contiene selfh.st/icons`);
    allChangesCorrect = false;
  } else if (hasMaterialIconsLink) {
    console.log(`⚠️  ${file} - Todavía contiene enlaces a materialdesignicons.com`);
    allChangesCorrect = false;
  }
});

console.log('='.repeat(50));

if (allChangesCorrect) {
  console.log('🎉 ¡CAMBIO COMPLETADO EXITOSAMENTE!');
  console.log('');
  console.log('✅ Resumen de cambios aplicados:');
  console.log('   • IconSelector.js: Enlace cambiado a selfh.st/icons');
  console.log('   • README.md: Documentación actualizada');
  console.log('   • ICON_GUIDE.md: Guía actualizada');
  console.log('   • MANUAL_USUARIO.md: Manual actualizado');
  console.log('   • EXAMPLE_CONFIG.md: Ejemplos actualizados');
  console.log('');
  console.log('🌐 Para verificar en la interfaz:');
  console.log('   1. Abrir http://localhost:3001');
  console.log('   2. Ir a Services tab');
  console.log('   3. Crear un nuevo servicio');
  console.log('   4. En el campo Icon, buscar iconos');
  console.log('   5. Verificar que el enlace muestre "selfh.st/icons"');
} else {
  console.log('❌ CAMBIO INCOMPLETO - Revisar archivos marcados');
  process.exit(1);
}
