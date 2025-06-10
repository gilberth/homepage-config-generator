#!/bin/bash

# Diagnóstico de la Aplicación Homepage Config Generator
echo "🔍 Diagnóstico de la Aplicación Homepage Config Generator"
echo "=================================================="

# Verificar si Node.js está instalado
echo "📦 Verificando Node.js..."
if command -v node &> /dev/null; then
    echo "✅ Node.js versión: $(node --version)"
else
    echo "❌ Node.js no está instalado"
    exit 1
fi

# Verificar si npm está instalado
echo "📦 Verificando npm..."
if command -v npm &> /dev/null; then
    echo "✅ npm versión: $(npm --version)"
else
    echo "❌ npm no está instalado"
    exit 1
fi

# Verificar si estamos en el directorio correcto
echo "📁 Verificando directorio de trabajo..."
if [ -f "package.json" ]; then
    echo "✅ Archivo package.json encontrado"
else
    echo "❌ No se encontró package.json - asegúrate de estar en el directorio correcto"
    exit 1
fi

# Verificar dependencias
echo "📚 Verificando dependencias..."
if [ -d "node_modules" ]; then
    echo "✅ Directorio node_modules existe"
else
    echo "⚠️  Directorio node_modules no existe - ejecutando npm install..."
    npm install
fi

# Verificar puertos ocupados
echo "🌐 Verificando puertos..."
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null; then
    echo "⚠️  Puerto 3001 está ocupado"
    echo "   Proceso en puerto 3001: $(lsof -Pi :3001 -sTCP:LISTEN | tail -n 1)"
else
    echo "✅ Puerto 3001 está libre"
fi

if lsof -Pi :3002 -sTCP:LISTEN -t >/dev/null; then
    echo "⚠️  Puerto 3002 está ocupado"
    echo "   Proceso en puerto 3002: $(lsof -Pi :3002 -sTCP:LISTEN | tail -n 1)"
else
    echo "✅ Puerto 3002 está libre"
fi

# Verificar archivos críticos
echo "📄 Verificando archivos críticos..."
critical_files=(
    "src/App.js"
    "src/index.js"
    "src/contexts/ThemeContext.js"
    "src/components/DragDropBuilder.js"
    "src/components/ThemeToggle.js"
    "public/index.html"
)

for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - FALTANTE"
    fi
done

# Verificar si la aplicación puede compilar
echo "🔨 Verificando compilación..."
echo "   Ejecutando verificación de sintaxis..."

# Crear un build de prueba para verificar errores
if npm run build > /tmp/build_output.log 2>&1; then
    echo "✅ La aplicación compila correctamente"
else
    echo "❌ Error en la compilación:"
    tail -n 10 /tmp/build_output.log
fi

echo "=================================================="
echo "🎯 Recomendaciones para iniciar la aplicación:"
echo ""
echo "1. Si todo está ✅, ejecuta:"
echo "   npm start"
echo ""
echo "2. Si hay problemas con puertos, usa:"
echo "   PORT=3003 npm start"
echo ""
echo "3. Si hay errores de dependencias:"
echo "   rm -rf node_modules package-lock.json"
echo "   npm install"
echo ""
echo "4. Para forzar un puerto específico:"
echo "   PORT=3002 npm start"
echo ""
echo "🌐 La aplicación debería estar disponible en:"
echo "   http://localhost:3001 (o el puerto que se asigne)"
echo "=================================================="
