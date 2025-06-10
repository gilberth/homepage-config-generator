#!/bin/bash

# Script para subir los archivos restantes al repositorio GitHub
# Repository: gilberth/homepage-config-generator

echo "🚀 Subiendo archivos restantes al repositorio GitHub..."
echo "======================================================="

# Configuración del repositorio
REPO="gilberth/homepage-config-generator"
BASE_URL="https://api.github.com/repos/$REPO/contents"

# Verificar que GITHUB_TOKEN esté configurado
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN no está configurado"
    echo "Ejecuta: export GITHUB_TOKEN=tu_token_aqui"
    exit 1
fi

# Función para subir un archivo
upload_file() {
    local file_path="$1"
    local github_path="$2"
    local commit_message="$3"
    
    if [ ! -f "$file_path" ]; then
        echo "❌ Archivo no encontrado: $file_path"
        return 1
    fi
    
    echo "📤 Subiendo: $github_path"
    
    # Codificar archivo en base64
    local content=$(base64 -i "$file_path")
    
    # Crear el JSON payload
    local json_payload=$(cat <<EOF
{
  "message": "$commit_message",
  "content": "$content"
}
EOF
)
    
    # Hacer la petición a GitHub API
    local response=$(curl -s -w "%{http_code}" -X PUT \
        -H "Authorization: Bearer $GITHUB_TOKEN" \
        -H "Content-Type: application/json" \
        "$BASE_URL/$github_path" \
        -d "$json_payload")
    
    local http_code="${response: -3}"
    if [ "$http_code" = "201" ] || [ "$http_code" = "200" ]; then
        echo "✅ Subido exitosamente: $github_path"
    else
        echo "❌ Error subiendo $github_path (HTTP $http_code)"
        echo "Response: ${response%???}"
    fi
}

echo ""
echo "📁 Subiendo componentes restantes..."

# DragDropBuilder - Componente principal
upload_file "src/components/DragDropBuilder.js" "src/components/DragDropBuilder.js" "Add DragDropBuilder.js - Main drag & drop component with theming"

# BookmarkForm - Formulario de marcadores
upload_file "src/components/BookmarkForm.js" "src/components/BookmarkForm.js" "Add BookmarkForm.js - Bookmark creation form with target support"

# BookmarkSection - Sección de marcadores
upload_file "src/components/BookmarkSection.js" "src/components/BookmarkSection.js" "Add BookmarkSection.js - Bookmark management section"

# ConfigPreview - Vista previa de configuración
upload_file "src/components/ConfigPreview.js" "src/components/ConfigPreview.js" "Add ConfigPreview.js - Configuration preview with YAML editor"

# ImportSection - Sección de importación
upload_file "src/components/ImportSection.js" "src/components/ImportSection.js" "Add ImportSection.js - File import functionality"

# LivePreview - Vista previa en tiempo real
upload_file "src/components/LivePreview.js" "src/components/LivePreview.js" "Add LivePreview.js - Real-time preview component"

# NotificationSystem - Sistema de notificaciones
upload_file "src/components/NotificationSystem.js" "src/components/NotificationSystem.js" "Add NotificationSystem.js - Toast notification system"

# ServiceForm - Formulario de servicios
upload_file "src/components/ServiceForm.js" "src/components/ServiceForm.js" "Add ServiceForm.js - Service creation form with widget support"

# ServiceGroup - Grupo de servicios
upload_file "src/components/ServiceGroup.js" "src/components/ServiceGroup.js" "Add ServiceGroup.js - Service grouping component"

# SettingsForm - Formulario de configuraciones
upload_file "src/components/SettingsForm.js" "src/components/SettingsForm.js" "Add SettingsForm.js - Application settings form"

# ThemeDebug - Debug de temas
upload_file "src/components/ThemeDebug.js" "src/components/ThemeDebug.js" "Add ThemeDebug.js - Theme debugging component"

# ThemeStatus - Estado del tema
upload_file "src/components/ThemeStatus.js" "src/components/ThemeStatus.js" "Add ThemeStatus.js - Theme status indicator"

# ThemeToggle - Cambio de tema
upload_file "src/components/ThemeToggle.js" "src/components/ThemeToggle.js" "Add ThemeToggle.js - Dark/light theme toggle"

# WidgetForm - Formulario de widgets
upload_file "src/components/WidgetForm.js" "src/components/WidgetForm.js" "Add WidgetForm.js - Widget configuration form"

# WidgetSection - Sección de widgets
upload_file "src/components/WidgetSection.js" "src/components/WidgetSection.js" "Add WidgetSection.js - Widget management section"

echo ""
echo "📁 Subiendo utilidades..."

# configUtils - Utilidades de configuración
upload_file "src/utils/configUtils.js" "src/utils/configUtils.js" "Add configUtils.js - Configuration utilities and YAML processing"

echo ""
echo "📁 Subiendo archivos de configuración adicionales..."

# Archivos de ejemplo y configuración
upload_file "config/services.yaml" "config/services.yaml" "Add services.yaml - Example services configuration"
upload_file "config/widgets.yaml" "config/widgets.yaml" "Add widgets.yaml - Example widgets configuration"
upload_file "config/bookmarks.yaml" "config/bookmarks.yaml" "Add bookmarks.yaml - Example bookmarks configuration"
upload_file "config/settings.yaml" "config/settings.yaml" "Add settings.yaml - Example settings configuration"

echo ""
echo "📁 Subiendo documentación y archivos de prueba..."

# Documentación técnica
upload_file "FUNCIONALIDADES_COMPLETADAS.md" "docs/FUNCIONALIDADES_COMPLETADAS.md" "Add comprehensive feature documentation"
upload_file "GUIA_INICIO_RAPIDO.md" "docs/GUIA_INICIO_RAPIDO.md" "Add quick start guide"
upload_file "MIGRACION_FINAL_COMPLETADA.md" "docs/MIGRACION_FINAL_COMPLETADA.md" "Add migration completion documentation"

# Archivos de prueba
upload_file "test-example.yaml" "test-example.yaml" "Add test example YAML file"

echo ""
echo "🎉 Proceso de subida completado!"
echo ""
echo "📋 Resumen:"
echo "• Componentes React: 15 archivos"
echo "• Utilidades: 1 archivo"
echo "• Configuración: 4 archivos"
echo "• Documentación: 3 archivos"
echo "• Pruebas: 1 archivo"
echo ""
echo "🔗 Repositorio: https://github.com/$REPO"
