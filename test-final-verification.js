#!/usr/bin/env node
// Test final para verificar que jackett y la importación funcionen correctamente

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 VERIFICACIÓN FINAL - Jackett Widget y Importación');
console.log('='.repeat(60));

// 1. Verificar que la aplicación esté ejecutándose
console.log('\n1. ✅ Verificando aplicación...');
try {
  const response = execSync('curl -s -o /dev/null -w "%{http_code}" http://localhost:3001', {encoding: 'utf8'});
  if (response.trim() === '200') {
    console.log('   ✅ Aplicación ejecutándose correctamente en http://localhost:3001');
  } else {
    throw new Error(`HTTP ${response}`);
  }
} catch (error) {
  console.log('   ❌ Aplicación no disponible:', error.message);
  process.exit(1);
}

// 2. Verificar que jackett esté en ServiceForm.js
console.log('\n2. ✅ Verificando configuración de Jackett...');
try {
  const serviceFormContent = fs.readFileSync('./src/components/ServiceForm.js', 'utf8');
  
  if (serviceFormContent.includes("{ value: 'jackett', label: 'Jackett', category: 'Downloads' }")) {
    console.log('   ✅ Jackett encontrado en WIDGET_TYPES');
  } else {
    console.log('   ❌ Jackett NO encontrado en WIDGET_TYPES');
  }
  
  if (serviceFormContent.includes("'jackett': {") && serviceFormContent.includes("url: { type: 'url', label: 'Jackett URL'")) {
    console.log('   ✅ Configuración de Jackett encontrada en WIDGET_PARAMETERS');
  } else {
    console.log('   ❌ Configuración de Jackett NO encontrada en WIDGET_PARAMETERS');
  }
} catch (error) {
  console.log('   ❌ Error verificando ServiceForm.js:', error.message);
}

// 3. Verificar archivo de prueba
console.log('\n3. ✅ Verificando archivo de prueba...');
if (fs.existsSync('./test-example.yaml')) {
  console.log('   ✅ Archivo test-example.yaml existe');
  const content = fs.readFileSync('./test-example.yaml', 'utf8');
  const lines = content.split('\n').length;
  console.log(`   ℹ️  Archivo contiene ${lines} líneas`);
} else {
  console.log('   ❌ Archivo test-example.yaml NO existe');
}

// 4. Verificar fix de importación
console.log('\n4. ✅ Verificando fix de importación...');
try {
  const dragDropContent = fs.readFileSync('./src/components/DragDropBuilder.js', 'utf8');
  
  if (dragDropContent.includes('const newConfig = {') && dragDropContent.includes('[...(importedConfig.services || [])]')) {
    console.log('   ✅ Fix de importación aplicado (creación de nuevas referencias)');
  } else {
    console.log('   ❌ Fix de importación NO aplicado');
  }
} catch (error) {
  console.log('   ❌ Error verificando DragDropBuilder.js:', error.message);
}

console.log('\n🎯 INSTRUCCIONES PARA PRUEBA MANUAL:');
console.log('='.repeat(60));
console.log('1. Abrir http://localhost:3001 en el navegador');
console.log('2. Ir a la pestaña "Services"');
console.log('3. Agregar un nuevo servicio');
console.log('4. En "Widget Type", buscar "Jackett" en la categoría "Downloads"');
console.log('5. Verificar que aparezcan los campos: URL, Username (opcional), Password (opcional)');
console.log('');
console.log('6. Para probar importación:');
console.log('   - Arrastrar el archivo test-example.yaml al área de importación');
console.log('   - Hacer clic en "Importar Configuración"');
console.log('   - Verificar que el estado muestre: "6 servicios, 0 widgets, 0 marcadores"');
console.log('   - Verificar que aparezcan los servicios en las pestañas');
console.log('');
console.log('✅ Si todo funciona correctamente, las tareas están COMPLETADAS');
