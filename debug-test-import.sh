#!/bin/bash

# Script para probar la importación usando curl y verificar el estado

echo "🔍 TESTING IMPORT FUNCTIONALITY"
echo "================================"

# 1. Verificar que la aplicación esté ejecutándose
echo "1. Verificando que la aplicación esté activa..."
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ Aplicación ejecutándose en http://localhost:3001"
else
    echo "❌ Aplicación no disponible en puerto 3001"
    exit 1
fi

# 2. Verificar que el archivo de prueba existe
if [ -f "test-example.yaml" ]; then
    echo "✅ Archivo test-example.yaml encontrado"
else
    echo "❌ Archivo test-example.yaml no encontrado"
    exit 1
fi

# 3. Mostrar contenido del archivo de prueba
echo ""
echo "📄 Contenido del archivo de prueba:"
echo "=================================="
cat test-example.yaml

# 4. Instrucciones para debugging manual
echo ""
echo "🔧 INSTRUCCIONES PARA DEBUGGING MANUAL:"
echo "======================================"
echo "1. Abrir http://localhost:3001 en el navegador"
echo "2. Abrir Developer Tools (F12)"
echo "3. Ir a la pestaña Console"
echo "4. Arrastrar el archivo test-example.yaml al área de importación"
echo "5. O usar 'Seleccionar Archivos' y seleccionar test-example.yaml"
echo "6. Hacer clic en 'Importar Configuración'"
echo "7. Observar los logs en la consola"
echo ""
echo "📊 LOGS ESPERADOS:"
echo "=================="
echo "- 🚀 INICIANDO IMPORTACIÓN EN DRAGDROPBUILDER"
echo "- 🔍 Iniciando importación de archivos"
echo "- 📄 Procesando archivo: test-example.yaml"
echo "- 🔧 Procesando como archivo de servicios"
echo "- ✅ Servicios convertidos: [array con 6 servicios]"
echo "- 📊 CONFIG IMPORTADA EN DRAGDROPBUILDER"
echo "- ⚡ Actualizando estado con setConfig..."
echo "- 🔄 ESTADO CONFIG CAMBIÓ"
echo "- 🔄 isConfigLoaded CAMBIÓ A: true"
echo ""
echo "📋 RESULTADO ESPERADO:"
echo "====================="
echo "- El cuadro DEBUG Estado debe mostrar:"
echo "  • isConfigLoaded: SÍ"
echo "  • Servicios: 6"
echo "  • Widgets: 0"
echo "  • Bookmarks: 0"
echo ""
echo "- El mensaje de estado debe mostrar:"
echo "  'Configuración importada activa - Total: 6 servicios, 0 widgets, 0 marcadores'"
echo ""
echo "- La pestaña Services debe mostrar 6 servicios agrupados en:"
echo "  • Development (2 servicios)"
echo "  • Infrastructure (2 servicios)"  
echo "  • Media (2 servicios)"
echo ""
echo "🐛 SI EL PROBLEMA PERSISTE:"
echo "=========================="
echo "- Si los logs muestran que los datos se procesan correctamente"
echo "- Pero el DEBUG Estado sigue mostrando 0 servicios"
echo "- Entonces el problema está en la actualización del estado React"
echo "- NO en la lógica de importación"
echo ""
echo "🔧 DEBUGGING AVANZADO:"
echo "====================="
echo "- En la consola del navegador, ejecutar:"
echo "  window.React = require('react')"
echo "  console.log('Estado actual:', window.React);"
echo ""
echo "✅ ¡Aplicación lista para debugging!"
