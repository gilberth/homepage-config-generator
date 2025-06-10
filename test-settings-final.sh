#!/bin/bash

echo "🧪 PRUEBA FINAL - Settings Tab Sin Errores"
echo "========================================"

cd "/Users/gilberth/Downloads/homepage-config-generator"

echo "📦 1. Compilando aplicación..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Compilación exitosa"
else
    echo "❌ Error en compilación"
    exit 1
fi

echo ""
echo "🔍 2. Verificando archivos críticos..."

if [ -f "src/components/SettingsForm.js" ]; then
    echo "✅ SettingsForm.js existe"
    
    # Verificar que los styled components tengan optional chaining
    if grep -q "props.theme?.colors" src/components/SettingsForm.js; then
        echo "✅ Optional chaining implementado"
    else
        echo "❌ Falta optional chaining"
    fi
    
    # Verificar que los componentes tengan theme props
    theme_props=$(grep -c "theme={theme}" src/components/SettingsForm.js)
    echo "✅ Props theme encontradas: $theme_props"
    
else
    echo "❌ SettingsForm.js no encontrado"
    exit 1
fi

echo ""
echo "🎯 3. Verificando contexto de tema..."

if [ -f "src/contexts/ThemeContext.js" ]; then
    echo "✅ ThemeContext.js existe"
    
    if grep -q "text:" src/contexts/ThemeContext.js; then
        echo "✅ Propiedad 'text' definida en temas"
    else
        echo "❌ Falta propiedad 'text' en temas"
    fi
else
    echo "❌ ThemeContext.js no encontrado"
fi

echo ""
echo "🚀 4. Iniciando servidor de desarrollo..."
echo "   Abrir: http://localhost:3000"
echo "   Navegar al tab 'Settings' para verificar"
echo ""
echo "🔍 Buscar en consola del navegador:"
echo "   - ✅ Debe mostrar: 'SettingsForm theme status'"
echo "   - ❌ NO debe mostrar: 'Cannot read properties of undefined'"
echo ""
echo "🏆 Si no hay errores de 'Cannot read properties of undefined'"
echo "   entonces la corrección fue EXITOSA!"

# Opcional: iniciar servidor automáticamente
# npm start
