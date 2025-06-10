#!/bin/bash

echo "🔍 VERIFICACIÓN FINAL - Homepage Config Generator"
echo "=================================================="
echo ""

# Archivos a verificar
files=(
    "src/components/SettingsForm.js"
    "src/components/ServiceForm.js"
    "src/components/DragDropBuilder.js"
    "src/components/ConfigPreview.js"
    "src/components/BookmarkSection.js"
    "src/components/WidgetSection.js"
    "src/components/ServiceGroup.js"
    "src/components/LivePreview.js"
    "src/components/ThemeToggle.js"
    "src/components/ThemeStatus.js"
    "src/components/ImportSection.js"
)

echo "1️⃣ Verificando que NO hay referencias directas peligrosas..."
echo "-----------------------------------------------------------"

error_found=false

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        # Buscar props.theme.colors sin optional chaining
        dangerous_refs=$(grep -n "props\.theme\.colors\." "$file" 2>/dev/null || true)
        if [ ! -z "$dangerous_refs" ]; then
            echo "❌ PELIGRO en $file:"
            echo "$dangerous_refs"
            echo ""
            error_found=true
        else
            echo "✅ $file - Sin referencias peligrosas"
        fi
    else
        echo "⚠️  Archivo no encontrado: $file"
    fi
done

echo ""
echo "2️⃣ Verificando que SÍ hay optional chaining aplicado..."
echo "--------------------------------------------------------"

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        # Contar referencias con optional chaining
        safe_refs=$(grep -c "props\.theme?\.colors\|props\.theme\?\.colors" "$file" 2>/dev/null || echo "0")
        if [ "$safe_refs" -gt 0 ]; then
            echo "✅ $file - $safe_refs referencias seguras encontradas"
        else
            # Verificar si el archivo tiene styled components que usen theme
            theme_usage=$(grep -c "props.*theme" "$file" 2>/dev/null || echo "0")
            if [ "$theme_usage" -gt 0 ]; then
                echo "⚠️  $file - Usa theme pero sin optional chaining obvio (revisar manualmente)"
            else
                echo "ℹ️  $file - No usa theme directamente"
            fi
        fi
    fi
done

echo ""
echo "3️⃣ Verificando compilación..."
echo "------------------------------"

if npm run build >/dev/null 2>&1; then
    echo "✅ Compilación exitosa"
else
    echo "❌ Error en compilación"
    error_found=true
fi

echo ""
echo "4️⃣ Resumen Final"
echo "=================="

if [ "$error_found" = true ]; then
    echo "❌ SE ENCONTRARON PROBLEMAS - Revisar las líneas marcadas arriba"
    exit 1
else
    echo "✅ TODAS LAS VERIFICACIONES PASARON"
    echo "✅ No hay referencias peligrosas a props.theme.colors"
    echo "✅ Compilación exitosa"
    echo "✅ Aplicación lista para usar"
    echo ""
    echo "🎉 ¡CORRECCIÓN COMPLETADA CON ÉXITO!"
fi
