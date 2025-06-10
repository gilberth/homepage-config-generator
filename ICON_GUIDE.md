# Guía de Iconos - Homepage Configuration Generator

## Funcionalidades de Iconos Mejoradas

El Homepage Configuration Generator ahora incluye un sistema completo de selección de iconos que soporta múltiples tipos de iconos y formatos.

## Tipos de Iconos Soportados

### 1. selfh.st/icons (MDI)

- **Formato**: `mdi-icon-name`
- **Ejemplo**: `mdi-home`, `mdi-server`, `mdi-database`
- **Cantidad**: 200+ iconos disponibles
- **Categorías**: General, Tecnología, Servicios, Navegación, Acciones

### 2. Simple Icons

- **Formato**: `si-brand-name`
- **Ejemplo**: `si-github`, `si-docker`, `si-kubernetes`
- **Cantidad**: 100+ iconos de marcas y tecnologías
- **Incluye**: Todas las marcas tecnológicas populares

### 3. URLs de Imágenes

- **Formato**: URLs completas (http/https)
- **Ejemplo**: `https://example.com/icon.png`
- **Soporta**: PNG, JPG, SVG, GIF
- **Uso**: Para iconos personalizados o logos específicos

### 4. Emojis

- **Formato**: Emojis Unicode directos
- **Ejemplo**: `🏠`, `🖥️`, `📊`, `🐳`
- **Ventajas**: Universales, no requieren carga adicional

## Componente IconSelector

### Características

- **Búsqueda en tiempo real**: Filtra iconos mientras escribes
- **Vista previa**: Muestra cómo se verá el icono seleccionado
- **Categorización**: Iconos organizados por categorías
- **Enlaces de documentación**: Acceso directo a documentación oficial
- **Entrada personalizada**: Permite URLs y emojis personalizados

### Uso en Formularios

```javascript
<IconSelector
  value={formData.icon}
  onChange={(value) => handleChange("icon", value)}
  placeholder="Search icons or enter custom URL/emoji..."
/>
```

## Estilos de Iconos (iconStyle)

El generador ahora soporta múltiples estilos de iconos configurables:

- **gradient** (Por defecto): Iconos con degradados
- **theme**: Iconos con colores del tema
- **mono**: Iconos monocromáticos
- **adaptive**: Iconos que se adaptan al contexto
- **auto**: Detección automática del mejor estilo
- **original**: Colores originales del icono
- **flat**: Iconos planos sin efectos
- **outline**: Iconos en contorno

## Integración con Homepage

### Configuración de Servicios

```yaml
services:
  - name: "Mi Servicio"
    icon: "mdi-server" # Material Design Icon
    href: "https://example.com"

  - name: "GitHub"
    icon: "si-github" # Simple Icon
    href: "https://github.com"

  - name: "Custom Service"
    icon: "https://example.com/custom-icon.png" # URL personalizada
    href: "https://example.com"

  - name: "Home"
    icon: "🏠" # Emoji
    href: "https://home.example.com"
```

### Configuración Global

```yaml
settings:
  iconStyle: "gradient" # Estilo de iconos global
```

## Vista Previa Mejorada

El componente LivePreview ahora:

- Renderiza correctamente todos los tipos de iconos
- Respeta el estilo de iconos configurado
- Muestra URLs de imágenes como elementos `<img>`
- Mantiene emojis como texto Unicode
- Convierte iconos MDI/SI a emojis para preview

## Búsqueda y Filtrado

### Características de Búsqueda

- **Búsqueda por nombre**: `docker`, `github`, `home`
- **Búsqueda por categoría**: `technology`, `social`, `development`
- **Búsqueda por prefijo**: `mdi-`, `si-`
- **Filtrado en tiempo real**: Resultados instantáneos

### Ejemplos de Búsqueda

- `docker` → Encuentra `si-docker`, `mdi-docker`
- `home` → Encuentra `mdi-home`, `🏠`
- `github` → Encuentra `si-github`, `mdi-github`

## Mejores Prácticas

### Selección de Iconos

1. **Servicios tecnológicos**: Usar Simple Icons (`si-`) para marcas conocidas
2. **Funciones generales**: Usar selfh.st/icons (`mdi-`)
3. **Servicios únicos**: Usar URLs para logos específicos
4. **Elementos decorativos**: Usar emojis para un toque personal

### Rendimiento

- Los emojis son más rápidos (no requieren carga)
- Las URLs requieren conexión a internet
- Los iconos MDI/SI son renderizados como emojis en preview

### Consistencia

- Mantener un estilo consistente en toda la configuración
- Usar el mismo tipo de icono para servicios similares
- Aprovechar el `iconStyle` global para coherencia visual

## Resolución de Problemas

### Iconos No Aparecen

1. Verificar que la URL sea accesible
2. Comprobar el formato del prefijo (`mdi-`, `si-`)
3. Asegurar que el emoji sea válido Unicode

### Performance Lenta

1. Reducir el uso de URLs externas
2. Preferir emojis o iconos con prefijo
3. Optimizar imágenes personalizadas

### Estilos Inconsistentes

1. Verificar configuración `iconStyle` global
2. Comprobar que todos los servicios usen el mismo formato
3. Revisar CSS personalizado que pueda interferir

## Recursos Adicionales

- [selfh.st/icons](https://selfh.st/icons/) - Biblioteca completa de MDI
- [Simple Icons](https://simpleicons.org/) - Iconos de marcas SVG
- [Homepage Documentation](https://gethomepage.dev/en/configs/services/) - Documentación oficial
- [Unicode Emoji List](https://unicode.org/emoji/charts/full-emoji-list.html) - Lista completa de emojis

---

_Esta funcionalidad ha sido desarrollada para mejorar la experiencia de configuración de Homepage, proporcionando una interfaz intuitiva y completa para la selección de iconos._
