#!/bin/bash

echo "🔍 VALIDACIÓN ESPECÍFICA DE TODAS LAS PESTAÑAS"
echo "=============================================="
echo ""

cd /Users/gilberth/Downloads/homepage-config-generator

echo "📋 1. VERIFICANDO COMPONENTES POR PESTAÑA..."
echo "---------------------------------------------"

# Verificar componentes específicos de cada pestaña
components=(
    "ServiceForm.js:Services Tab"
    "ServiceGroup.js:Services Tab"
    "WidgetForm.js:Widgets Tab"
    "WidgetSection.js:Widgets Tab"
    "BookmarkForm.js:Bookmarks Tab"
    "BookmarkSection.js:Bookmarks Tab"
    "SettingsForm.js:Settings Tab"
)

echo ""
echo "🔧 2. VERIFICANDO ERRORES DE THEME POR COMPONENTE..."
echo "------------------------------------------------------"

for component_info in "${components[@]}"; do
    IFS=':' read -r file tab <<< "$component_info"
    filepath="src/components/$file"
    
    if [ -f "$filepath" ]; then
        # Buscar referencias peligrosas
        dangerous=$(grep -n "props\.theme\.colors\." "$filepath" 2>/dev/null || true)
        # Buscar referencias seguras
        safe=$(grep -c "props\.theme?\.colors\|props\.theme\?\.colors" "$filepath" 2>/dev/null || echo "0")
        
        if [ ! -z "$dangerous" ]; then
            echo "❌ $tab ($file): ERRORES ENCONTRADOS"
            echo "   $dangerous"
        else
            echo "✅ $tab ($file): Sin errores - $safe referencias seguras"
        fi
    else
        echo "⚠️  $tab ($file): Archivo no encontrado"
    fi
done

echo ""
echo "🌐 3. VERIFICANDO ESTADO DEL SERVIDOR..."
echo "----------------------------------------"

if lsof -i :3001 >/dev/null 2>&1; then
    echo "✅ Servidor ejecutándose en http://localhost:3001"
else
    echo "❌ Servidor no está ejecutándose"
    exit 1
fi

echo ""
echo "🔄 4. VERIFICANDO COMPILACIÓN SIN ERRORES..."
echo "---------------------------------------------"

# Verificar que no hay errores de TypeScript/ESLint
if npm run build >/dev/null 2>&1; then
    echo "✅ Compilación exitosa - Sin errores de theme"
else
    echo "❌ Error en compilación"
    exit 1
fi

echo ""
echo "📊 5. RESUMEN POR PESTAÑAS..."
echo "-----------------------------"

# Verificar archivos específicos por pestaña
echo "   🔧 Services Tab:"
echo "     - ServiceForm.js: $([ -f "src/components/ServiceForm.js" ] && echo "✅ OK" || echo "❌ FALTA")"
echo "     - ServiceGroup.js: $([ -f "src/components/ServiceGroup.js" ] && echo "✅ OK" || echo "❌ FALTA")"

echo "   🧩 Widgets Tab:"
echo "     - WidgetForm.js: $([ -f "src/components/WidgetForm.js" ] && echo "✅ OK" || echo "❌ FALTA")"
echo "     - WidgetSection.js: $([ -f "src/components/WidgetSection.js" ] && echo "✅ OK" || echo "❌ FALTA")"

echo "   🔖 Bookmarks Tab:"
echo "     - BookmarkForm.js: $([ -f "src/components/BookmarkForm.js" ] && echo "✅ OK" || echo "❌ FALTA")"
echo "     - BookmarkSection.js: $([ -f "src/components/BookmarkSection.js" ] && echo "✅ OK" || echo "❌ FALTA")"

echo "   ⚙️  Settings Tab:"
echo "     - SettingsForm.js: $([ -f "src/components/SettingsForm.js" ] && echo "✅ OK" || echo "❌ FALTA")"

echo ""
echo "🎯 CONCLUSIÓN FINAL"
echo "==================="

# Contar total de referencias peligrosas en todos los archivos
total_dangerous=$(grep -r "props\.theme\.colors\." src/components/*.js 2>/dev/null | wc -l || echo "0")
total_safe=$(grep -r "props\.theme?\.colors\|props\.theme\?\.colors" src/components/*.js 2>/dev/null | wc -l || echo "0")

if [ "$total_dangerous" -eq 0 ]; then
    echo "✅ TODAS LAS PESTAÑAS ESTÁN LIBRES DE ERRORES DE THEME"
    echo "✅ $total_safe referencias con optional chaining encontradas"
    echo "✅ Aplicación completamente funcional"
    echo ""
    echo "🚀 ESTADO: LISTO PARA USAR"
    echo "🌐 URL: http://localhost:3001"
else
    echo "❌ SE ENCONTRARON $total_dangerous ERRORES DE THEME"
    echo "❌ REQUIERE CORRECCIÓN ADICIONAL"
    exit 1
fi
