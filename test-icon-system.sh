#!/bin/bash

# Script para probar las funcionalidades de iconos del Homepage Config Generator
# Fecha: 10 de junio de 2025

echo "🧪 PRUEBAS DEL SISTEMA DE ICONOS - Homepage Config Generator"
echo "=========================================================="
echo ""

# Verificar que el servidor esté corriendo
echo "🔍 Verificando servidor..."
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ Servidor corriendo en http://localhost:3001"
else
    echo "❌ Servidor no encontrado. Iniciando..."
    cd /Users/gilberth/Downloads/homepage-config-generator
    npm start &
    sleep 10
fi

echo ""
echo "📋 CHECKLIST DE PRUEBAS MANUALES"
echo "================================"
echo ""

echo "🎨 ICONOS - SELECTOR AVANZADO:"
echo "  [ ] 1. Abrir formulario de servicios"
echo "  [ ] 2. Hacer click en el campo 'Icon'"
echo "  [ ] 3. Buscar 'docker' - debería mostrar si-docker"
echo "  [ ] 4. Buscar 'home' - debería mostrar mdi-home"
echo "  [ ] 5. Escribir 🏠 - debería permitir emoji"
echo "  [ ] 6. Escribir https://github.com/favicon.ico - debería permitir URL"
echo ""

echo "🔍 BÚSQUEDA DE ICONOS:"
echo "  [ ] 1. Buscar 'github' - ver si-github en resultados"
echo "  [ ] 2. Buscar 'server' - ver mdi-server en resultados"
echo "  [ ] 3. Buscar 'kubernetes' - ver si-kubernetes"
echo "  [ ] 4. Filtrado en tiempo real funciona"
echo ""

echo "📂 CATEGORÍAS:"
echo "  [ ] 1. Ver categoría 'Technology'"
echo "  [ ] 2. Ver categoría 'General'"
echo "  [ ] 3. Ver categoría 'Brand/Simple Icons'"
echo "  [ ] 4. Enlaces a documentación funcionan"
echo ""

echo "⚙️ ESTILOS DE ICONOS:"
echo "  [ ] 1. Ir a Settings tab"
echo "  [ ] 2. Cambiar 'Icon Style' a diferentes opciones"
echo "  [ ] 3. Verificar que se reflejen en preview"
echo "  [ ] 4. Opciones disponibles: gradient, theme, mono, adaptive, auto, original, flat, outline"
echo ""

echo "👁️ VISTA PREVIA:"
echo "  [ ] 1. Agregar servicio con icono mdi-home"
echo "  [ ] 2. Agregar servicio con icono si-docker"
echo "  [ ] 3. Agregar servicio con emoji 🏠"
echo "  [ ] 4. Agregar servicio con URL personalizada"
echo "  [ ] 5. Verificar que todos se muestren en Live Preview"
echo ""

echo "📥 GENERACIÓN YAML:"
echo "  [ ] 1. Configurar servicios con diferentes tipos de iconos"
echo "  [ ] 2. Descargar YAML generado"
echo "  [ ] 3. Verificar que iconos estén correctamente formateados"
echo "  [ ] 4. Verificar iconStyle en settings"
echo ""

echo "📱 RESPONSIVIDAD:"
echo "  [ ] 1. Probar en móvil (DevTools responsive)"
echo "  [ ] 2. Verificar que selector de iconos funcione en pantalla pequeña"
echo "  [ ] 3. Verificar búsqueda en móvil"
echo ""

echo ""
echo "🚀 COMANDOS ÚTILES:"
echo "=================="
echo "  Iniciar servidor:  npm start"
echo "  Abrir aplicación:  open http://localhost:3001"
echo "  Ver logs:          tail -f npm-debug.log"
echo "  Build producción:  npm run build"
echo ""

echo "📚 DOCUMENTACIÓN:"
echo "================"
echo "  📖 Guía completa:  cat ICON_GUIDE.md"
echo "  📋 README:         cat README.md"
echo "  🧪 Resultados:     cat TESTING_RESULTS.md"
echo ""

echo "🎯 EJEMPLOS RÁPIDOS DE ICONOS:"
echo "=============================="
echo "  Material Design:  mdi-home, mdi-server, mdi-database, mdi-cloud"
echo "  Simple Icons:     si-github, si-docker, si-kubernetes, si-nginx"
echo "  Emojis:          🏠, 🖥️, 📊, 🐳, ⚙️, 📁"
echo "  URLs:            https://github.com/favicon.ico"
echo ""

echo "✅ CRITERIOS DE ÉXITO:"
echo "====================="
echo "  ✓ Todos los tipos de iconos funcionan"
echo "  ✓ Búsqueda filtra correctamente"
echo "  ✓ Vista previa muestra iconos apropiados"
echo "  ✓ YAML generado es válido"
echo "  ✓ Sin errores en consola del navegador"
echo "  ✓ Interfaz responsiva"
echo ""

echo "🎉 ¡Listo para probar! Abre http://localhost:3001 y sigue el checklist."
