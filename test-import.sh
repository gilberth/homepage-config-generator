#!/bin/bash

# Script para validar la importación de archivos YAML

echo "🔍 Iniciando validación de importación de archivos YAML"
echo ""

# Verificar que la aplicación esté ejecutándose
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ Aplicación está ejecutándose en http://localhost:3001"
else
    echo "❌ Aplicación no está ejecutándose. Iniciando..."
    cd /Users/gilberth/Downloads/homepage-config-generator
    npm start &
    sleep 5
fi

echo ""
echo "📁 Verificando archivos de ejemplo disponibles:"

# Verificar archivos de ejemplo
if [ -f "/Users/gilberth/Desktop/config/example.yaml" ]; then
    echo "✅ example.yaml encontrado"
    echo "📊 Primeras líneas del archivo:"
    head -10 "/Users/gilberth/Desktop/config/example.yaml"
else
    echo "❌ example.yaml no encontrado en /Users/gilberth/Desktop/config/"
fi

echo ""
echo "📂 Verificando archivos en /config/:"
ls -la /Users/gilberth/Downloads/homepage-config-generator/config/

echo ""
echo "🎯 Para probar la importación:"
echo "1. Abre http://localhost:3001"
echo "2. Arrastra el archivo example.yaml al área de importación"
echo "3. Haz clic en 'Importar Configuración'"
echo "4. Revisa la consola del navegador para ver los logs de debugging"

echo ""
echo "🔧 Para ver logs en tiempo real, abre la consola del navegador (F12)"
