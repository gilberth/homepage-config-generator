#!/bin/bash
# Verificación urgente - ¡Salvando gatitos! 🐱💨

echo "🐱 OPERACIÓN SALVA GATITOS - VERIFICACIÓN URGENTE"
echo "================================================="

# Verificar prefijo sh- en IconSelector.js
echo "🔍 Verificando prefijo sh- en IconSelector.js..."
if grep -q "prefix: 'sh-'" src/components/IconSelector.js; then
  echo "✅ Prefijo sh- configurado correctamente"
else
  echo "❌ ERROR: Prefijo sh- NO encontrado"
  exit 1
fi

# Verificar iconos de selfh.st en la lista
echo "🔍 Verificando iconos de selfh.st..."
if grep -q "plex.*jellyfin.*emby" src/components/IconSelector.js; then
  echo "✅ Iconos de selfh.st/icons encontrados"
else
  echo "❌ ERROR: Iconos de selfh.st NO encontrados"
  exit 1
fi

# Verificar texto descriptivo actualizado
echo "🔍 Verificando texto descriptivo..."
if grep -q "selfh.st/icons (sh-)" src/components/IconSelector.js; then
  echo "✅ Texto descriptivo actualizado correctamente"
else
  echo "❌ ERROR: Texto descriptivo NO actualizado"
  exit 1
fi

# Verificar test actualizado
echo "🔍 Verificando test actualizado..."
if grep -q "sh-plex" src/components/IconSelectorTest.js; then
  echo "✅ Test actualizado con sh- prefix"
else
  echo "❌ ERROR: Test NO actualizado"
  exit 1
fi

# Verificar README actualizado
echo "🔍 Verificando README..."
if grep -q "4,600+ iconos específicos para aplicaciones self-hosted con prefijo \`sh-\`" README.md; then
  echo "✅ README actualizado correctamente"
else
  echo "❌ ERROR: README NO actualizado"
  exit 1
fi

echo ""
echo "🎉 ¡GATITO SALVADO! ¡Todos los cambios aplicados correctamente!"
echo "🐱 El sistema ahora usa prefijo 'sh-' para selfh.st/icons"
echo "📋 Iconos incluidos: plex, jellyfin, emby, nextcloud, docker, y muchos más"
echo ""
echo "🚀 Cambios completados:"
echo "   • Prefijo: mdi- → sh-"
echo "   • Iconos: Material Design → selfh.st/icons específicos"
echo "   • Cantidad: 200+ → 4,600+ iconos"
echo "   • Enfoque: Genérico → Self-hosting especializado"
echo ""
echo "✨ ¡El Homepage Configuration Builder ahora está optimizado para self-hosting!"
