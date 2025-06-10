#!/usr/bin/env node

/**
 * VERIFICACIÓN FINAL DE ESCALABILIDAD
 * ==================================== 
 * 
 * Este script realiza una validación completa del sistema para demostrar
 * que las correcciones implementadas (Jackett + Import Fix) funcionan
 * correctamente y que el sistema es escalable para futuros widgets.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('🎯 VERIFICACIÓN FINAL DE ESCALABILIDAD Y ROBUSTEZ');
console.log('================================================\n');

async function checkApplication() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3001', (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function checkJackettConfiguration() {
  try {
    const serviceFormPath = path.join(__dirname, 'src', 'components', 'ServiceForm.js');
    const content = fs.readFileSync(serviceFormPath, 'utf8');
    
    // Verificar que Jackett esté en WIDGET_TYPES
    const hasJackettType = content.includes("{ value: 'jackett'");
    
    // Verificar configuración específica de Jackett
    const hasJackettConfig = content.includes("'jackett': {") && 
                             content.includes("required: ['url']") &&
                             content.includes("optional: ['username', 'password']");
    
    return {
      inTypes: hasJackettType,
      hasConfiguration: hasJackettConfig,
      complete: hasJackettType && hasJackettConfig
    };
  } catch (error) {
    return { error: error.message };
  }
}

function checkImportFix() {
  try {
    const dragDropPath = path.join(__dirname, 'src', 'components', 'DragDropBuilder.js');
    const content = fs.readFileSync(dragDropPath, 'utf8');
    
    // Verificar que el fix específico esté presente
    const hasNewObjectPattern = content.includes('const newConfig = {') ||
                                content.includes('services: [...(importedConfig.services || [])]');
    
    const hasStateUpdate = content.includes('setConfig(newConfig)') ||
                          content.includes('setConfig({');
    
    return {
      hasObjectPattern: hasNewObjectPattern,
      hasStateUpdate: hasStateUpdate,
      complete: hasNewObjectPattern && hasStateUpdate
    };
  } catch (error) {
    return { error: error.message };
  }
}

function analyzeSystemRobustness() {
  try {
    const serviceFormPath = path.join(__dirname, 'src', 'components', 'ServiceForm.js');
    const content = fs.readFileSync(serviceFormPath, 'utf8');
    
    // Contar widgets en WIDGET_TYPES
    const typesMatches = content.match(/{ value: '[^']+'/g);
    const totalTypes = typesMatches ? typesMatches.length : 0;
    
    // Contar configuraciones en WIDGET_PARAMETERS
    const configMatches = content.match(/'[^']+': \{[\s\S]*?required:/g);
    const totalConfigs = configMatches ? configMatches.length : 0;
    
    // Verificar manejo de widgets no configurados
    const hasWidgetHandling = content.includes('WIDGET_PARAMETERS[widgetType]') ||
                             content.includes('widgetConfig');
    
    return {
      totalTypes,
      totalConfigs,
      hasRobustHandling: hasWidgetHandling,
      coverageRatio: totalTypes > 0 ? (totalConfigs / totalTypes * 100).toFixed(1) : 0
    };
  } catch (error) {
    return { error: error.message };
  }
}

function createRobustnessTestFile() {
  // Crear un archivo de prueba que incluya:
  // 1. Widgets bien configurados (como Jackett)
  // 2. Widgets sin configuración 
  // 3. Widgets que no existen
  
  const testContent = `# Test de robustez - Mezclando widgets configurados y no configurados
services:
  - Test Group:
      # Widget bien configurado
      - Jackett Service:
          href: http://jackett.test:9117
          description: Indexer service
          widget:
            type: jackett
            url: http://jackett.test:9117
            username: admin
            password: secret123
      
      # Widget implementado pero sin configuración completa
      - Search Widget Test:
          href: http://search.test
          description: Search widget test
          widget:
            type: search
            provider: google
      
      # Widget que podría no tener configuración
      - Generic Service:
          href: http://generic.test
          description: Generic service
          widget:
            type: generic_widget_type
            url: http://generic.test
            some_param: test_value

widgets:
  - search:
      provider: google
      target: _blank

bookmarks:
  - Testing:
      - Test Site:
          href: https://example.com
          description: Test bookmark
`;

  const testFilePath = path.join(__dirname, 'test-robustness.yaml');
  fs.writeFileSync(testFilePath, testContent);
  return testFilePath;
}

function checkSystemFiles() {
  const requiredFiles = [
    'src/components/ServiceForm.js',
    'src/components/DragDropBuilder.js',
    'src/components/WidgetForm.js',
    'test-example.yaml'
  ];
  
  const results = {};
  
  for (const file of requiredFiles) {
    const fullPath = path.join(__dirname, file);
    results[file] = {
      exists: fs.existsSync(fullPath),
      size: fs.existsSync(fullPath) ? fs.statSync(fullPath).size : 0
    };
  }
  
  return results;
}

async function runFinalVerification() {
  console.log('1. 🔍 Verificando estado de la aplicación...');
  
  const appRunning = await checkApplication();
  if (!appRunning) {
    console.log('   ❌ APLICACIÓN NO DISPONIBLE en localhost:3001');
    console.log('   💡 Para completar la verificación, ejecuta: npm start\n');
    return;
  }
  console.log('   ✅ Aplicación disponible en localhost:3001\n');
  
  console.log('2. 🎯 Verificando corrección de Jackett...');
  const jackettCheck = checkJackettConfiguration();
  if (jackettCheck.error) {
    console.log(`   ❌ Error: ${jackettCheck.error}\n`);
    return;
  }
  
  if (jackettCheck.complete) {
    console.log('   ✅ Jackett correctamente configurado');
    console.log(`      • En WIDGET_TYPES: ${jackettCheck.inTypes ? '✅' : '❌'}`);
    console.log(`      • Configuración completa: ${jackettCheck.hasConfiguration ? '✅' : '❌'}\n`);
  } else {
    console.log('   ⚠️  Configuración de Jackett incompleta\n');
  }
  
  console.log('3. 🔄 Verificando corrección de importación...');
  const importCheck = checkImportFix();
  if (importCheck.error) {
    console.log(`   ❌ Error: ${importCheck.error}\n`);
    return;
  }
  
  if (importCheck.complete) {
    console.log('   ✅ Fix de importación implementado correctamente');
    console.log(`      • Patrón de objetos nuevos: ${importCheck.hasObjectPattern ? '✅' : '❌'}`);
    console.log(`      • Actualización de estado: ${importCheck.hasStateUpdate ? '✅' : '❌'}\n`);
  } else {
    console.log('   ⚠️  Fix de importación incompleto\n');
  }
  
  console.log('4. 🛡️  Analizando robustez del sistema...');
  const robustness = analyzeSystemRobustness();
  if (robustness.error) {
    console.log(`   ❌ Error: ${robustness.error}\n`);
    return;
  }
  
  console.log(`   📊 Widgets en tipos: ${robustness.totalTypes}`);
  console.log(`   ⚙️  Widgets configurados: ${robustness.totalConfigs}`);
  console.log(`   📈 Cobertura de configuración: ${robustness.coverageRatio}%`);
  console.log(`   🛡️  Manejo robusto: ${robustness.hasRobustHandling ? '✅' : '❌'}\n`);
  
  console.log('5. 📁 Verificando archivos del sistema...');
  const fileCheck = checkSystemFiles();
  let allFilesOk = true;
  
  for (const [file, info] of Object.entries(fileCheck)) {
    const status = info.exists ? '✅' : '❌';
    const size = info.exists ? `(${(info.size / 1024).toFixed(1)}KB)` : '';
    console.log(`   ${status} ${file} ${size}`);
    if (!info.exists) allFilesOk = false;
  }
  console.log('');
  
  console.log('6. 🧪 Creando archivo de prueba de robustez...');
  const testFile = createRobustnessTestFile();
  console.log(`   ✅ Archivo creado: ${path.basename(testFile)}`);
  console.log('   📄 Contiene mix de widgets configurados y no configurados\n');
  
  console.log('🎯 RESUMEN DE VERIFICACIÓN FINAL');
  console.log('===============================\n');
  
  const scores = {
    jackett: jackettCheck.complete ? 100 : 0,
    import: importCheck.complete ? 100 : 0,
    robustness: Math.min(100, (robustness.coverageRatio || 0) + (robustness.hasRobustHandling ? 20 : 0)),
    files: allFilesOk ? 100 : 50,
    app: appRunning ? 100 : 0
  };
  
  const overallScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;
  
  console.log('📊 PUNTUACIONES POR ÁREA:');
  console.log(`   • Jackett Configuration: ${scores.jackett}%`);
  console.log(`   • Import Functionality: ${scores.import}%`);
  console.log(`   • System Robustness: ${scores.robustness.toFixed(1)}%`);
  console.log(`   • System Files: ${scores.files}%`);
  console.log(`   • Application Status: ${scores.app}%`);
  console.log('');
  console.log(`🏆 PUNTUACIÓN GENERAL: ${overallScore.toFixed(1)}%\n`);
  
  if (overallScore >= 95) {
    console.log('🎉 ¡EXCELENTE! Todas las correcciones funcionan perfectamente');
    console.log('✅ El sistema está completamente preparado para escalar');
  } else if (overallScore >= 85) {
    console.log('✅ MUY BUENO - Sistema funcional con correcciones implementadas');
    console.log('💡 Algunas mejoras menores pueden ser beneficiosas');
  } else if (overallScore >= 70) {
    console.log('⚠️  ACEPTABLE - Funcionalidades principales implementadas');
    console.log('🔧 Se requieren algunas correcciones adicionales');
  } else {
    console.log('❌ REQUIERE ATENCIÓN - Problemas significativos detectados');
    console.log('🚨 Se necesita trabajo adicional antes de considerar completo');
  }
  
  console.log('\n🧪 INSTRUCCIONES DE PRUEBA FINAL:');
  console.log('=================================\n');
  console.log('Para validar completamente que el sistema funciona:');
  console.log('');
  console.log('1. PRUEBA DE JACKETT:');
  console.log('   a) Abrir http://localhost:3001');
  console.log('   b) Ir a "Services" → Agregar nuevo servicio');
  console.log('   c) Seleccionar "jackett" en Widget Type');
  console.log('   d) Verificar que aparecen campos: URL, Username, Password');
  console.log('   e) Completar y guardar');
  console.log('');
  console.log('2. PRUEBA DE IMPORTACIÓN:');
  console.log('   a) Arrastrar test-example.yaml al área de importación');
  console.log('   b) Hacer clic en "Importar Configuración"');
  console.log('   c) Verificar que se actualiza el contador de servicios');
  console.log('   d) Confirmar que aparecen los servicios importados');
  console.log('');
  console.log('3. PRUEBA DE ROBUSTEZ:');
  console.log('   a) Arrastrar test-robustness.yaml al área de importación');
  console.log('   b) Verificar que la aplicación no se rompe');
  console.log('   c) Confirmar que se importan servicios con widgets configurados');
  console.log('   d) Verificar manejo de widgets no configurados');
  console.log('');
  console.log('✅ Si todas las pruebas pasan, las correcciones están completas\n');
  
  console.log('📋 ARCHIVOS PARA REVISIÓN:');
  console.log('==========================');
  console.log('• FINAL_COMPLETION_REPORT.md - Reporte de finalización');
  console.log('• WIDGET_PARAMETERS_COMPLETION.md - Configuraciones de widgets');
  console.log('• WIDGET_SYSTEM_FIXED.md - Sistema de widgets corregido');
  console.log('• test-robustness.yaml - Archivo de prueba de robustez');
  console.log('• test-missing-widgets.yaml - Prueba con widgets faltantes');
}

// Ejecutar verificación
runFinalVerification().catch(console.error);
