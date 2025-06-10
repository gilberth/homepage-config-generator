# 🎨 Ejemplo de Configuración Completa con Sistema de Iconos Avanzado

Este archivo demuestra todas las funcionalidades del sistema de iconos implementado en el Homepage Configuration Generator.

## ⚙️ Configuración de Settings con Iconos

```yaml
# settings.yaml - Configuración global
title: "Mi Dashboard Hogar"
subtitle: "Sistema de Iconos Avanzado"
theme: dark
color: blue
headerStyle: boxed
iconStyle: gradient # 🎨 Nuevo: Controla el estilo global de iconos
language: es
target: _self
```

### Opciones de iconStyle disponibles:

- `gradient` - Degradados coloridos (por defecto)
- `theme` - Colores que siguen el tema seleccionado
- `mono` - Monocromático elegante
- `adaptive` - Se adapta al contexto del servicio
- `auto` - Detección automática del mejor estilo
- `original` - Mantiene colores originales del icono
- `flat` - Diseño plano moderno
- `outline` - Solo contornos minimalistas

## 🏠 Servicios con Diferentes Tipos de Iconos

```yaml
# services.yaml - Ejemplos completos de iconos
services:
  - group: "🖥️ Infrastructure"
    services:
      - name: "Proxmox"
        icon: "si-proxmox" # Simple Icon para marca específica
        href: "https://proxmox.local:8006"
        description: "Virtualización"

      - name: "TrueNAS"
        icon: "mdi-server" # Material Design Icon genérico
        href: "https://truenas.local"
        description: "Almacenamiento"

      - name: "pfSense"
        icon: "🛡️" # Emoji para mayor expresividad
        href: "https://pfsense.local"
        description: "Firewall"

      - name: "Unifi Controller"
        icon: "https://ui.com/favicon.ico" # URL personalizada
        href: "https://unifi.local:8443"
        description: "Red WiFi"

  - group: "🐳 Containers"
    services:
      - name: "Portainer"
        icon: "si-portainer" # Simple Icon específico
        href: "https://portainer.local"

      - name: "Docker Registry"
        icon: "mdi-docker" # Material Design alternativo
        href: "https://registry.local"

      - name: "Kubernetes Dashboard"
        icon: "si-kubernetes" # Simple Icon oficial
        href: "https://k8s.local"

  - group: "📊 Monitoring"
    services:
      - name: "Grafana"
        icon: "si-grafana" # Simple Icon de la marca
        href: "https://grafana.local"

      - name: "Prometheus"
        icon: "si-prometheus" # Simple Icon específico
        href: "https://prometheus.local"

      - name: "System Monitor"
        icon: "mdi-monitor-dashboard" # Material Design descriptivo
        href: "https://monitor.local"

      - name: "Uptime Kuma"
        icon: "⚡" # Emoji expresivo
        href: "https://uptime.local"

  - group: "🏠 Home Automation"
    services:
      - name: "Home Assistant"
        icon: "si-homeassistant" # Simple Icon oficial
        href: "https://homeassistant.local"

      - name: "Node-RED"
        icon: "mdi-sitemap" # Material Design para flujos
        href: "https://nodered.local"

      - name: "Zigbee2MQTT"
        icon: "📡" # Emoji para comunicación
        href: "https://zigbee.local"

  - group: "☁️ Cloud Services"
    services:
      - name: "Nextcloud"
        icon: "si-nextcloud" # Simple Icon de la marca
        href: "https://nextcloud.local"

      - name: "Bitwarden"
        icon: "si-bitwarden" # Simple Icon oficial
        href: "https://bitwarden.local"

      - name: "Syncthing"
        icon: "mdi-sync" # Material Design para sincronización
        href: "https://syncthing.local"

      - name: "File Server"
        icon: "📁" # Emoji simple y claro
        href: "https://files.local"

  - group: "🎬 Media"
    services:
      - name: "Plex"
        icon: "si-plex" # Simple Icon de la marca
        href: "https://plex.local"

      - name: "Jellyfin"
        icon: "si-jellyfin" # Simple Icon oficial
        href: "https://jellyfin.local"

      - name: "Sonarr"
        icon: "📺" # Emoji para TV shows
        href: "https://sonarr.local"

      - name: "Radarr"
        icon: "🎬" # Emoji para películas
        href: "https://radarr.local"

  - group: "🔧 Development"
    services:
      - name: "GitLab"
        icon: "si-gitlab" # Simple Icon oficial
        href: "https://gitlab.local"

      - name: "Jenkins"
        icon: "si-jenkins" # Simple Icon de la herramienta
        href: "https://jenkins.local"

      - name: "Code Server"
        icon: "si-visualstudiocode" # Simple Icon de VS Code
        href: "https://code.local"

      - name: "Documentation"
        icon: "mdi-book-open" # Material Design para docs
        href: "https://docs.local"

  - group: "🌐 Network Tools"
    services:
      - name: "Pi-hole"
        icon: "🕳️" # Emoji creativo para "hole"
        href: "https://pihole.local"

      - name: "Nginx Proxy Manager"
        icon: "si-nginx" # Simple Icon del servidor web
        href: "https://npm.local"

      - name: "Speedtest Tracker"
        icon: "mdi-speedometer" # Material Design para velocidad
        href: "https://speedtest.local"

      - name: "Network Scanner"
        icon: "🔍" # Emoji para búsqueda/escaneo
        href: "https://scanner.local"
```

## 🔖 Bookmarks con Iconos Diversos

```yaml
# bookmarks.yaml - Marcadores organizados
bookmarks:
  - group: "🚀 Desarrollo"
    bookmarks:
      - name: "GitHub"
        icon: "si-github" # Simple Icon oficial
        href: "https://github.com"

      - name: "Stack Overflow"
        icon: "si-stackoverflow" # Simple Icon de la comunidad
        href: "https://stackoverflow.com"

      - name: "MDN Docs"
        icon: "mdi-web" # Material Design para web
        href: "https://developer.mozilla.org"

      - name: "VS Code Extensions"
        icon: "si-visualstudiocode" # Simple Icon consistente
        href: "https://marketplace.visualstudio.com"

  - group: "📚 Learning"
    bookmarks:
      - name: "Coursera"
        icon: "📖" # Emoji educativo
        href: "https://coursera.org"

      - name: "YouTube"
        icon: "si-youtube" # Simple Icon de la plataforma
        href: "https://youtube.com"

      - name: "Udemy"
        icon: "🎓" # Emoji académico
        href: "https://udemy.com"

  - group: "🛠️ Tools"
    bookmarks:
      - name: "Regex101"
        icon: "mdi-regex" # Material Design específico
        href: "https://regex101.com"

      - name: "JSON Formatter"
        icon: "mdi-code-json" # Material Design para JSON
        href: "https://jsonformatter.curiousconcept.com"

      - name: "Color Picker"
        icon: "🎨" # Emoji para colores
        href: "https://htmlcolorcodes.com"

  - group: "📱 Social"
    bookmarks:
      - name: "Twitter"
        icon: "si-twitter" # Simple Icon de la red social
        href: "https://twitter.com"

      - name: "Reddit"
        icon: "si-reddit" # Simple Icon de la plataforma
        href: "https://reddit.com"

      - name: "Discord"
        icon: "si-discord" # Simple Icon de chat
        href: "https://discord.com"
```

## 🎯 Casos de Uso Específicos

### Cuándo usar cada tipo de icono:

#### 1. Simple Icons (si-\*)

✅ **Usar para:**

- Servicios con marca reconocida (GitHub, Docker, Netflix)
- Herramientas populares (VS Code, Nginx, Redis)
- Plataformas conocidas (YouTube, Twitter, Discord)

#### 2. selfh.st/icons (mdi-\*)

✅ **Usar para:**

- Servicios genéricos sin marca específica
- Funciones abstractas (monitor, settings, backup)
- Cuando no existe Simple Icon apropiado

#### 3. Emojis

✅ **Usar para:**

- Toque personal y expresivo
- Servicios únicos sin representación técnica
- Categorización visual rápida
- Interfaz más amigable y divertida

#### 4. URLs Personalizadas

✅ **Usar para:**

- Logos específicos de empresa
- Servicios propietarios únicos
- Iconos de alta calidad específicos
- Branding corporativo

## 🔧 Tips de Configuración

### Para mejor rendimiento:

1. **Prefiere emojis** - No requieren carga de red
2. **Usa Simple Icons** para marcas conocidas
3. **Material Design** para funciones genéricas
4. **URLs solo cuando sea necesario** - impactan el tiempo de carga

### Para consistencia visual:

1. **Mantén el mismo iconStyle** global
2. **Usa el mismo tipo** para servicios similares
3. **Organiza por categorías** con emojis en grupos
4. **Prueba diferentes estilos** en preview antes de descargar

## 🎨 Combinaciones Recomendadas

### Configuración Profesional:

```yaml
iconStyle: mono
# + Simple Icons para marcas
# + Material Design para funciones
# + URLs mínimas para logos únicos
```

### Configuración Casual:

```yaml
iconStyle: gradient
# + Emojis para expresividad
# + Simple Icons para servicios conocidos
# + Material Design como respaldo
```

### Configuración Corporativa:

```yaml
iconStyle: flat
# + URLs para logos corporativos
# + Simple Icons para herramientas
# + Consistencia en toda la organización
```

---

**¡Tu sistema de iconos está listo para crear dashboards increíbles! 🚀**
