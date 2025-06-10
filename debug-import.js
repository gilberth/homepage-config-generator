// Debug script para importación de archivos
import { importHomepageConfig, parseYamlFile } from '../src/utils/configUtils.js';

// Función de debugging para el proceso de importación
const debugImport = async () => {
  try {
    console.log('🔍 Iniciando debugging de importación...');
    
    // Simular archivo example.yaml
    const exampleYamlContent = `---
- Core Infrastructure:
    - Proxmox PVE-01:
        icon: proxmox.png
        href: https://proxmox.local.gytech.com.pe/
        description: "Primary Hypervisor | VM Orchestration"
        widget:
          type: proxmox
          url: https://proxmox.local.gytech.com.pe/
          key: enteryourkeyhere
- Storage & Networking:
    - TrueNAS Scale:
        icon: truenas-scale.png
        href: https://truenas.local.gytech.com.pe/
        description: "ZFS Storage Cluster | 10Gb SAN"
        widget:
          type: truenas
          url: http://10.10.10.176/
          key: 4-hwyY03b4HBTKG0o4ixcOso8niTY5MzG2UPoMAieLUIqdU8qEJWcYLSud5Q5Ac60R`;

    console.log('📄 Contenido YAML:', exampleYamlContent);
    
    // Crear un blob simulando el archivo
    const blob = new Blob([exampleYamlContent], { type: 'text/yaml' });
    const file = new File([blob], 'example.yaml', { type: 'text/yaml' });
    
    console.log('📁 Archivo creado:', file);
    
    // Parsear el archivo
    const parsedData = await parseYamlFile(file);
    console.log('📊 Datos parseados:', parsedData);
    
    // Importar la configuración
    const importedConfig = await importHomepageConfig([file]);
    console.log('⚙️ Configuración importada:', importedConfig);
    
    console.log('✅ Debugging completado');
    
  } catch (error) {
    console.error('❌ Error durante debugging:', error);
  }
};

// Ejecutar debugging
debugImport();
