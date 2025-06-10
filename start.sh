#!/bin/bash

# Homepage Configuration Builder - Script de inicio
echo "🚀 Iniciando Homepage Configuration Builder..."

# Cambiar al directorio del proyecto
cd "/Users/gilberth/Downloads/homepage-config-generator"

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se puede encontrar package.json"
    exit 1
fi

# Verificar dependencias
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

echo "✅ Iniciando servidor de desarrollo..."
echo "🌐 La aplicación se abrirá en http://localhost:3001"
echo "🔧 Para detener el servidor, presiona Ctrl+C"

# Iniciar la aplicación
PORT=3001 npm start
