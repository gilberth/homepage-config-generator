#!/bin/bash

# Lista de archivos restantes para subir al repositorio
# Repository: gilberth/homepage-config-generator

echo "📋 ARCHIVOS PENDIENTES DE SUBIR AL REPOSITORIO"
echo "=============================================="
echo ""

BASE_DIR="/Users/gilberth/Downloads/homepage-config-generator"

echo "🔍 Verificando existencia de archivos..."
echo ""

# Función para verificar archivo
check_file() {
    local file_path="$1"
    local description="$2"
    
    if [ -f "$BASE_DIR/$file_path" ]; then
        local size=$(ls -lh "$BASE_DIR/$file_path" | awk '{print $5}')
        echo "✅ $file_path ($size) - $description"
        return 0
    else
        echo "❌ $file_path - FALTANTE - $description"
        return 1
    fi
}

echo "📦 COMPONENTES REACT:"
echo "--------------------"
check_file "src/components/DragDropBuilder.js" "Componente principal con drag & drop"
check_file "src/components/BookmarkForm.js" "Formulario de marcadores"
check_file "src/components/BookmarkSection.js" "Sección de marcadores"
check_file "src/components/ConfigPreview.js" "Vista previa con editor YAML"
check_file "src/components/ImportSection.js" "Importación de archivos"
check_file "src/components/LivePreview.js" "Vista previa en tiempo real"
check_file "src/components/NotificationSystem.js" "Sistema de notificaciones"
check_file "src/components/ServiceForm.js" "Formulario de servicios"
check_file "src/components/ServiceGroup.js" "Agrupación de servicios"
check_file "src/components/SettingsForm.js" "Configuraciones de aplicación"
check_file "src/components/ThemeDebug.js" "Debug de temas"
check_file "src/components/ThemeStatus.js" "Estado del tema"
check_file "src/components/ThemeToggle.js" "Cambio de tema"
check_file "src/components/WidgetForm.js" "Formulario de widgets"
check_file "src/components/WidgetSection.js" "Sección de widgets"

echo ""
echo "🛠️ UTILIDADES:"
echo "--------------"
check_file "src/utils/configUtils.js" "Procesamiento YAML y configuración"

echo ""
echo "⚙️ CONFIGURACIÓN:"
echo "----------------"
check_file "config/services.yaml" "Servicios de ejemplo"
check_file "config/widgets.yaml" "Widgets de ejemplo"
check_file "config/bookmarks.yaml" "Marcadores de ejemplo"
check_file "config/settings.yaml" "Configuraciones de ejemplo"

echo ""
echo "📚 DOCUMENTACIÓN:"
echo "----------------"
check_file "FUNCIONALIDADES_COMPLETADAS.md" "Funcionalidades implementadas"
check_file "GUIA_INICIO_RAPIDO.md" "Guía de inicio rápido"
check_file "MIGRACION_FINAL_COMPLETADA.md" "Documentación de migración"

echo ""
echo "🧪 ARCHIVOS DE PRUEBA:"
echo "---------------------"
check_file "test-example.yaml" "Archivo de prueba para importación"

echo ""
echo "📊 RESUMEN:"
echo "----------"
total_files=24
existing_files=0

# Contar archivos existentes
for file in "src/components/DragDropBuilder.js" "src/components/BookmarkForm.js" "src/components/BookmarkSection.js" "src/components/ConfigPreview.js" "src/components/ImportSection.js" "src/components/LivePreview.js" "src/components/NotificationSystem.js" "src/components/ServiceForm.js" "src/components/ServiceGroup.js" "src/components/SettingsForm.js" "src/components/ThemeDebug.js" "src/components/ThemeStatus.js" "src/components/ThemeToggle.js" "src/components/WidgetForm.js" "src/components/WidgetSection.js" "src/utils/configUtils.js" "config/services.yaml" "config/widgets.yaml" "config/bookmarks.yaml" "config/settings.yaml" "FUNCIONALIDADES_COMPLETADAS.md" "GUIA_INICIO_RAPIDO.md" "MIGRACION_FINAL_COMPLETADA.md" "test-example.yaml"; do
    if [ -f "$BASE_DIR/$file" ]; then
        ((existing_files++))
    fi
done

echo "📁 Archivos encontrados: $existing_files/$total_files"
echo "🚀 Repositorio: https://github.com/gilberth/homepage-config-generator"

if [ $existing_files -eq $total_files ]; then
    echo ""
    echo "🎉 TODOS LOS ARCHIVOS ESTÁN LISTOS PARA SUBIR!"
    echo ""
    echo "💡 Comandos sugeridos:"
    echo "   1. Para subir con git:"
    echo "      cd $BASE_DIR"
    echo "      git init"
    echo "      git remote add origin https://github.com/gilberth/homepage-config-generator.git"
    echo "      git add ."
    echo "      git commit -m 'Complete project upload'"
    echo "      git push -u origin main"
    echo ""
    echo "   2. Para subir con script automatizado:"
    echo "      export GITHUB_TOKEN='tu_token_aqui'"
    echo "      ./upload-remaining-files.sh"
else
    echo ""
    echo "⚠️  Algunos archivos no se encontraron. Verificar antes de subir."
fi
