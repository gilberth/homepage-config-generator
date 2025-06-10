# Widget Configuration - Dynamic Fields

## Descripción

La aplicación ahora incluye funcionalidad para mostrar dinámicamente los campos de configuración específicos de cada tipo de widget basándose en la documentación oficial de [gethomepage/homepage](https://github.com/gethomepage/homepage).

## Funcionalidades Implementadas

### 1. Campos Dinámicos por Widget

Cuando seleccionas un tipo de widget en el formulario de servicio, automáticamente aparecen los campos de configuración específicos para ese widget:

- **Campos Requeridos**: Marcados con asterisco rojo (\*)
- **Campos Opcionales**: Pueden dejarse vacíos
- **Valores por Defecto**: Se cargan automáticamente cuando están disponibles
- **Validación de Tipos**: URL, email, número, contraseña, texto, etc.

### 2. Widgets Soportados (90+ configuraciones)

#### Sistema y Monitoreo

- **Proxmox VE**: URL, API Token ID, API Token Secret, Node (opcional)
- **TrueNAS**: URL, Usuario/Contraseña o API Key, Enable Pools, Tipo NAS
- **Glances**: URL, Usuario/Contraseña, Versión, Métrica, Unidades, Intervalos
- **Netdata**: URL
- **Prometheus**: URL
- **Grafana**: URL, Usuario, Contraseña

#### Virtualización y Contenedores

- **Portainer**: URL, API Token
- **What's Up Docker**: URL, Usuario/Contraseña opcionales

#### Almacenamiento y Backup

- **Kopia**: URL, Usuario, Contraseña, Host/Path específicos
- **UrBackup**: URL, Usuario, Contraseña, Max Days

#### Media y Entretenimiento

- **Plex**: URL, Token
- **Jellyfin**: URL, API Key, configuraciones avanzadas (bloques, Now Playing, etc.)
- **Sonarr/Radarr/Lidarr**: URL, API Key, Enable Queue
- **Bazarr/Readarr**: URL, API Key
- **Overseerr/Jellyseerr/Ombi**: URL, API Key
- **Tautulli**: URL, API Key

#### Descargas

- **qBittorrent/Transmission**: URL, Usuario/Contraseña opcionales
- **SABnzbd**: URL, API Key
- **NZBGet**: URL, Control Username, Control Password
- **Deluge**: URL, WebUI Password
- **ruTorrent**: URL, Usuario/Contraseña opcionales

#### Red y Seguridad

- **UniFi Controller**: URL, Usuario/Contraseña o API Key, Sitio
- **pfSense**: URL, Usuario, Contraseña, Interfaz WAN, Versión API
- **OPNSense**: URL, Usuario, Contraseña
- **Traefik**: URL
- **Nginx Proxy Manager**: URL, Usuario/Contraseña
- **Authentik**: URL, API Token
- **Omada Controller**: URL, Usuario, Contraseña, Sitio
- **Mikrotik**: URL, Usuario, Contraseña

#### Smart Home y IoT

- **Home Assistant**: URL, Long-Lived Access Token
- **Homebridge**: URL, Usuario/Contraseña opcionales
- **ESPHome**: URL, Usuario/Contraseña si auth habilitado
- **Frigate**: URL

#### Comunicación

- **Gotify**: URL, App Token
- **Mastodon**: URL de instancia
- **FreshRSS**: URL, Usuario, Contraseña
- **Miniflux**: URL, API Key
- **Changedetection.io**: URL, API Key
- **Linkwarden**: URL, API Key

#### Desarrollo

- **Gitea**: URL, Access Token
- **ArgoCD**: URL, API Token
- **GitLab**: URL, Personal Access Token, User ID
- **Azure DevOps**: Organización, Proyecto, PAT, configuraciones específicas

#### Finanzas

- **Firefly III**: URL, Personal Access Token
- **Actual Budget**: URL, Server Password
- **Ghostfolio**: URL, Security Token

#### Gaming

- **Pterodactyl Panel**: URL, Client API Key
- **Minecraft Server**: URL del servidor
- **Steam**: Steam API Key

#### Información y Utilidades

- **Weather/OpenWeatherMap**: Latitud, Longitud, API Key, Unidades
- **System Resources**: CPU, Memoria, Disco, Temperatura, configuraciones avanzadas
- **Custom API**: URL, Método HTTP, Tipo de display
- **iFrame**: Nombre, URL fuente, dimensiones opcionales

### 3. Tipos de Campos Soportados

- **Text**: Campos de texto simple
- **URL**: Validación de formato URL
- **Email**: Validación de formato email
- **Password**: Campo de contraseña oculta
- **Number**: Campos numéricos con step configurable
- **Checkbox**: Opciones booleanas
- **Select**: Listas desplegables con opciones predefinidas

### 4. Características Avanzadas

#### Validación Inteligente

- Campos requeridos vs opcionales
- Validación de tipos de entrada
- Valores por defecto automáticos

#### Interfaz Intuitiva

- Campos agrupados por widget
- Etiquetas descriptivas
- Placeholders informativos
- Indicadores visuales para campos requeridos

#### Gestión de Estado

- Persistencia de valores al cambiar widgets
- Limpieza automática de campos vacíos
- Preservación de configuraciones existentes

## Uso

1. **Seleccionar Widget**: En el formulario de servicio, elige un tipo de widget del dropdown
2. **Configurar Campos**: Aparecerán automáticamente los campos específicos del widget
3. **Completar Requeridos**: Los campos marcados con (\*) son obligatorios
4. **Guardar**: El formulario validará y guardará la configuración

## Documentación de Referencia

Todas las configuraciones están basadas en la documentación oficial de gethomepage/homepage:

- [Widget Documentation](https://gethomepage.dev/en/widgets/)
- [Service Widgets](https://gethomepage.dev/en/widgets/services/)
- [Info Widgets](https://gethomepage.dev/en/widgets/info/)

## Ejemplos de Configuraciones Populares

### Proxmox VE

```yaml
widget:
  type: proxmox
  url: https://proxmox.host.or.ip:8006
  username: username@pam!TokenID
  password: api-token-secret
  node: pve-1
```

### Jellyfin

```yaml
widget:
  type: jellyfin
  url: http://jellyfin.host.or.ip
  key: your-jellyfin-api-key
  enableBlocks: true
  enableNowPlaying: true
```

### UniFi Controller

```yaml
widget:
  type: unifi
  url: https://unifi.host.or.ip:8443
  username: admin
  password: your-password
  site: default
```

La implementación garantiza que todos los widgets tengan la configuración correcta según las especificaciones oficiales de Homepage.
