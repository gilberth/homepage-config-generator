# Ejemplo de Configuración Generada

Este directorio contiene ejemplos de archivos YAML generados por la aplicación para demostrar las capacidades del Homepage Configuration Builder.

## services.yaml

```yaml
# Example services configuration
- Productivity:
    - Nextcloud:
        href: https://nextcloud.example.com
        description: Personal cloud storage
        icon: si-nextcloud
    - Notion:
        href: https://notion.so
        description: Note taking and organization
        icon: si-notion

- Development:
    - GitHub:
        href: https://github.com
        description: Code repositories
        icon: si-github
    - Docker Hub:
        href: https://hub.docker.com
        description: Container registry
        icon: si-docker

- Media:
    - Plex:
        href: https://plex.example.com
        description: Media server
        icon: si-plex
    - YouTube:
        href: https://youtube.com
        description: Video streaming
        icon: si-youtube
```

## widgets.yaml

```yaml
# Example widgets configuration
- search:
    provider: google
    target: _blank

- datetime:
    text_size: xl
    format:
      timeStyle: short
      dateStyle: long
      hourCycle: h23

- resources:
    backend: glances
    expanded: true
    cpu: true
    memory: true

- weather:
    latitude: 40.7128
    longitude: -74.0060
    units: metric
    provider: openweathermap
    apiKey: your_api_key_here
```

## bookmarks.yaml

```yaml
# Example bookmarks configuration with target options
- Developer:
    - GitHub:
        - href: https://github.com
          icon: si-github
          description: Code repositories
          target: _blank
    - Documentation:
        - href: https://developer.mozilla.org
          icon: mdi-book
          description: Web development docs
          target: _blank
        - href: https://stackoverflow.com
          icon: si-stackoverflow
          description: Programming Q&A
          target: _blank

- Social:
    - Reddit:
        - href: https://reddit.com
          icon: si-reddit
          description: Social news
          target: _blank
    - Twitter:
        - href: https://twitter.com
          icon: si-twitter
          description: Social networking
          target: _self
```

## settings.yaml

```yaml
# Example settings configuration
title: My Homepage
favicon: https://example.com/favicon.ico

theme: dark
color: slate

headerStyle: clean

layout:
  Productivity:
    style: row
    columns: 2
  Development:
    style: column
  Media:
    style: row
    columns: 3

providers:
  openweathermap: your_api_key_here
```

## Notas de Uso

### Iconos Soportados

- **selfh.st/icons**: Usa el prefijo `mdi-` (ej: `mdi-home`, `mdi-docker`)
- **Simple Icons**: Usa el prefijo `si-` (ej: `si-github`, `si-nextcloud`)

### Configuración de Widgets

- **search**: Requiere provider (google, duckduckgo, bing)
- **weather**: Requiere API key de OpenWeatherMap
- **resources**: Requiere backend (glances, gotop, etc.)
- **datetime**: Personalizable con formatos específicos

### Layouts Disponibles

- **row**: Elementos en fila horizontal
- **column**: Elementos en columna vertical
- **columns**: Especifica número de columnas (1-4)

### APIs Requeridas

Algunos widgets requieren configuración adicional:

- **Weather**: API key de OpenWeatherMap
- **Resources**: Backend como Glances configurado
- **Custom widgets**: Pueden requerir APIs específicas

### Estructura de Directorios

Coloca estos archivos en tu directorio de configuración de homepage:

```
config/
├── services.yaml
├── widgets.yaml
├── bookmarks.yaml
└── settings.yaml
```

### Compatibilidad

Estos archivos son totalmente compatibles con [gethomepage/homepage](https://github.com/gethomepage/homepage) v0.6.0+
