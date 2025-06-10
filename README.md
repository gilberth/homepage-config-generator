# Homepage Configuration Builder

Una aplicación web moderna e intuitiva para configurar [gethomepage/homepage](https://github.com/gethomepage/homepage) mediante interfaz gráfica con funcionalidad drag & drop y sistema avanzado de selección de iconos.

## 🚀 Características

- **🎯 Interfaz visual intuitiva** - Sin necesidad de editar YAML manualmente
- **🔄 Drag & Drop** - Reordena elementos arrastrando y soltando
- **📝 Formularios dinámicos** - Campos específicos para cada tipo de elemento
- **👁️ Previsualización en tiempo real** - Ve el código YAML generado al instante
- **📥 Descarga automática** - Genera y descarga archivos YAML compatibles
- **🔔 Sistema de notificaciones** - Feedback visual de todas las acciones
- **📱 Diseño responsivo** - Funciona en desktop y móvil
- **🎨 Selector de iconos avanzado** - Soporte para selfh.st/icons, Simple Icons, URLs y emojis
- **🔍 Búsqueda de iconos** - Encuentra iconos fácilmente con búsqueda en tiempo real

## ✨ Sistema de Iconos Avanzado

### Tipos de Iconos Soportados

- **selfh.st/icons** (sh-): 4,600+ iconos específicos para aplicaciones self-hosted con prefijo `sh-`
- **Simple Icons** (si-): 100+ iconos de marcas tecnológicas con prefijo `si-`
- **URLs personalizadas**: Cualquier imagen accesible por HTTP/HTTPS
- **Emojis**: Soporte completo para emojis Unicode

### Características del Selector

- 🔍 **Búsqueda en tiempo real** con filtrado instantáneo
- 👀 **Vista previa** de iconos antes de seleccionar
- 📂 **Categorización** inteligente por tipo y uso
- 🔗 **Enlaces a documentación** oficial de iconos
- ⌨️ **Entrada manual** para URLs y emojis personalizados

### Estilos de Iconos Configurables

- `gradient` - Degradados (por defecto)
- `theme` - Colores del tema
- `mono` - Monocromático
- `adaptive` - Adaptativo al contexto
- `auto` - Detección automática
- `original` - Colores originales
- `flat` - Plano sin efectos
- `outline` - Solo contorno

## 🛠️ Tecnologías

- **React 18** - Framework principal
- **@dnd-kit** - Sistema drag & drop
- **styled-components** - Estilos CSS-in-JS
- **react-icons** - Iconografía
- **react-hook-form** - Gestión de formularios
- **react-select** - Selectores avanzados
- **js-yaml** - Generación de archivos YAML

## 📦 Instalación

### Prerrequisitos

- Node.js 14+
- npm o yarn

### Configuración del proyecto

```bash
# Clonar el repositorio
git clone https://github.com/gilberth/homepage-config-generator.git
cd homepage-config-generator

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:3001`

## 🎮 Uso

### 1. Configurar Services

1. Ve a la pestaña **Services**
2. Haz clic en **Add Service**
3. Completa el formulario con la información del servicio
4. Arrastra para reordenar

### 2. Configurar Widgets

1. Ve a la pestaña **Widgets**
2. Selecciona el tipo de widget
3. Configura los parámetros específicos

### 3. Configurar Bookmarks

1. Ve a la pestaña **Bookmarks**
2. Añade marcadores y enlaces rápidos

### 4. Configurar Settings

1. Ve a la pestaña **Settings**
2. Ajusta la configuración general (tema, colores, etc.)

### 5. Descargar configuración

1. En el panel derecho, revisa la previsualización
2. Descarga archivos individuales o todos a la vez

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── DragDropBuilder.js     # Componente principal
│   ├── ServiceGroup.js        # Gestión de servicios
│   ├── ServiceForm.js         # Formulario de servicios
│   ├── WidgetSection.js       # Gestión de widgets
│   ├── WidgetForm.js          # Formulario de widgets
│   ├── BookmarkSection.js     # Gestión de bookmarks
│   ├── BookmarkForm.js        # Formulario de bookmarks
│   ├── SettingsForm.js        # Configuración general
│   ├── ConfigPreview.js       # Previsualización y descarga
│   └── NotificationSystem.js  # Sistema de notificaciones
├── utils/
│   └── configUtils.js         # Utilidades de configuración
├── App.js                     # Componente raíz
└── index.js                   # Punto de entrada
```

## 🎨 Sistema de Componentes

### DragDropBuilder

Componente principal que maneja:

- Sistema de pestañas
- Estado global de configuración
- Contexto de drag & drop
- Sistema de notificaciones

### Forms

Formularios especializados para cada tipo de elemento:

- **ServiceForm**: Servicios y aplicaciones
- **WidgetForm**: Widgets del dashboard
- **BookmarkForm**: Marcadores y enlaces
- **SettingsForm**: Configuración general

### ConfigPreview

Panel de previsualización que incluye:

- Vista del código YAML generado
- Estadísticas de configuración
- Botones de descarga
- Navegación entre archivos

### NotificationSystem

Sistema de notificaciones con:

- Diferentes tipos (success, error, warning, info)
- Auto-cierre configurable
- Animaciones de entrada y salida
- Cierre manual

## 🔧 Configuración de Desarrollo

### Scripts disponibles

```bash
npm start          # Modo desarrollo
npm test           # Ejecutar tests
npm run build      # Build de producción
npm run eject      # Eyectar configuración (irreversible)
```

### Variables de entorno

```bash
REACT_APP_VERSION=1.0.0
REACT_APP_API_URL=http://localhost:3001
```

## 📄 Archivos Generados

La aplicación genera los siguientes archivos YAML compatibles con homepage:

- **services.yaml** - Configuración de servicios
- **widgets.yaml** - Configuración de widgets
- **bookmarks.yaml** - Configuración de marcadores
- **settings.yaml** - Configuración general

## 🎯 Roadmap

- [ ] **Importación de archivos YAML existentes**
- [ ] **Validación avanzada de formularios**
- [ ] **Temas personalizables**
- [ ] **Plantillas predefinidas**
- [ ] **Exportación a diferentes formatos**
- [ ] **Integración con APIs de servicios**
- [ ] **Editor visual de layouts**
- [ ] **Sistema de backup/restore**

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [gethomepage/homepage](https://github.com/gethomepage/homepage) - El proyecto que inspiró esta herramienta
- [dnd-kit](https://dndkit.com/) - Por el excelente sistema drag & drop
- [styled-components](https://styled-components.com/) - Por la gestión de estilos
- Comunidad de React por las herramientas y librerías

## 📞 Soporte

Si tienes preguntas o problemas:

1. Revisa la [documentación de homepage](https://gethomepage.dev/)
2. Consulta el [manual de usuario](MANUAL_USUARIO.md)
3. Abre un issue en este repositorio

---

**Desarrollado con ❤️ para la comunidad de homepage**