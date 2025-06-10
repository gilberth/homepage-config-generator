# Manual de Usuario - Homepage Configuration Builder

## Descripción

Esta aplicación web permite configurar los archivos YAML de [gethomepage/homepage](https://github.com/gethomepage/homepage) mediante una interfaz gráfica intuitiva con funcionalidad drag & drop.

## Funcionalidades Principales

### 1. Sistema de Pestañas

La aplicación se organiza en 4 pestañas principales:

- **Services**: Configuración de servicios y aplicaciones
- **Widgets**: Configuración de widgets del dashboard
- **Bookmarks**: Configuración de marcadores y enlaces rápidos
- **Settings**: Configuración general de la homepage

### 2. Sistema Drag & Drop

- **Reordenar elementos**: Arrastra cualquier elemento para cambiar su orden
- **Interfaz visual**: Indicadores visuales durante el arrastre
- **Actualización en tiempo real**: Los cambios se reflejan inmediatamente en la previsualización

### 3. Formularios Dinámicos

#### Services

- **Nombre**: Nombre del servicio
- **Descripción**: Descripción opcional
- **URL**: Enlace al servicio
- **Icono**: Icono del servicio (ej: "mdi-docker", "si-nextcloud")
- **Categoría**: Grupo al que pertenece

#### Widgets

- **Tipo**: Tipo de widget (weather, search, datetime, etc.)
- **Configuración específica**: Campos dinámicos según el tipo

#### Bookmarks

- **Nombre**: Título del marcador
- **URL**: Enlace del marcador
- **Icono**: Icono opcional
- **Descripción**: Descripción opcional

#### Settings

- **Título**: Título de la homepage
- **Favicon**: Icono de la pestaña del navegador
- **Tema**: light/dark
- **Color**: Esquema de colores
- **Estilo de cabecera**: clean/boxed
- **Layout**: Configuración de diseño

### 4. Previsualización en Tiempo Real

- **Vista de código YAML**: Previsualización del código generado
- **Estadísticas**: Contadores de elementos configurados
- **Navegación por archivos**: Pestañas para cada archivo YAML

### 5. Sistema de Descargas

- **Descarga individual**: Descargar archivos YAML específicos
- **Descarga masiva**: Descargar todos los archivos a la vez
- **Formato correcto**: Archivos compatibles con homepage

### 6. Sistema de Notificaciones

- **Notificaciones de éxito**: Confirmación de acciones completadas
- **Notificaciones de error**: Alertas sobre problemas
- **Notificaciones de advertencia**: Información importante
- **Notificaciones informativas**: Actualizaciones de estado
- **Auto-cierre**: Las notificaciones se cierran automáticamente
- **Cierre manual**: Botón X para cerrar manualmente

## Uso Paso a Paso

### 1. Configurar Services

1. Ve a la pestaña "Services"
2. Haz clic en "Add Service"
3. Completa el formulario:
   - Nombre: "Nextcloud"
   - Descripción: "Cloud Storage"
   - URL: "https://nextcloud.example.com"
   - Icono: "si-nextcloud"
   - Categoría: "Productivity"
4. Haz clic en "Add Service"
5. Arrastra para reordenar si es necesario

### 2. Configurar Widgets

1. Ve a la pestaña "Widgets"
2. Haz clic en "Add Widget"
3. Selecciona el tipo de widget
4. Completa la configuración específica
5. Haz clic en "Add Widget"

### 3. Configurar Bookmarks

1. Ve a la pestaña "Bookmarks"
2. Haz clic en "Add Bookmark"
3. Completa la información del marcador
4. Haz clic en "Add Bookmark"

### 4. Configurar Settings

1. Ve a la pestaña "Settings"
2. Ajusta la configuración general:
   - Título de la homepage
   - Tema y colores
   - Favicon
   - Estilo de cabecera
3. Los cambios se guardan automáticamente

### 5. Descargar Configuración

1. Ve al panel de previsualización (derecha)
2. Opciones de descarga:
   - **Download All YAML Files**: Descarga todos los archivos
   - **Download [archivo].yaml**: Descarga archivo específico
3. Los archivos se descargan en formato compatible con homepage

## Estructura de Archivos Generados

```
config/
├── services.yaml      # Configuración de servicios
├── widgets.yaml       # Configuración de widgets
├── bookmarks.yaml     # Configuración de marcadores
└── settings.yaml      # Configuración general
```

## Consejos de Uso

### Iconos

- Usa iconos de [selfh.st/icons](https://selfh.st/icons/) con prefijo `mdi-`
- Usa iconos de [Simple Icons](https://simpleicons.org/) con prefijo `si-`
- Ejemplo: `mdi-docker`, `si-nextcloud`, `mdi-home`

### URLs

- Asegúrate de incluir el protocolo (`http://` o `https://`)
- Verifica que las URLs sean accesibles desde tu red

### Categorías

- Usa nombres descriptivos para organizar servicios
- Ejemplos: "Media", "Development", "Productivity", "Monitoring"

### Widgets

- Algunos widgets requieren configuración adicional (API keys, ubicaciones)
- Consulta la documentación de homepage para widgets específicos

## Integración con Homepage

1. Descarga los archivos YAML generados
2. Copia los archivos a tu directorio de configuración de homepage
3. Reinicia homepage para aplicar los cambios
4. Los cambios deberían reflejarse inmediatamente

## Problemas Comunes

### Servicios no aparecen

- Verifica que la URL sea correcta y accesible
- Comprueba que el icono esté bien especificado

### Widgets no funcionan

- Algunos widgets requieren configuración adicional
- Verifica las API keys y permisos necesarios

### Descarga no funciona

- Verifica que tu navegador permita descargas
- Comprueba que haya configuración para generar

## Soporte

Para más información, consulta la documentación oficial de [homepage](https://gethomepage.dev/).
