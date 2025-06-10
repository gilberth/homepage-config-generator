#!/bin/bash

echo "🧪 VERIFICACIÓN FINAL - Todos los Tabs Sin Errores"
echo "================================================="

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
echo "🔍 2. Verificando correcciones aplicadas..."

# Verificar que no hay más referencias sin optional chaining
old_style=$(grep -r "props\.theme\.colors" src/components/ | wc -l)
new_style=$(grep -r "props\.theme?\.colors" src/components/ | wc -l)

echo "❌ Referencias antiguas (props.theme.colors): $old_style"
echo "✅ Referencias corregidas (props.theme?.colors): $new_style"

if [ $old_style -eq 0 ]; then
    echo "✅ Todas las referencias han sido corregidas"
else
    echo "❌ Aún hay referencias sin corregir"
    echo "   Archivos pendientes:"
    grep -r "props\.theme\.colors" src/components/
fi

echo ""
echo "📋 3. Archivos corregidos:"
files=(
    "SettingsForm.js"
    "ServiceForm.js" 
    "DragDropBuilder.js"
    "ConfigPreview.js"
    "BookmarkSection.js"
    "WidgetSection.js"
    "ServiceGroup.js"
    "LivePreview.js"
    "ThemeToggle.js"
    "ThemeStatus.js"
    "ImportSection.js"
)

for file in "${files[@]}"; do
    if [ -f "src/components/$file" ]; then
        count=$(grep -c "props\.theme?\.colors" "src/components/$file")
        if [ $count -gt 0 ]; then
            echo "✅ $file - $count correcciones aplicadas"
        else
            echo "⚪ $file - sin styled components o ya corregido"
        fi
    else
        echo "❌ $file - archivo no encontrado"
    fi
done

echo ""
echo "🚀 4. Instrucciones de prueba:"
echo "   1. Abrir: http://localhost:3000"
echo "   2. Navegar por TODOS los tabs:"
echo "      - Services (services.yaml)"
echo "      - Info Widgets (widgets.yaml)"  
echo "      - Bookmarks"
echo "      - Settings"
echo "   3. Verificar que NO aparezcan errores en consola:"
echo "      - ❌ 'Cannot read properties of undefined (reading 'text')'"
echo "      - ❌ Cualquier error de theme"
echo ""
echo "🏆 Si no hay errores en NINGÚN tab, entonces:"
echo "   ✅ LA CORRECCIÓN ES COMPLETAMENTE EXITOSA!"
echo ""
echo "🔧 Correcciones aplicadas:"
echo "   - Optional chaining: props.theme?.colors"
echo "   - Valores fallback en styled components críticos"
echo "   - Verificación sistemática en 12 archivos"
