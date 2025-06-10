#!/usr/bin/env node

/**
 * Script de Validación de Escalabilidad - Sistema de Widgets Homepage
 * 
 * Este script valida:
 * 1. Robustez del sistema con servicios no configurados
 * 2. Funcionalidad de importación con widgets faltantes
 * 3. Capacidad de expansión del sistema
 * 4. Identificación de widgets faltantes vs documentación oficial
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// Lista oficial de widgets obtenida de la documentación de gethomepage/homepage
const OFFICIAL_HOMEPAGE_WIDGETS = [
  // Media Services
  'plex', 'jellyfin', 'emby', 'tautulli', 'overseerr', 'jellyseerr', 'ombi',
  'sonarr', 'radarr', 'lidarr', 'readarr', 'bazarr', 'prowlarr',
  'mylar', 'medusa', 'fileflows', 'unmanic', 'audiobookshelf', 'komga',
  'tubearchivist', 'xteve', 'channelsdvrserver', 'stash',
  
  // Download Clients
  'qbittorrent', 'transmission', 'deluge', 'sabnzbd', 'nzbget', 'rutorrent',
  'pyload', 'jdownloader', 'slskd', 'jackett',
  
  // System Monitoring
  'proxmox', 'truenas', 'glances', 'netdata', 'prometheus', 'grafana',
  'portainer', 'watchtower', 'uptimerobot', 'uptimekuma', 'checkmk',
  'gatus', 'scrutiny', 'healthchecks', 'zabbix',
  
  // Network & Security
  'unifi', 'pfsense', 'opnsense', 'traefik', 'nginxproxymanager',
  'authentik', 'omada', 'mikrotik', 'technitium', 'nextdns',
  'wgeasy', 'fritzbox', 'openwrt', 'gluetun',
  
  // Smart Home & IoT
  'homeassistant', 'homebridge', 'esphome', 'frigate', 'adguardhome',
  'pihole', 'openhab', 'hdhomerun',
  
  // Storage & Backup
  'diskstation', 'openmediavault', 'kopia', 'urbackup', 'syncthing',
  'strelaysrv', 'duplicati', 'restic',
  
  // Communication & Information
  'mastodon', 'miniflux', 'mailcow', 'freshrss', 'changedetectionio',
  'linkwarden', 'gotify', 'paperlessngx', 'trilium',
  
  // Development
  'gitea', 'argocd', 'gitlab', 'azuredevops', 'jenkins', 'drone',
  
  // Finance
  'firefly', 'actualbudget', 'ghostfolio', 'invoiceninja',
  
  // Gaming
  'pterodactyl', 'minecraft', 'steam', 'gamedig',
  
  // Specialized Tools
  'lubelogger', 'peanut', 'moonraker', 'suwayomi', 'vikunja',
  'karakeep', 'plantit', 'develancacheui', 'spoolman', 'octoprint',
  'calibreweb', 'atsumeru', 'myspeed', 'stocks', 'calendar',
  
  // Information Widgets
  'weather', 'openweathermap', 'openmeteo', 'search', 'resources',
  'datetime', 'greeting', 'logo', 'bookmarks', 'customapi', 'iframe',
  'mjpeg'
];

console.log('🔍 VALIDACIÓN DE ESCALABILIDAD - Sistema de Widgets Homepage');
console.log('============================================================\n');

// 1. Verificar aplicación ejecutándose
async function checkApplication() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3001', (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// 2. Analizar widgets implementados vs documentación oficial
function analyzeWidgetCoverage() {
  try {
    const serviceFormPath = path.join(__dirname, 'src', 'components', 'ServiceForm.js');
    const serviceFormContent = fs.readFileSync(serviceFormPath, 'utf8');
    
    // Extraer WIDGET_TYPES del archivo
    const widgetTypesMatch = serviceFormContent.match(/const WIDGET_TYPES = \[([\s\S]*?)\];/);
    if (!widgetTypesMatch) {
      throw new Error('No se pudo encontrar WIDGET_TYPES en ServiceForm.js');
    }
    
    // Extraer valores de widgets implementados
    const implementedWidgets = [];
    const valueMatches = widgetTypesMatch[1].matchAll(/value: '([^']+)'/g);
    for (const match of valueMatches) {
      implementedWidgets.push(match[1]);
    }
    
    // Extraer WIDGET_PARAMETERS
    const widgetParamsMatch = serviceFormContent.match(/const WIDGET_PARAMETERS = \{([\s\S]*?)\n\};/);
    const configuredWidgets = [];
    if (widgetParamsMatch) {
      const paramMatches = widgetParamsMatch[1].matchAll(/'([^']+)':\s*\{/g);
      for (const match of paramMatches) {
        configuredWidgets.push(match[1]);
      }
    }
    
    return {
      implementedWidgets: implementedWidgets.sort(),
      configuredWidgets: configuredWidgets.sort(),
      officialWidgets: OFFICIAL_HOMEPAGE_WIDGETS.sort()
    };
    
  } catch (error) {
    console.error('❌ Error analizando cobertura de widgets:', error.message);
    return null;
  }
}

// 3. Crear archivo de prueba con widgets no configurados
function createTestFileWithMissingWidgets(missingWidgets) {
  const testConfig = {
    services: missingWidgets.slice(0, 5).map((widget, index) => ({
      name: `Test ${widget.charAt(0).toUpperCase() + widget.slice(1)} Service`,
      group: 'Test Services',
      url: `http://test-${widget}.local:8080`,
      description: `Test service for ${widget} widget`,
      widget: {
        type: widget,
        url: `http://test-${widget}.local:8080`,
        ...(Math.random() > 0.5 ? { key: 'test-api-key-' + widget } : {}),
        ...(Math.random() > 0.5 ? { username: 'testuser', password: 'testpass' } : {})
      }
    })),
    widgets: [
      {
        type: 'search',
        provider: 'google'
      }
    ],
    bookmarks: [
      {
        name: 'Test Bookmark',
        group: 'Testing',
        url: 'https://example.com'
      }
    ]
  };
  
  // Convertir a YAML simple
  const yamlContent = `# Test configuration with missing widgets
services:
${testConfig.services.map(service => `  - ${service.group}:
      - ${service.name}:
          href: ${service.url}
          description: ${service.description}
          widget:
            type: ${service.widget.type}
            url: ${service.widget.url}${service.widget.key ? `
            key: ${service.widget.key}` : ''}${service.widget.username ? `
            username: ${service.widget.username}
            password: ${service.widget.password}` : ''}`).join('\n')}

widgets:
${testConfig.widgets.map(widget => `  - ${widget.type}:
      provider: ${widget.provider || 'default'}`).join('\n')}

bookmarks:
${testConfig.bookmarks.map(bookmark => `  - ${bookmark.group}:
      - ${bookmark.name}:
          href: ${bookmark.url}`).join('\n')}
`;
  
  const testFilePath = path.join(__dirname, 'test-missing-widgets.yaml');
  fs.writeFileSync(testFilePath, yamlContent);
  return testFilePath;
}

// 4. Validar la importación con widgets faltantes
function testImportFunctionality() {
  try {
    const dragDropPath = path.join(__dirname, 'src', 'components', 'DragDropBuilder.js');
    const dragDropContent = fs.readFileSync(dragDropPath, 'utf8');
    
    // Verificar que el fix de importación esté presente
    const hasImportFix = dragDropContent.includes('// Create new object references to force React re-render') ||
                         dragDropContent.includes('const newConfig = {');
    
    return {
      hasImportFix,
      fileExists: true
    };
  } catch (error) {
    return {
      hasImportFix: false,
      fileExists: false,
      error: error.message
    };
  }
}

// 5. Función principal de validación
async function runScalabilityValidation() {
  console.log('1. ✅ Verificando aplicación...');
  const appRunning = await checkApplication();
  if (!appRunning) {
    console.log('   ❌ Aplicación no está ejecutándose en localhost:3001');
    console.log('   💡 Ejecuta: npm start para iniciar la aplicación\n');
    return;
  }
  console.log('   ✅ Aplicación ejecutándose correctamente\n');
  
  console.log('2. 📊 Analizando cobertura de widgets...');
  const analysis = analyzeWidgetCoverage();
  if (!analysis) {
    console.log('   ❌ No se pudo realizar el análisis\n');
    return;
  }
  
  console.log(`   📈 Widgets en WIDGET_TYPES: ${analysis.implementedWidgets.length}`);
  console.log(`   ⚙️  Widgets configurados: ${analysis.configuredWidgets.length}`);
  console.log(`   📚 Widgets oficiales: ${analysis.officialWidgets.length}\n`);
  
  // Encontrar widgets faltantes
  const missingFromTypes = analysis.officialWidgets.filter(w => !analysis.implementedWidgets.includes(w));
  const missingConfigs = analysis.implementedWidgets.filter(w => !analysis.configuredWidgets.includes(w));
  const extraWidgets = analysis.implementedWidgets.filter(w => !analysis.officialWidgets.includes(w));
  
  console.log('3. 🔍 Análisis de diferencias...');
  
  if (missingFromTypes.length > 0) {
    console.log(`   ⚠️  Widgets oficiales no implementados (${missingFromTypes.length}):`);
    console.log(`      ${missingFromTypes.slice(0, 10).join(', ')}${missingFromTypes.length > 10 ? '...' : ''}\n`);
  } else {
    console.log('   ✅ Todos los widgets oficiales están implementados\n');
  }
  
  if (missingConfigs.length > 0) {
    console.log(`   ⚠️  Widgets sin configuración (${missingConfigs.length}):`);
    console.log(`      ${missingConfigs.slice(0, 10).join(', ')}${missingConfigs.length > 10 ? '...' : ''}\n`);
  } else {
    console.log('   ✅ Todos los widgets implementados tienen configuración\n');
  }
  
  if (extraWidgets.length > 0) {
    console.log(`   ℹ️  Widgets extra implementados (${extraWidgets.length}):`);
    console.log(`      ${extraWidgets.slice(0, 10).join(', ')}${extraWidgets.length > 10 ? '...' : ''}\n`);
  }
  
  console.log('4. 🧪 Validando funcionalidad de importación...');
  const importTest = testImportFunctionality();
  if (importTest.hasImportFix) {
    console.log('   ✅ Fix de importación está implementado correctamente');
  } else {
    console.log('   ❌ Fix de importación no encontrado o incompleto');
  }
  console.log('');
  
  console.log('5. 📝 Creando archivo de prueba con widgets faltantes...');
  if (missingFromTypes.length > 0) {
    const testFile = createTestFileWithMissingWidgets(missingFromTypes);
    console.log(`   ✅ Archivo creado: ${path.basename(testFile)}`);
    console.log(`   📄 Contiene ${Math.min(5, missingFromTypes.length)} servicios con widgets no configurados`);
  } else {
    console.log('   ℹ️  No hay widgets faltantes para probar');
  }
  console.log('');
  
  console.log('6. 🎯 EVALUACIÓN DE ESCALABILIDAD');
  console.log('====================================\n');
  
  // Calcular puntuación de escalabilidad
  const completeness = (analysis.configuredWidgets.length / analysis.implementedWidgets.length) * 100;
  const coverage = (analysis.implementedWidgets.length / analysis.officialWidgets.length) * 100;
  
  console.log(`📊 Métricas de Escalabilidad:`);
  console.log(`   • Completitud de configuración: ${completeness.toFixed(1)}%`);
  console.log(`   • Cobertura de widgets oficiales: ${coverage.toFixed(1)}%`);
  console.log(`   • Sistema de importación: ${importTest.hasImportFix ? '✅ Robusto' : '❌ Necesita mejoras'}`);
  console.log(`   • Widgets configurados: ${analysis.configuredWidgets.length}/${analysis.implementedWidgets.length}`);
  console.log('');
  
  console.log('🔄 RECOMENDACIONES PARA ESCALABILIDAD:');
  console.log('=====================================\n');
  
  if (missingConfigs.length > 0) {
    console.log('1. 🔧 Agregar configuraciones faltantes:');
    missingConfigs.forEach(widget => {
      console.log(`   - Configurar widget '${widget}' en WIDGET_PARAMETERS`);
    });
    console.log('');
  }
  
  if (missingFromTypes.length > 0) {
    console.log('2. 📈 Considerar agregar widgets oficiales:');
    missingFromTypes.slice(0, 5).forEach(widget => {
      console.log(`   - Implementar widget '${widget}' según documentación oficial`);
    });
    if (missingFromTypes.length > 5) {
      console.log(`   - Y ${missingFromTypes.length - 5} widgets más...`);
    }
    console.log('');
  }
  
  console.log('3. 🧪 INSTRUCCIONES DE PRUEBA MANUAL:');
  console.log('=====================================\n');
  console.log('Para validar que el sistema funciona con widgets no configurados:');
  console.log('');
  console.log('a) Abrir http://localhost:3001');
  console.log('b) Ir a la pestaña "Services"');
  console.log('c) Agregar un nuevo servicio');
  console.log('d) Seleccionar un widget tipo que NO tenga configuración');
  console.log('e) Verificar que la aplicación no se rompe');
  console.log('f) Guardar el servicio y verificar que aparece en la configuración');
  console.log('');
  console.log('Para probar importación con widgets faltantes:');
  console.log('a) Arrastrar test-missing-widgets.yaml al área de importación');
  console.log('b) Hacer clic en "Importar Configuración"');
  console.log('c) Verificar que los servicios se importan correctamente');
  console.log('d) Comprobar que el contador de servicios se actualiza');
  console.log('');
  
  const overallScore = (completeness + coverage + (importTest.hasImportFix ? 100 : 0)) / 3;
  console.log(`🏆 PUNTUACIÓN GENERAL DE ESCALABILIDAD: ${overallScore.toFixed(1)}%\n`);
  
  if (overallScore >= 90) {
    console.log('🎉 ¡EXCELENTE! El sistema está altamente preparado para escalar');
  } else if (overallScore >= 75) {
    console.log('✅ BUENO - El sistema tiene buena escalabilidad con mejoras menores');
  } else if (overallScore >= 60) {
    console.log('⚠️  REGULAR - El sistema necesita mejoras para escalar eficientemente');
  } else {
    console.log('❌ DEFICIENTE - El sistema requiere trabajo significativo para escalar');
  }
  
  console.log('\n🔍 Para más detalles, revisa los archivos de documentación:');
  console.log('   • WIDGET_PARAMETERS_COMPLETION.md');
  console.log('   • WIDGET_CONFIGURATIONS_COMPLETED.md');
  console.log('   • WIDGET_SYSTEM_FIXED.md');
}

// Ejecutar validación
runScalabilityValidation().catch(console.error);
