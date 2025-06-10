#!/usr/bin/env node

/**
 * Script de verificación completa: Material Design → selfh.st/icons
 * Verifica todo el sistema de iconos y genera un reporte completo
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 VERIFICACIÓN COMPLETA: SISTEMA DE ICONOS SELFH.ST');
console.log('='.repeat(60));

// Función para verificar archivo
function verifyFile(filePath, checks) {
  const relativePath = path.relative(__dirname, filePath);
  console.log(`\n📄 ${relativePath}:`);
  
  if (!fs.existsSync(filePath)) {
    console.log('   ❌ Archivo no encontrado');
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  let allPassed = true;
  
  checks.forEach(check => {
    const hasContent = content.includes(check.search);
    const status = check.shouldExist ? hasContent : !hasContent;
    const icon = status ? '✅' : '❌';
    console.log(`   ${icon} ${check.description}: ${check.search}`);
    if (!status) allPassed = false;
  });
  
  return allPassed;
}

// Lista de verificaciones por archivo
const fileChecks = {
  'src/components/IconSelector.js': [
    { search: "'selfh.st/icons': {", shouldExist: true, description: "Categoría selfh.st/icons" },
    { search: "'Material Design': {", shouldExist: false, description: "NO debe tener Material Design" },
    { search: "selfh.st/icons (mdi-)", shouldExist: true, description: "Descripción selfh.st/icons" },
    { search: "Material Design (mdi-)", shouldExist: false, description: "NO debe tener desc. Material Design" },
    { search: "https://selfh.st/icons/", shouldExist: true, description: "Enlace a selfh.st/icons" },
    { search: "https://materialdesignicons.com/", shouldExist: false, description: "NO debe tener enlace MDI" }
  ],
  'README.md': [
    { search: "selfh.st/icons", shouldExist: true, description: "Referencia a selfh.st/icons" },
    { search: "Material Design Icons", shouldExist: false, description: "NO debe tener Material Design Icons" }
  ],
  'ICON_GUIDE.md': [
    { search: "selfh.st/icons", shouldExist: true, description: "Referencia a selfh.st/icons" },
    { search: "https://selfh.st/icons/", shouldExist: true, description: "Enlace a selfh.st/icons" }
  ]
};

let allFilesCorrect = true;

// Verificar cada archivo
Object.entries(fileChecks).forEach(([file, checks]) => {
  const filePath = path.join(__dirname, file);
  const fileResult = verifyFile(filePath, checks);
  if (!fileResult) allFilesCorrect = false;
});

console.log('\n' + '='.repeat(60));

if (allFilesCorrect) {
  console.log('🎉 ¡VERIFICACIÓN COMPLETA EXITOSA!');
  console.log('\n✅ TODOS LOS CAMBIOS APLICADOS CORRECTAMENTE:');
  console.log('   • Categoría en lista de iconos: "selfh.st/icons"');
  console.log('   • Texto de ayuda actualizado');
  console.log('   • Enlaces actualizados');
  console.log('   • Documentación consistente');
  
  console.log('\n🌐 PASOS PARA VERIFICAR EN LA INTERFAZ:');
  console.log('   1. Abrir: http://localhost:3001');
  console.log('   2. Ir a pestaña "Services"');
  console.log('   3. Hacer clic en "Add Service"');
  console.log('   4. Hacer clic en el campo "Icon"');
  console.log('   5. VERIFICAR: La categoría debe mostrar "selfh.st/icons"');
  console.log('   6. VERIFICAR: El enlace de ayuda debe ser "selfh.st/icons"');
  
  console.log('\n💡 SI TODAVÍA VES "Material Design":');
  console.log('   • Refrescar la página (Ctrl+F5 o Cmd+Shift+R)');
  console.log('   • Limpiar cache del navegador');
  console.log('   • Cerrar y volver a abrir el navegador');
  
} else {
  console.log('❌ VERIFICACIÓN FALLIDA');
  console.log('Revisar los archivos marcados con ❌');
  process.exit(1);
}

console.log('\n🔄 ESTADO DEL CAMBIO: COMPLETADO');
console.log('Material Design Icons → selfh.st/icons ✅');
