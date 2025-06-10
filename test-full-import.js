// Test completo del flujo de importación para encontrar dónde se pierden los datos

const { importHomepageConfig, parseYamlFile } = require('./src/utils/configUtils.js');
const fs = require('fs');

// Crear un archivo simulado para el test
const createMockFile = (content, name) => {
  return {
    name: name,
    text: () => Promise.resolve(content)
  };
};

// Simular la función parseYamlFile para usar content directo
const yaml = require('js-yaml');

const testImportFlow = async () => {
  console.log('🔍 INICIANDO TEST COMPLETO DE IMPORTACIÓN');
  
  const yamlContent = `---
- Development:
    - GitHub:
        href: https://github.com
        description: Code repositories
        icon: si-github
        widget:
          type: github
          url: https://github.com
          username: user
          password: pass
    - GitLab:
        href: https://gitlab.com
        description: Git hosting
        icon: si-gitlab

- Infrastructure:
    - Proxmox:
        href: https://proxmox.local:8006
        description: Virtual Environment
        icon: si-proxmox
        widget:
          type: proxmox
          url: https://proxmox.local:8006
          username: admin@pam!token
          password: secret
`;

  // Crear un mock file
  const mockFile = {
    name: 'services.yaml',
    stream: () => {
      return new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(yamlContent));
          controller.close();
        }
      });
    },
    text: () => Promise.resolve(yamlContent),
    size: yamlContent.length,
    type: 'application/x-yaml'
  };

  console.log('📄 Mock file creado:', mockFile.name);
  
  try {
    console.log('\n🚀 Llamando a importHomepageConfig...');
    const result = await importHomepageConfig([mockFile]);
    
    console.log('\n🎯 RESULTADO FINAL DE IMPORTACIÓN:');
    console.log('📊 Servicios:', result.services.length);
    console.log('📊 Widgets:', result.widgets.length);  
    console.log('📊 Bookmarks:', result.bookmarks.length);
    console.log('\n📋 Detalle de servicios:');
    result.services.forEach((service, index) => {
      console.log(`  ${index + 1}. ${service.name} (${service.group})`);
    });
    
    return result;
    
  } catch (error) {
    console.error('❌ ERROR EN IMPORTACIÓN:', error);
    console.error('❌ Stack:', error.stack);
  }
};

testImportFlow();
