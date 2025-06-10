#!/usr/bin/env node

/**
 * Script de verificación específica: Categoría "Material Design" → "selfh.st/icons"
 * Verifica que la categoría en la lista de iconos haya cambiado
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 VERIFICANDO CATEGORÍA EN LISTA DE ICONOS');
console.log('='.repeat(50));

const iconSelectorPath = path.join(__dirname, 'src/components/IconSelector.js');

if (!fs.existsSync(iconSelectorPath)) {
  console.log('❌ IconSelector.js no encontrado');
  process.exit(1);
}

const content = fs.readFileSync(iconSelectorPath, 'utf8');

// Verificar que la categoría haya cambiado
const hasOldCategory = content.includes("'Material Design': {");
const hasNewCategory = content.includes("'selfh.st/icons': {");

// Verificar que el texto descriptivo haya cambiado
const hasOldDescription = content.includes('Material Design (mdi-)');
const hasNewDescription = content.includes('selfh.st/icons (mdi-)');

console.log('📂 Verificando categoría en ICON_LIBRARIES:');
if (hasNewCategory && !hasOldCategory) {
  console.log('✅ Categoría actualizada: "selfh.st/icons" ✓');
} else if (hasOldCategory) {
  console.log('❌ Todavía contiene categoría "Material Design"');
} else {
  console.log('❌ No se encontró la nueva categoría "selfh.st/icons"');
}

console.log('📝 Verificando texto descriptivo:');
if (hasNewDescription && !hasOldDescription) {
  console.log('✅ Descripción actualizada: "selfh.st/icons (mdi-)" ✓');
} else if (hasOldDescription) {
  console.log('❌ Todavía contiene descripción "Material Design (mdi-)"');
} else {
  console.log('❌ No se encontró la nueva descripción');
}

console.log('='.repeat(50));

if (hasNewCategory && !hasOldCategory && hasNewDescription && !hasOldDescription) {
  console.log('🎉 ¡CATEGORÍA EN LISTA DE ICONOS ACTUALIZADA CORRECTAMENTE!');
  console.log('');
  console.log('✅ Cambios verificados:');
  console.log('   • Categoría "Material Design" → "selfh.st/icons"');
  console.log('   • Descripción actualizada en texto de ayuda');
  console.log('   • La lista de iconos ahora mostrará "selfh.st/icons"');
  console.log('');
  console.log('🌐 Para verificar visualmente:');
  console.log('   1. Abrir http://localhost:3001');
  console.log('   2. Ir a Services > Add Service');
  console.log('   3. Hacer clic en el campo Icon');
  console.log('   4. Ver que aparece "selfh.st/icons" como categoría');
} else {
  console.log('❌ CATEGORÍA NO ACTUALIZADA COMPLETAMENTE');
  console.log('Revisar manualmente el archivo IconSelector.js');
  process.exit(1);
}
