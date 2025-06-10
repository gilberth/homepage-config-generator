// Script para debuggear el problema de importación
// Problema: "Total: 0 servicios, 0 widgets, 0 marcadores" después de importación

const yaml = require('js-yaml');
const fs = require('fs');

// Simular la función parseYamlFile
const parseYamlFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return yaml.load(fileContent);
};

// Función convertServicesToInternal con más logging
const convertServicesToInternal = (servicesData) => {
  console.log('🔧 INICIO convertServicesToInternal');
  console.log('📊 Tipo de datos recibidos:', typeof servicesData);
  console.log('📊 Es array:', Array.isArray(servicesData));
  console.log('📊 Datos recibidos:', JSON.stringify(servicesData, null, 2));
  
  const services = [];
  
  if (Array.isArray(servicesData)) {
    console.log(`📦 Procesando array con ${servicesData.length} elementos`);
    
    servicesData.forEach((categoryObj, categoryIndex) => {
      console.log(`\n📂 === CATEGORIA ${categoryIndex} ===`);
      console.log('📂 Objeto categoría:', JSON.stringify(categoryObj, null, 2));
      
      if (typeof categoryObj === 'object' && categoryObj !== null) {
        Object.entries(categoryObj).forEach(([categoryName, serviceList]) => {
          console.log(`\n📁 Nombre categoría: "${categoryName}"`);
          console.log('📁 Lista servicios tipo:', typeof serviceList);
          console.log('📁 Lista servicios es array:', Array.isArray(serviceList));
          console.log('📁 Lista servicios:', JSON.stringify(serviceList, null, 2));
          
          if (Array.isArray(serviceList)) {
            console.log(`🔧 Procesando ${serviceList.length} servicios en "${categoryName}"`);
            
            serviceList.forEach((serviceObj, serviceIndex) => {
              console.log(`\n🔧 === SERVICIO ${serviceIndex} ===`);
              console.log('🔧 Objeto servicio:', JSON.stringify(serviceObj, null, 2));
              
              if (typeof serviceObj === 'object' && serviceObj !== null) {
                Object.entries(serviceObj).forEach(([serviceName, serviceConfig]) => {
                  console.log(`\n⚙️ Nombre servicio: "${serviceName}"`);
                  console.log('⚙️ Config tipo:', typeof serviceConfig);
                  console.log('⚙️ Config:', JSON.stringify(serviceConfig, null, 2));
                  
                  // Manejar tanto objetos como strings simples
                  const config = typeof serviceConfig === 'string' 
                    ? { href: serviceConfig } 
                    : serviceConfig;
                    
                  const serviceItem = {
                    id: `imported_service_${categoryIndex}_${serviceIndex}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    name: serviceName,
                    href: config.href || '',
                    description: config.description || '',
                    group: categoryName,
                    icon: config.icon || 'mdi-web',
                    // Incluir widget si existe
                    ...(config.widget && { widget: config.widget }),
                    // Incluir otras propiedades si existen
                    ...(config.siteMonitor && { siteMonitor: config.siteMonitor })
                  };
                  
                  console.log(`✅ Servicio creado:`, JSON.stringify(serviceItem, null, 2));
                  services.push(serviceItem);
                });
              } else {
                console.log('❌ serviceObj no es un objeto válido');
              }
            });
          } else {
            console.log('❌ serviceList no es un array');
          }
        });
      } else {
        console.log('❌ categoryObj no es un objeto válido');
      }
    });
  } else {
    console.log('❌ servicesData no es un array');
  }
  
  console.log(`\n🎯 RESULTADO FINAL: ${services.length} servicios convertidos`);
  console.log('🎯 Servicios:', JSON.stringify(services, null, 2));
  return services;
};

// Test con el archivo example.yaml del usuario
const testFile = '/Users/gilberth/Downloads/homepage-config-generator/test-example.yaml';

console.log('🔍 INICIANDO DEBUG DE IMPORTACIÓN');
console.log('📄 Archivo a procesar:', testFile);

try {
  if (fs.existsSync(testFile)) {
    console.log('✅ Archivo encontrado, parseando...');
    const parsedData = parseYamlFile(testFile);
    
    console.log('\n📊 DATOS PARSEADOS:');
    console.log('📊 Tipo:', typeof parsedData);
    console.log('📊 Es array:', Array.isArray(parsedData));
    console.log('📊 Keys:', Object.keys(parsedData || {}));
    console.log('📊 Data completa:', JSON.stringify(parsedData, null, 2));
    
    console.log('\n🔧 INICIANDO CONVERSIÓN...');
    const convertedServices = convertServicesToInternal(parsedData);
    
    console.log('\n🎯 RESULTADO FINAL DE LA CONVERSIÓN:');
    console.log(`🎯 Total servicios: ${convertedServices.length}`);
    console.log('🎯 Servicios convertidos:', JSON.stringify(convertedServices, null, 2));
    
  } else {
    console.log('❌ Archivo no encontrado:', testFile);
  }
} catch (error) {
  console.error('❌ ERROR:', error);
}
