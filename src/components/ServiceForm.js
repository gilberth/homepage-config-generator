// ServiceForm.js - Maneja Service Widgets que se asocian con servicios específicos en services.yaml
// NO confundir con Information Widgets que van en widgets.yaml (manejados por WidgetForm.js)
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSave, FiX } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import IconSelector from './IconSelector';

const FormContainer = styled.div`
  background: ${props => props.theme?.colors?.surface || '#ffffff'};
  border: 1px solid ${props => props.theme?.colors?.border || '#dee2e6'};
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  transition: all 0.2s ease;
`;

const FormTitle = styled.h3`
  margin: 0 0 20px 0;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const FormRow = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid ${props => props.theme?.colors?.border || '#dee2e6'};
  border-radius: 4px;
  font-size: 14px;
  background: ${props => props.theme?.colors?.surface || '#ffffff'};
  color: ${props => props.theme?.colors?.text || '#333333'};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme?.colors?.primary || '#007acc'};
    box-shadow: 0 0 0 2px ${props => (props.theme?.colors?.primary || '#007acc') + '20'};
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid ${props => props.theme?.colors?.border || '#dee2e6'};
  border-radius: 4px;
  font-size: 14px;
  background: ${props => props.theme?.colors?.surface || '#ffffff'};
  color: ${props => props.theme?.colors?.text || '#333333'};
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme?.colors?.primary || '#007acc'};
    box-shadow: 0 0 0 2px ${props => (props.theme?.colors?.primary || '#007acc') + '20'};
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid ${props => props.theme?.colors?.border || '#dee2e6'};
  border-radius: 4px;
  font-size: 14px;
  background: ${props => props.theme?.colors?.surface || '#ffffff'};
  color: ${props => props.theme?.colors?.text || '#333333'};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme?.colors?.primary || '#007acc'};
    box-shadow: 0 0 0 2px ${props => (props.theme?.colors?.primary || '#007acc') + '20'};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  
  &.primary {
    background: ${props => props.theme?.colors?.primary || '#007acc'};
    color: white;
    
    &:hover {
      background: ${props => props.theme?.colors?.primaryHover || '#0056b3'};
    }
  }
  
  &.secondary {
    background: ${props => props.theme?.colors?.secondary || '#6c757d'};
    color: white;
    
    &:hover {
      background: ${props => props.theme?.colors?.secondaryHover || '#5a6268'};
    }
  }
`;

// Lista completa de widgets sincronizada con gethomepage/homepage
const WIDGET_TYPES = [
  // Info & Utilities
  { value: 'weather', label: 'Weather', category: 'Info' },
  { value: 'search', label: 'Search', category: 'Info' },
  { value: 'bookmarks', label: 'Bookmarks', category: 'Info' },
  { value: 'calendar', label: 'Calendar', category: 'Info' },
  { value: 'datetime', label: 'Date & Time', category: 'Info' },
  { value: 'greeting', label: 'Greeting', category: 'Info' },
  { value: 'openweathermap', label: 'OpenWeatherMap', category: 'Info' },
  { value: 'stocks', label: 'Stocks', category: 'Info' },
  { value: 'iframe', label: 'iFrame', category: 'Info' },
  { value: 'mjpeg', label: 'MJPEG Stream', category: 'Info' },
  { value: 'customapi', label: 'Custom API', category: 'Info' },

  // System Monitoring
  { value: 'resources', label: 'System Resources', category: 'System' },
  { value: 'glances', label: 'Glances', category: 'System' },
  { value: 'netdata', label: 'Netdata', category: 'System' },
  { value: 'uptimekuma', label: 'Uptime Kuma', category: 'System' },
  { value: 'uptimerobot', label: 'UptimeRobot', category: 'System' },
  { value: 'prometheus', label: 'Prometheus', category: 'System' },
  { value: 'grafana', label: 'Grafana', category: 'System' },
  { value: 'checkmk', label: 'CheckMK', category: 'System' },
  { value: 'gatus', label: 'Gatus', category: 'System' },
  { value: 'scrutiny', label: 'Scrutiny', category: 'System' },
  { value: 'watchtower', label: 'Watchtower', category: 'System' },
  { value: 'speedtest', label: 'Speedtest Tracker', category: 'System' },
  { value: 'myspeed', label: 'MySpeed', category: 'System' },

  // Virtualization & Containers
  { value: 'proxmox', label: 'Proxmox VE', category: 'Virtualization' },
  { value: 'proxmoxbackupserver', label: 'Proxmox Backup Server', category: 'Virtualization' },
  { value: 'portainer', label: 'Portainer', category: 'Virtualization' },
  { value: 'whatsupdocker', label: "What's Up Docker", category: 'Virtualization' },

  // Storage & Backup
  { value: 'truenas', label: 'TrueNAS', category: 'Storage' },
  { value: 'kopia', label: 'Kopia Backup', category: 'Storage' },
  { value: 'urbackup', label: 'UrBackup', category: 'Storage' },

  // Media & Entertainment
  { value: 'plex', label: 'Plex Media Server', category: 'Media' },
  { value: 'jellyfin', label: 'Jellyfin', category: 'Media' },
  { value: 'emby', label: 'Emby', category: 'Media' },
  { value: 'tautulli', label: 'Tautulli (Plex Analytics)', category: 'Media' },
  { value: 'sonarr', label: 'Sonarr (TV Shows)', category: 'Media' },
  { value: 'radarr', label: 'Radarr (Movies)', category: 'Media' },
  { value: 'lidarr', label: 'Lidarr (Music)', category: 'Media' },
  { value: 'readarr', label: 'Readarr (Books)', category: 'Media' },
  { value: 'bazarr', label: 'Bazarr (Subtitles)', category: 'Media' },
  { value: 'prowlarr', label: 'Prowlarr (Indexer)', category: 'Media' },
  { value: 'overseerr', label: 'Overseerr', category: 'Media' },
  { value: 'jellyseerr', label: 'Jellyseerr', category: 'Media' },
  { value: 'requestrr', label: 'Requestrr', category: 'Media' },
  { value: 'ombi', label: 'Ombi', category: 'Media' },
  { value: 'tubearchivist', label: 'Tube Archivist', category: 'Media' },
  { value: 'channelsdvrserver', label: 'Channels DVR Server', category: 'Media' },
  { value: 'xteve', label: 'xTeve', category: 'Media' },
  { value: 'medusa', label: 'Medusa', category: 'Media' },
  { value: 'mylar', label: 'Mylar3', category: 'Media' },
  { value: 'fileflows', label: 'FileFlows', category: 'Media' },
  { value: 'unmanic', label: 'Unmanic', category: 'Media' },
  { value: 'romm', label: 'Romm', category: 'Media' },

  // Downloads
  { value: 'qbittorrent', label: 'qBittorrent', category: 'Downloads' },
  { value: 'transmission', label: 'Transmission', category: 'Downloads' },
  { value: 'deluge', label: 'Deluge', category: 'Downloads' },
  { value: 'sabnzbd', label: 'SABnzbd', category: 'Downloads' },
  { value: 'nzbget', label: 'NZBGet', category: 'Downloads' },
  { value: 'pyload', label: 'pyLoad', category: 'Downloads' },
  { value: 'jdownloader', label: 'JDownloader', category: 'Downloads' },
  { value: 'downloadstation', label: 'Download Station', category: 'Downloads' },
  { value: 'rutorrent', label: 'ruTorrent', category: 'Downloads' },
  { value: 'slskd', label: 'Slskd (SoulSeek)', category: 'Downloads' },
  { value: 'jackett', label: 'Jackett', category: 'Downloads' },

  // Communication
  { value: 'gotify', label: 'Gotify', category: 'Communication' },
  { value: 'mastodon', label: 'Mastodon', category: 'Communication' },
  { value: 'freshrss', label: 'FreshRSS', category: 'Communication' },
  { value: 'miniflux', label: 'Miniflux', category: 'Communication' },
  { value: 'changedetectionio', label: 'Changedetection.io', category: 'Communication' },
  { value: 'linkwarden', label: 'Linkwarden', category: 'Communication' },

  // Development & Git
  { value: 'gitea', label: 'Gitea', category: 'Development' },
  { value: 'argocd', label: 'ArgoCD', category: 'Development' },
  { value: 'vikunja', label: 'Vikunja', category: 'Development' },
  { value: 'trilium', label: 'Trilium', category: 'Development' },

  // Finance
  { value: 'firefly', label: 'Firefly III', category: 'Finance' },
  { value: 'ghostfolio', label: 'Ghostfolio', category: 'Finance' },
  { value: 'actualbudget', label: 'Actual Budget', category: 'Finance' },

  // Smart Home & IoT
  { value: 'homeassistant', label: 'Home Assistant', category: 'Smart Home' },
  { value: 'homebridge', label: 'Homebridge', category: 'Smart Home' },
  { value: 'esphome', label: 'ESPHome', category: 'Smart Home' },
  { value: 'frigate', label: 'Frigate', category: 'Smart Home' },

  // Network & Security
  { value: 'unifi', label: 'UniFi Controller', category: 'Network' },
  { value: 'opnsense', label: 'OPNSense', category: 'Network' },
  { value: 'pfsense', label: 'pfSense', category: 'Network' },
  { value: 'openwrt', label: 'OpenWRT', category: 'Network' },
  { value: 'traefik', label: 'Traefik', category: 'Network' },
  { value: 'nginx', label: 'Nginx Proxy Manager', category: 'Network' },
  { value: 'authentik', label: 'Authentik', category: 'Network' },
  { value: 'omada', label: 'Omada Controller', category: 'Network' },
  { value: 'mikrotik', label: 'Mikrotik', category: 'Network' },
  { value: 'fritzbox', label: 'FRITZ!Box', category: 'Network' },
  { value: 'gluetun', label: 'Gluetun VPN', category: 'Network' },
  { value: 'technitium', label: 'Technitium DNS', category: 'Network' },

  // Gaming
  { value: 'pterodactyl', label: 'Pterodactyl Panel', category: 'Gaming' },
  { value: 'gamedig', label: 'GameDig', category: 'Gaming' },
  { value: 'minecraft', label: 'Minecraft Server', category: 'Gaming' },
  { value: 'steam', label: 'Steam', category: 'Gaming' },

  // Specialized
  { value: 'octoprint', label: 'OctoPrint', category: 'Specialized' },
  { value: 'paperlessngx', label: 'Paperless-ngx', category: 'Specialized' },
  { value: 'invoiceninja', label: 'Invoice Ninja', category: 'Specialized' },
  { value: 'healthchecks', label: 'Healthchecks.io', category: 'Specialized' },
  { value: 'zabbix', label: 'Zabbix', category: 'Specialized' },
  { value: 'openmediavault', label: 'OpenMediaVault', category: 'Specialized' },
  { value: 'suwayomi', label: 'Suwayomi (Tachidesk)', category: 'Specialized' },
  { value: 'karakeep', label: 'Karakeep', category: 'Specialized' },
  { value: 'develancacheui', label: 'DeveLanCacheUI', category: 'Specialized' },
  { value: 'strelaysrv', label: 'Syncthing Relay Server', category: 'Specialized' },
  { value: 'peanut', label: 'PeaNUT (UPS Monitor)', category: 'Specialized' }
];

// Lista de iconos comunes
const COMMON_ICONS = [
  'mdi-home',
  'mdi-server',
  'mdi-database',
  'mdi-cloud',
  'mdi-monitor',
  'mdi-docker',
  'mdi-kubernetes',
  'mdi-web',
  'mdi-api',
  'mdi-chart-line',
  'mdi-folder',
  'mdi-file',
  'mdi-settings',
  'mdi-tools'
];

// Mapeo de parámetros específicos para cada widget basado en la documentación oficial de gethomepage/homepage
const WIDGET_PARAMETERS = {
  // Sistema y Monitoreo
  'proxmox': {
    required: ['url', 'username', 'password'],
    optional: ['node'],
    fields: {
      url: { type: 'url', label: 'Proxmox URL', placeholder: 'https://proxmox.host.or.ip:8006' },
      username: { type: 'text', label: 'API Token ID', placeholder: 'username@pam!TokenID' },
      password: { type: 'password', label: 'API Token Secret', placeholder: 'your-api-token-secret' },
      node: { type: 'text', label: 'Node Name (optional)', placeholder: 'pve-1' }
    }
  },
  'truenas': {
    required: ['url'],
    optional: ['username', 'password', 'key', 'enablePools', 'nasType'],
    fields: {
      url: { type: 'url', label: 'TrueNAS URL', placeholder: 'http://truenas.host.or.ip' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' },
      key: { type: 'text', label: 'API Key (alternative to username/password)', placeholder: 'your-api-key' },
      enablePools: { type: 'checkbox', label: 'Enable detailed pool listings' },
      nasType: { type: 'select', label: 'NAS Type', options: [{ value: 'scale', label: 'TrueNAS Scale' }, { value: 'core', label: 'TrueNAS Core' }], default: 'scale' }
    }
  },
  'unifi': {
    required: ['url'],
    optional: ['username', 'password', 'key', 'site'],
    fields: {
      url: { type: 'url', label: 'UniFi Controller URL', placeholder: 'https://unifi.host.or.ip:port' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' },
      key: { type: 'text', label: 'API Key (alternative)', placeholder: 'your-api-key' },
      site: { type: 'text', label: 'Site Name (optional)', placeholder: 'default' }
    }
  },
  'portainer': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Portainer URL', placeholder: 'http://portainer.host.or.ip:9000' },
      key: { type: 'text', label: 'API Token', placeholder: 'your-portainer-api-token' }
    }
  },
  'plex': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Plex Server URL', placeholder: 'http://plex.host.or.ip:32400' },
      key: { type: 'text', label: 'Plex Token', placeholder: 'your-plex-token' }
    }
  },
  'jellyfin': {
    required: ['url', 'key'],
    optional: ['enableBlocks', 'enableNowPlaying', 'enableUser', 'showEpisodeNumber', 'expandOneStreamToTwoRows'],
    fields: {
      url: { type: 'url', label: 'Jellyfin URL', placeholder: 'http://jellyfin.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-jellyfin-api-key' },
      enableBlocks: { type: 'checkbox', label: 'Enable content blocks' },
      enableNowPlaying: { type: 'checkbox', label: 'Enable Now Playing', default: true },
      enableUser: { type: 'checkbox', label: 'Enable user-specific streams' },
      showEpisodeNumber: { type: 'checkbox', label: 'Show episode numbers' },
      expandOneStreamToTwoRows: { type: 'checkbox', label: 'Expand one stream to two rows', default: true }
    }
  },
  'sonarr': {
    required: ['url', 'key'],
    optional: ['enableQueue'],
    fields: {
      url: { type: 'url', label: 'Sonarr URL', placeholder: 'http://sonarr.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-sonarr-api-key' },
      enableQueue: { type: 'checkbox', label: 'Enable detailed queue listing' }
    }
  },
  'radarr': {
    required: ['url', 'key'],
    optional: ['enableQueue'],
    fields: {
      url: { type: 'url', label: 'Radarr URL', placeholder: 'http://radarr.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-radarr-api-key' },
      enableQueue: { type: 'checkbox', label: 'Enable detailed queue listing' }
    }
  },
  'lidarr': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Lidarr URL', placeholder: 'http://lidarr.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-lidarr-api-key' }
    }
  },
  'prowlarr': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Prowlarr URL', placeholder: 'http://prowlarr.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-prowlarr-api-key' }
    }
  },
  'overseerr': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Overseerr URL', placeholder: 'http://overseerr.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-overseerr-api-key' }
    }
  },
  'jellyseerr': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Jellyseerr URL', placeholder: 'http://jellyseerr.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-jellyseerr-api-key' }
    }
  },
  'ombi': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Ombi URL', placeholder: 'http://ombi.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-ombi-api-key' }
    }
  },
  'qbittorrent': {
    required: ['url', 'username', 'password'],
    optional: ['enableLeechProgress'],
    fields: {
      url: { type: 'url', label: 'qBittorrent URL', placeholder: 'http://qbittorrent.host.or.ip' },
      username: { type: 'text', label: 'Username', placeholder: 'username' },
      password: { type: 'password', label: 'Password', placeholder: 'password' },
      enableLeechProgress: { type: 'checkbox', label: 'Enable leech progress', default: false }
    }
  },
  'transmission': {
    required: ['url', 'username', 'password'],
    optional: ['rpcUrl'],
    fields: {
      url: { type: 'url', label: 'Transmission URL', placeholder: 'http://transmission.host.or.ip' },
      username: { type: 'text', label: 'Username', placeholder: 'username' },
      password: { type: 'password', label: 'Password', placeholder: 'password' },
      rpcUrl: { type: 'text', label: 'RPC URL (optional)', placeholder: '/transmission/' }
    }
  },
  'sabnzbd': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'SABnzbd URL', placeholder: 'http://sabnzbd.host.or.ip:8080' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-sabnzbd-api-key' }
    }
  },
  'nzbget': {
    required: ['url', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'NZBGet URL', placeholder: 'http://nzbget.host.or.ip' },
      username: { type: 'text', label: 'Control Username', placeholder: 'nzbget' },
      password: { type: 'password', label: 'Control Password', placeholder: 'your-control-password' }
    }
  },
  'tautulli': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Tautulli URL', placeholder: 'http://tautulli.host.or.ip:8181' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-tautulli-api-key' }
    }
  },
  'uptimekuma': {
    required: ['url', 'slug'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Uptime Kuma URL', placeholder: 'http://uptimekuma.host.or.ip:3001' },
      slug: { type: 'text', label: 'Status Page Slug', placeholder: 'your-status-page-slug' }
    }
  },
  'homeassistant': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Home Assistant URL', placeholder: 'http://homeassistant.host.or.ip:8123' },
      key: { type: 'text', label: 'Long-Lived Access Token', placeholder: 'your-home-assistant-token' }
    }
  },
  'adguard': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'AdGuard Home URL', placeholder: 'http://adguard.host.or.ip' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' }
    }
  },
  'pihole': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Pi-hole URL', placeholder: 'http://pihole.host.or.ip' },
      key: { type: 'text', label: 'API Token', placeholder: 'your-pihole-api-token' }
    }
  },
  'grafana': {
    required: ['url', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Grafana URL', placeholder: 'http://grafana.host.or.ip:3000' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' }
    }
  },
  'glances': {
    required: ['url'],
    optional: ['username', 'password', 'version', 'metric', 'diskUnits', 'refreshInterval', 'pointsLimit'],
    fields: {
      url: { type: 'url', label: 'Glances URL', placeholder: 'http://glances.host.or.ip:61208' },
      username: { type: 'text', label: 'Username (if auth enabled)', placeholder: 'admin' },
      password: { type: 'password', label: 'Password (if auth enabled)', placeholder: 'your-password' },
      version: { type: 'select', label: 'Glances Version', options: [{ value: '3', label: 'Version 3' }, { value: '4', label: 'Version 4' }], default: '3' },
      metric: { type: 'select', label: 'Metric to Display', options: [
        { value: 'cpu', label: 'CPU' },
        { value: 'mem', label: 'Memory' },
        { value: 'disk', label: 'Disk' },
        { value: 'network', label: 'Network' }
      ]},
      diskUnits: { type: 'select', label: 'Disk Units', options: [{ value: 'bytes', label: 'Bytes' }, { value: 'bbytes', label: 'Binary Bytes' }], default: 'bytes' },
      refreshInterval: { type: 'number', label: 'Refresh Interval (ms)', placeholder: '5000', default: '5000' },
      pointsLimit: { type: 'number', label: 'Data Points Limit', placeholder: '15', default: '15' }
    }
  },
  'netdata': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Netdata URL', placeholder: 'http://netdata.host.or.ip:19999' }
    }
  },
  'prometheus': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Prometheus URL', placeholder: 'http://prometheus.host.or.ip:9090' }
    }
  },
  'traefik': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'Traefik URL', placeholder: 'http://traefik.host.or.ip' },
      username: { type: 'text', label: 'Username (optional)', placeholder: 'username' },
      password: { type: 'password', label: 'Password (optional)', placeholder: 'password' }
    }
  },
  'nginx': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'Nginx Proxy Manager URL', placeholder: 'http://nginx.host.or.ip:81' },
      username: { type: 'text', label: 'Username', placeholder: 'admin@example.com' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' }
    }
  },
  'authentik': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Authentik URL', placeholder: 'http://authentik.host.or.ip:9000' },
      key: { type: 'text', label: 'API Token', placeholder: 'your-authentik-api-token' }
    }
  },
  'pfsense': {
    required: ['url', 'wan'],
    optional: ['username', 'password', 'headers', 'version', 'fields'],
    fields: {
      url: { type: 'url', label: 'pfSense URL', placeholder: 'http://pfsense.host.or.ip:port' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' },
      wan: { type: 'text', label: 'WAN Interface', placeholder: 'igb0' },
      version: { type: 'select', label: 'API Version', options: [{ value: '1', label: 'API v1' }, { value: '2', label: 'API v2' }], default: '1' }
    }
  },
  'opnsense': {
    required: ['url', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'OPNSense URL', placeholder: 'https://opnsense.host.or.ip' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' }
    }
  },
  'watchtower': {
    required: ['url'],
    optional: ['key'],
    fields: {
      url: { type: 'url', label: 'Watchtower Metrics URL', placeholder: 'http://watchtower.host.or.ip:8080' },
      key: { type: 'text', label: 'API Token (optional)', placeholder: 'your-watchtower-token' }
    }
  },
  'gotify': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Gotify URL', placeholder: 'http://gotify.host.or.ip:80' },
      key: { type: 'text', label: 'App Token', placeholder: 'your-gotify-app-token' }
    }
  },
  'immich': {
    required: ['url', 'key'],
    optional: ['version'],
    fields: {
      url: { type: 'url', label: 'Immich URL', placeholder: 'http://immich.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-immich-api-key' },
      version: { type: 'select', label: 'Immich Version', options: [{ value: '1', label: 'Version 1' }, { value: '2', label: 'Version 2 (v1.118+)' }], default: '1' }
    }
  },
  'paperlessngx': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Paperless-ngx URL', placeholder: 'http://paperless.host.or.ip:8000' },
      key: { type: 'text', label: 'API Token', placeholder: 'your-paperless-api-token' }
    }
  },
  'octoprint': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'OctoPrint URL', placeholder: 'http://octoprint.host.or.ip:5000' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-octoprint-api-key' }
    }
  },
  // Widgets adicionales populares
  'emby': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Emby URL', placeholder: 'http://emby.host.or.ip:8096' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-emby-api-key' }
    }
  },
  'bazarr': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Bazarr URL', placeholder: 'http://bazarr.host.or.ip:6767' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-bazarr-api-key' }
    }
  },
  'readarr': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Readarr URL', placeholder: 'http://readarr.host.or.ip:8787' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-readarr-api-key' }
    }
  },
  'deluge': {
    required: ['url', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Deluge URL', placeholder: 'http://deluge.host.or.ip:8112' },
      password: { type: 'password', label: 'WebUI Password', placeholder: 'your-deluge-password' }
    }
  },
  'rutorrent': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'ruTorrent URL', placeholder: 'http://rutorrent.host.or.ip' },
      username: { type: 'text', label: 'Username (optional)', placeholder: 'admin' },
      password: { type: 'password', label: 'Password (optional)', placeholder: 'your-password' }
    }
  },
  'omada': {
    required: ['url', 'username', 'password', 'site'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Omada Controller URL', placeholder: 'http://omada.host.or.ip:8043' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' },
      site: { type: 'text', label: 'Site Name', placeholder: 'Default' }
    }
  },
  'mikrotik': {
    required: ['url', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Mikrotik URL', placeholder: 'https://mikrotik.host.or.ip' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' }
    }
  },
  'diskstation': {
    required: ['url', 'username', 'password'],
    optional: ['volume'],
    fields: {
      url: { type: 'url', label: 'Synology DiskStation URL', placeholder: 'http://diskstation.host.or.ip:5000' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' },
      volume: { type: 'text', label: 'Volume (optional)', placeholder: 'volume_1' }
    }
  },
  'qnap': {
    required: ['url', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'QNAP URL', placeholder: 'http://qnap.host.or.ip:8080' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' }
    }
  },
  'nextdns': {
    required: ['profile', 'key'],
    optional: [],
    fields: {
      profile: { type: 'text', label: 'Profile ID', placeholder: 'your-nextdns-profile-id' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-nextdns-api-key' }
    }
  },
  'adguard': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'AdGuard Home URL', placeholder: 'http://adguard.host.or.ip:3000' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' }
    }
  },
  'pihole': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Pi-hole URL', placeholder: 'http://pihole.host.or.ip' },
      key: { type: 'text', label: 'API Token', placeholder: 'your-pihole-api-token' }
    }
  },
  'frigate': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Frigate URL', placeholder: 'http://frigate.host.or.ip:5000' }
    }
  },
  'homebridge': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'Homebridge URL', placeholder: 'http://homebridge.host.or.ip:8581' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' }
    }
  },
  'esphome': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'ESPHome URL', placeholder: 'http://esphome.host.or.ip:6052' },
      username: { type: 'text', label: 'Username (if auth enabled)', placeholder: 'admin' },
      password: { type: 'password', label: 'Password (if auth enabled)', placeholder: 'your-password' }
    }
  },
  'pterodactyl': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Pterodactyl Panel URL', placeholder: 'https://pterodactyl.host.or.ip' },
      key: { type: 'text', label: 'Client API Key', placeholder: 'your-pterodactyl-api-key' }
    }
  },
  'minecraft': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'text', label: 'Minecraft Server URL', placeholder: 'udp://minecraft.host.or.ip:25565' }
    }
  },
  'steam': {
    required: ['key'],
    optional: [],
    fields: {
      key: { type: 'text', label: 'Steam API Key', placeholder: 'your-steam-api-key' }
    }
  },
  'changedetectionio': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Changedetection.io URL', placeholder: 'http://changedetection.host.or.ip:5000' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-changedetection-api-key' }
    }
  },
  'linkwarden': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Linkwarden URL', placeholder: 'http://linkwarden.host.or.ip:3000' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-linkwarden-api-key' }
    }
  },
  'miniflux': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Miniflux URL', placeholder: 'http://miniflux.host.or.ip:8080' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-miniflux-api-key' }
    }
  },
  'freshrss': {
    required: ['url', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'FreshRSS URL', placeholder: 'http://freshrss.host.or.ip' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' }
    }
  },
  'mastodon': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Mastodon Instance URL', placeholder: 'https://mastodon.social' }
    }
  },
  'firefly': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Firefly III URL', placeholder: 'http://firefly.host.or.ip' },
      key: { type: 'text', label: 'Personal Access Token', placeholder: 'your-firefly-token' }
    }
  },
  'actualbudget': {
    required: ['url', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Actual Budget URL', placeholder: 'http://actual.host.or.ip:5006' },
      password: { type: 'password', label: 'Server Password', placeholder: 'your-actual-password' }
    }
  },
  'ghostfolio': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Ghostfolio URL', placeholder: 'http://ghostfolio.host.or.ip:3333' },
      key: { type: 'text', label: 'Security Token', placeholder: 'your-ghostfolio-token' }
    }
  },
  'gitea': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Gitea URL', placeholder: 'http://gitea.host.or.ip:3000' },
      key: { type: 'text', label: 'Access Token', placeholder: 'your-gitea-token' }
    }
  },
  'argocd': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'ArgoCD URL', placeholder: 'http://argocd.host.or.ip:8080' },
      key: { type: 'text', label: 'API Token', placeholder: 'your-argocd-token' }
    }
  },
  'gitlab': {
    required: ['url', 'key', 'user_id'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'GitLab URL', placeholder: 'https://gitlab.com' },
      key: { type: 'text', label: 'Personal Access Token', placeholder: 'your-gitlab-token' },
      user_id: { type: 'text', label: 'User ID', placeholder: '123456' }
    }
  },
  'azuredevops': {
    required: ['organization', 'project', 'key'],
    optional: ['definitionId', 'branchName', 'userEmail', 'repositoryId'],
    fields: {
      organization: { type: 'text', label: 'Organization', placeholder: 'your-organization' },
      project: { type: 'text', label: 'Project', placeholder: 'your-project' },
      key: { type: 'text', label: 'Personal Access Token', placeholder: 'your-azure-devops-pat' },
      definitionId: { type: 'text', label: 'Pipeline Definition ID (for pipelines)', placeholder: '12345' },
      branchName: { type: 'text', label: 'Branch Name (optional)', placeholder: 'main' },
      userEmail: { type: 'email', label: 'User Email (for pull requests)', placeholder: 'user@example.com' },
      repositoryId: { type: 'text', label: 'Repository ID (for pull requests)', placeholder: 'repo-id' }
    }
  },
  // Widgets de información y sistema
  'weather': {
    required: ['latitude', 'longitude'],
    optional: ['units', 'apikey'],
    fields: {
      latitude: { type: 'number', label: 'Latitude', placeholder: '40.7128', step: 'any' },
      longitude: { type: 'number', label: 'Longitude', placeholder: '-74.0060', step: 'any' },
      units: { type: 'select', label: 'Units', options: [
        { value: 'metric', label: 'Metric (°C)' },
        { value: 'imperial', label: 'Imperial (°F)' },
        { value: 'standard', label: 'Standard (K)' }
      ], default: 'metric' },
      apikey: { type: 'text', label: 'API Key (optional)', placeholder: 'your-weather-api-key' }
    }
  },
  'openweathermap': {
    required: ['latitude', 'longitude', 'apikey'],
    optional: ['units', 'cache'],
    fields: {
      latitude: { type: 'number', label: 'Latitude', placeholder: '40.7128', step: 'any' },
      longitude: { type: 'number', label: 'Longitude', placeholder: '-74.0060', step: 'any' },
      apikey: { type: 'text', label: 'OpenWeatherMap API Key', placeholder: 'your-openweather-api-key' },
      units: { type: 'select', label: 'Units', options: [
        { value: 'metric', label: 'Metric (°C)' },
        { value: 'imperial', label: 'Imperial (°F)' },
        { value: 'standard', label: 'Standard (K)' }
      ], default: 'metric' },
      cache: { type: 'number', label: 'Cache Duration (minutes)', placeholder: '5', default: '5' }
    }
  },
  'resources': {
    required: [],
    optional: ['cpu', 'memory', 'disk', 'cputemp', 'tempmin', 'tempmax', 'uptime', 'units', 'refresh', 'diskUnits', 'network'],
    fields: {
      cpu: { type: 'checkbox', label: 'Show CPU usage', default: true },
      memory: { type: 'checkbox', label: 'Show memory usage', default: true },
      disk: { type: 'text', label: 'Disk mount path', placeholder: '/disk/mount/path' },
      cputemp: { type: 'checkbox', label: 'Show CPU temperature' },
      tempmin: { type: 'number', label: 'Min CPU temp', placeholder: '0' },
      tempmax: { type: 'number', label: 'Max CPU temp', placeholder: '100' },
      uptime: { type: 'checkbox', label: 'Show uptime' },
      units: { type: 'select', label: 'Temperature units', options: [
        { value: 'metric', label: 'Celsius' },
        { value: 'imperial', label: 'Fahrenheit' }
      ], default: 'metric' },
      refresh: { type: 'number', label: 'Refresh interval (ms)', placeholder: '3000', default: '3000' },
      diskUnits: { type: 'select', label: 'Disk units', options: [
        { value: 'bytes', label: 'Bytes' },
        { value: 'bbytes', label: 'Binary Bytes' }
      ], default: 'bytes' },
      network: { type: 'text', label: 'Network interface (optional)', placeholder: 'eth0' }
    }
  },
  'customapi': {
    required: ['url'],
    optional: ['method', 'headers', 'mappings', 'display'],
    fields: {
      url: { type: 'url', label: 'API URL', placeholder: 'https://api.example.com/data' },
      method: { type: 'select', label: 'HTTP Method', options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' }
      ], default: 'GET' },
      display: { type: 'select', label: 'Display Type', options: [
        { value: 'list', label: 'List' },
        { value: 'dynamic-list', label: 'Dynamic List' }
      ], default: 'list' }
    }
  },
  'iframe': {
    required: ['name', 'src'],
    optional: ['width', 'height'],
    fields: {
      name: { type: 'text', label: 'Frame Name', placeholder: 'My Frame' },
      src: { type: 'url', label: 'Source URL', placeholder: 'https://example.com' },
      width: { type: 'number', label: 'Width (optional)', placeholder: '800' },
      height: { type: 'number', label: 'Height (optional)', placeholder: '600' }
    }
  },

  // Media Services - Additional configurations
  'emby': {
    required: ['url', 'key'],
    optional: ['enableBlocks', 'enableNowPlaying', 'enableUser', 'showEpisodeNumber', 'expandOneStreamToTwoRows'],
    fields: {
      url: { type: 'url', label: 'Emby URL', placeholder: 'http://emby.host.or.ip:8096' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-emby-api-key' },
      enableBlocks: { type: 'checkbox', label: 'Enable content blocks' },
      enableNowPlaying: { type: 'checkbox', label: 'Enable Now Playing', default: true },
      enableUser: { type: 'checkbox', label: 'Enable user-specific streams' },
      showEpisodeNumber: { type: 'checkbox', label: 'Show episode numbers' },
      expandOneStreamToTwoRows: { type: 'checkbox', label: 'Expand one stream to two rows', default: true }
    }
  },
  'mylar': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Mylar3 URL', placeholder: 'http://mylar3.host.or.ip:port' },
      key: { type: 'text', label: 'API Key', placeholder: 'yourmylar3apikey' }
    }
  },
  'readarr': {
    required: ['url', 'key'],
    optional: ['enableQueue'],
    fields: {
      url: { type: 'url', label: 'Readarr URL', placeholder: 'http://readarr.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'apikeyapikeyapikeyapikeyapikey' },
      enableQueue: { type: 'checkbox', label: 'Enable detailed queue listing' }
    }
  },
  'lidarr': {
    required: ['url', 'key'],
    optional: ['enableQueue'],
    fields: {
      url: { type: 'url', label: 'Lidarr URL', placeholder: 'http://lidarr.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'apikeyapikeyapikeyapikeyapikey' },
      enableQueue: { type: 'checkbox', label: 'Enable detailed queue listing' }
    }
  },
  'channelsdvrserver': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Channels DVR Server URL', placeholder: 'http://channels.host.or.ip:8089' }
    }
  },
  'medusa': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Medusa URL', placeholder: 'http://medusa.host.or.ip:8081' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-medusa-api-key' }
    }
  },
  'fileflows': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'FileFlows URL', placeholder: 'http://fileflows.host.or.ip:5000' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-fileflows-api-key' }
    }
  },
  'unmanic': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'Unmanic URL', placeholder: 'http://unmanic.host.or.ip:8888' },
      username: { type: 'text', label: 'Username (if auth enabled)', placeholder: 'admin' },
      password: { type: 'password', label: 'Password (if auth enabled)', placeholder: 'your-password' }
    }
  },
  'audiobookshelf': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Audiobookshelf URL', placeholder: 'http://audiobookshelf.host.or.ip:port' },
      key: { type: 'text', label: 'API Key', placeholder: 'audiobookshelfllapikey' }
    }
  },
  'komga': {
    required: ['url', 'username', 'password'],
    optional: ['key'],
    fields: {
      url: { type: 'url', label: 'Komga URL', placeholder: 'http://komga.host.or.ip:port' },
      username: { type: 'text', label: 'Username', placeholder: 'username' },
      password: { type: 'password', label: 'Password', placeholder: 'password' },
      key: { type: 'text', label: 'API Key (optional)', placeholder: 'komgaapikey' }
    }
  },
  'tubearchivist': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Tube Archivist URL', placeholder: 'http://tubearchivist.host.or.ip:8000' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-tubearchivist-api-key' }
    }
  },
  'xteve': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'xTeve URL', placeholder: 'http://xteve.host.or.ip:34400' },
      username: { type: 'text', label: 'Username (if auth enabled)', placeholder: 'username' },
      password: { type: 'password', label: 'Password (if auth enabled)', placeholder: 'password' }
    }
  },

  // Download Clients
  'deluge': {
    required: ['url', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Deluge URL', placeholder: 'http://deluge.host.or.ip' },
      password: { type: 'password', label: 'WebUI Password', placeholder: 'password' }
    }
  },
  'downloadstation': {
    required: ['url', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Synology Download Station URL', placeholder: 'http://downloadstation.host.or.ip:port' },
      username: { type: 'text', label: 'Username', placeholder: 'username' },
      password: { type: 'password', label: 'Password', placeholder: 'password' }
    }
  },
  'rutorrent': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'ruTorrent URL', placeholder: 'http://rutorrent.host.or.ip' },
      username: { type: 'text', label: 'Username (optional)', placeholder: 'username' },
      password: { type: 'password', label: 'Password (optional)', placeholder: 'password' }
    }
  },
  'pyload': {
    required: ['url', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'PyLoad URL', placeholder: 'http://pyload.host.or.ip:8000' },
      username: { type: 'text', label: 'Username', placeholder: 'pyload' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' }
    }
  },
  'jdownloader': {
    required: ['username', 'password', 'client'],
    optional: [],
    fields: {
      username: { type: 'text', label: 'JDownloader Username', placeholder: 'JDownloader Username' },
      password: { type: 'password', label: 'JDownloader Password', placeholder: 'JDownloader Password' },
      client: { type: 'text', label: 'Client Name', placeholder: 'Name of JDownloader Instance' }
    }
  },
  'slskd': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Slskd URL', placeholder: 'http://slskd.host.or.ip:5030' },
      key: { type: 'text', label: 'API Key', placeholder: 'generatedapikey' }
    }
  },

  // System Monitoring - Additional configurations
  'uptimerobot': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'UptimeRobot API URL', placeholder: 'https://api.uptimerobot.com', default: 'https://api.uptimerobot.com' },
      key: { type: 'text', label: 'API Token', placeholder: 'uptimerobotapitoken' }
    }
  },
  'checkmk': {
    required: ['url', 'site', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Check_MK URL', placeholder: 'http://checkmk.host.or.ip:port' },
      site: { type: 'text', label: 'Site Name', placeholder: 'your-site-name-cla-by-default' },
      username: { type: 'text', label: 'Username', placeholder: 'username' },
      password: { type: 'password', label: 'Password', placeholder: 'password' }
    }
  },
  'gatus': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Gatus URL', placeholder: 'http://gatus.host.or.ip:8080' }
    }
  },
  'scrutiny': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Scrutiny URL', placeholder: 'http://scrutiny.host.or.ip:8080' }
    }
  },
  'healthchecks': {
    required: ['url', 'key'],
    optional: ['uuid'],
    fields: {
      url: { type: 'url', label: 'Health Checks URL', placeholder: 'http://healthchecks.host.or.ip:port' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-api-key' },
      uuid: { type: 'text', label: 'Check UUID (optional)', placeholder: 'check-uuid' }
    }
  },
  'zabbix': {
    required: ['url', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Zabbix URL', placeholder: 'http://zabbix.host.or.ip' },
      username: { type: 'text', label: 'Username', placeholder: 'Admin' },
      password: { type: 'password', label: 'Password', placeholder: 'zabbix' }
    }
  },

  // Network & Security - Additional configurations
  'opnsense': {
    required: ['url', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'OPNSense URL', placeholder: 'https://opnsense.host.or.ip' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' }
    }
  },
  'mikrotik': {
    required: ['url', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Mikrotik URL', placeholder: 'https://mikrotik.host.or.ip' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' }
    }
  },
  'technitium': {
    required: ['url', 'key'],
    optional: ['range'],
    fields: {
      url: { type: 'url', label: 'Technitium DNS URL', placeholder: 'http://dns.host.or.ip' },
      key: { type: 'text', label: 'API Token', placeholder: 'biglongapitoken' },
      range: { type: 'select', label: 'Time Range', options: [
        { value: 'LastHour', label: 'Last Hour' },
        { value: 'LastDay', label: 'Last Day' },
        { value: 'LastWeek', label: 'Last Week' },
        { value: 'LastMonth', label: 'Last Month' }
      ], default: 'LastHour' }
    }
  },
  'nextdns': {
    required: ['profile', 'key'],
    optional: [],
    fields: {
      profile: { type: 'text', label: 'Profile ID', placeholder: 'profileid' },
      key: { type: 'text', label: 'API Key', placeholder: 'yourapikeyhere' }
    }
  },
  'wgeasy': {
    required: ['url', 'username', 'password'],
    optional: ['version', 'threshold'],
    fields: {
      url: { type: 'url', label: 'Wg-Easy URL', placeholder: 'http://wg.easy.or.ip' },
      username: { type: 'text', label: 'Username', placeholder: 'yourwgusername' },
      password: { type: 'password', label: 'Password', placeholder: 'yourwgeasypassword' },
      version: { type: 'select', label: 'Version', options: [
        { value: '1', label: 'Version 1' },
        { value: '2', label: 'Version 2' }
      ], default: '1' },
      threshold: { type: 'number', label: 'Connection Threshold (minutes)', placeholder: '2', default: '2' }
    }
  },
  'omada': {
    required: ['url', 'username', 'password'],
    optional: ['site'],
    fields: {
      url: { type: 'url', label: 'Omada Controller URL', placeholder: 'https://omada.host.or.ip:8043' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' },
      site: { type: 'text', label: 'Site Name (optional)', placeholder: 'Default' }
    }
  },
  'fritzbox': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'FRITZ!Box URL', placeholder: 'http://fritz.box' },
      username: { type: 'text', label: 'Username (if auth enabled)', placeholder: 'admin' },
      password: { type: 'password', label: 'Password (if auth enabled)', placeholder: 'your-password' }
    }
  },

  // Smart Home & IoT
  'openhab': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'OpenHAB URL', placeholder: 'http://openhab.host.or.ip:8080' },
      username: { type: 'text', label: 'Username (if auth enabled)', placeholder: 'admin' },
      password: { type: 'password', label: 'Password (if auth enabled)', placeholder: 'your-password' }
    }
  },

  // Storage & Backup - Additional configurations
  'diskstation': {
    required: ['url', 'username', 'password'],
    optional: ['volume'],
    fields: {
      url: { type: 'url', label: 'Synology DiskStation URL', placeholder: 'http://diskstation.host.or.ip:5000' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' },
      volume: { type: 'text', label: 'Volume (optional)', placeholder: 'volume_1' }
    }
  },
  'openmediavault': {
    required: ['url', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'OpenMediaVault URL', placeholder: 'http://omv.host.or.ip' },
      username: { type: 'text', label: 'Username', placeholder: 'admin' },
      password: { type: 'password', label: 'Password', placeholder: 'your-password' }
    }
  },
  'kopia': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'Kopia URL', placeholder: 'http://kopia.host.or.ip:51515' },
      username: { type: 'text', label: 'Username (if auth enabled)', placeholder: 'admin' },
      password: { type: 'password', label: 'Password (if auth enabled)', placeholder: 'your-password' }
    }
  },
  'urbackup': {
    required: ['url', 'username', 'password'],
    optional: ['maxDays'],
    fields: {
      url: { type: 'url', label: 'UrBackup URL', placeholder: 'http://urbackupUrl:55414' },
      username: { type: 'text', label: 'Username', placeholder: 'urbackupUsername' },
      password: { type: 'password', label: 'Password', placeholder: 'urbackupPassword' },
      maxDays: { type: 'number', label: 'Max Days for "Out of Date"', placeholder: '5', default: '5' }
    }
  },

  // Communication & Information
  'mastodon': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Mastodon Instance URL', placeholder: 'https://mastodon.social' },
      key: { type: 'text', label: 'Access Token', placeholder: 'your-mastodon-access-token' }
    }
  },
  'miniflux': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Miniflux URL', placeholder: 'http://miniflux.host.or.ip:port' },
      key: { type: 'text', label: 'API Key', placeholder: 'minifluxapikey' }
    }
  },
  'mailcow': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Mailcow URL', placeholder: 'https://mailcow.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'mailcowapikey' }
    }
  },

  // Specialized Tools
  'lubelogger': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'LubeLogger URL', placeholder: 'http://lubelogger.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-lubelogger-api-key' }
    }
  },
  'peanut': {
    required: ['url'],
    optional: ['key'],
    fields: {
      url: { type: 'url', label: 'Peanut URL', placeholder: 'http://peanut.host.or.ip:8080' },
      key: { type: 'text', label: 'API Key (optional)', placeholder: 'your-peanut-api-key' }
    }
  },
  'moonraker': {
    required: ['url'],
    optional: ['key'],
    fields: {
      url: { type: 'url', label: 'Moonraker URL', placeholder: 'http://moonraker.host.or.ip:port' },
      key: { type: 'text', label: 'API Key (if auth enabled)', placeholder: 'api_keymoonraker' }
    }
  },
  'suwayomi': {
    required: ['url'],
    optional: ['username', 'password', 'category'],
    fields: {
      url: { type: 'url', label: 'Suwayomi URL', placeholder: 'http://suwayomi.host.or.ip' },
      username: { type: 'text', label: 'Username (optional)', placeholder: 'username' },
      password: { type: 'password', label: 'Password (optional)', placeholder: 'password' },
      category: { type: 'number', label: 'Category ID (optional)', placeholder: '0' }
    }
  },
  'vikunja': {
    required: ['url', 'key'],
    optional: ['enableTaskList'],
    fields: {
      url: { type: 'url', label: 'Vikunja URL', placeholder: 'http://vikunja.host.or.ip:port' },
      key: { type: 'text', label: 'API Key', placeholder: 'vikunjaapikey' },
      enableTaskList: { type: 'checkbox', label: 'Enable task list display' }
    }
  },
  'karakeep': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Karakeep URL', placeholder: 'http://karakeep.host.or.ip:port' },
      key: { type: 'text', label: 'API Key', placeholder: 'karakeep_api_key' }
    }
  },
  'plantit': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Plant-it URL', placeholder: 'http://plant-it.host.or.ip:port' },
      key: { type: 'text', label: 'API Key', placeholder: 'plantit-api-key' }
    }
  },
  'develancacheui': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'DeveLanCacheUI Backend URL', placeholder: 'http://your.develancacheui_backend.host:port' }
    }
  },
  'strelaysrv': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Syncthing Relay Server URL', placeholder: 'http://syncthing.host.or.ip:22070' }
    }
  },

  // Finance
  'ghostfolio': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Ghostfolio URL', placeholder: 'http://ghostfolio.host.or.ip:3333' },
      key: { type: 'text', label: 'Security Token', placeholder: 'your-ghostfolio-security-token' }
    }
  },
  'actualbudget': {
    required: ['url', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Actual Budget URL', placeholder: 'http://actualbudget.host.or.ip:5006' },
      password: { type: 'password', label: 'Server Password', placeholder: 'your-server-password' }
    }
  },

  // Gaming
  'minecraft': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'text', label: 'Minecraft Server URL', placeholder: 'udp://minecraft.host.or.ip:25565' }
    }
  },
  'steam': {
    required: ['key'],
    optional: [],
    fields: {
      key: { type: 'text', label: 'Steam API Key', placeholder: 'your-steam-api-key' }
    }
  },
  'gamedig': {
    required: ['url', 'type'],
    optional: [],
    fields: {
      url: { type: 'text', label: 'Game Server Address', placeholder: 'gameserver.host.or.ip:port' },
      type: { type: 'text', label: 'Game Type', placeholder: 'minecraft, csgo, tf2, etc.' }
    }
  },

  // MISSING WIDGETS - Based on official gethomepage/homepage documentation
  'proxmoxbackupserver': {
    required: ['url', 'username', 'password'],
    optional: ['datastore'],
    fields: {
      url: { type: 'url', label: 'Proxmox Backup Server URL', placeholder: 'https://proxmoxbackupserver.host:port' },
      username: { type: 'text', label: 'API Token ID', placeholder: 'api_token_id' },
      password: { type: 'password', label: 'API Token Secret', placeholder: 'api_token_secret' },
      datastore: { type: 'text', label: 'Datastore Name (optional)', placeholder: 'datastore_name' }
    }
  },

  'myspeed': {
    required: ['url'],
    optional: ['password'],
    fields: {
      url: { type: 'url', label: 'MySpeed URL', placeholder: 'http://myspeed.host.or.ip:port' },
      password: { type: 'password', label: 'Password (if set)', placeholder: 'password' }
    }
  },

  'technitium': {
    required: ['url', 'key'],
    optional: ['range'],
    fields: {
      url: { type: 'url', label: 'Technitium DNS Server URL', placeholder: 'http://dns.host.or.ip' },
      key: { type: 'text', label: 'API Token', placeholder: 'biglongapitoken' },
      range: { 
        type: 'select', 
        label: 'Time Range', 
        options: [
          { value: 'LastHour', label: 'Last Hour' },
          { value: 'LastDay', label: 'Last Day' },
          { value: 'LastWeek', label: 'Last Week' },
          { value: 'LastMonth', label: 'Last Month' }
        ], 
        default: 'LastHour' 
      }
    }
  },

  'strelaysrv': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Syncthing Relay Server URL', placeholder: 'http://syncthing.host.or.ip:22070' }
    }
  },

  'channelsdvrserver': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Channels DVR Server URL', placeholder: 'http://channels.host.or.ip:8089' }
    }
  },

  'swagdashboard': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'SWAG Dashboard URL', placeholder: 'http://swagdashboard.host.or.ip:81' }
    }
  },

  'develancacheui': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'DeveLanCacheUI Backend URL', placeholder: 'http://develancacheui.host.or.ip:port' }
    }
  },

  'tailscale': {
    required: ['deviceid', 'key'],
    optional: [],
    fields: {
      deviceid: { type: 'text', label: 'Device ID', placeholder: 'deviceid' },
      key: { type: 'text', label: 'API Access Token', placeholder: 'tailscalekey' }
    }
  },

  'jellystat': {
    required: ['url', 'key'],
    optional: ['days'],
    fields: {
      url: { type: 'url', label: 'Jellystat URL', placeholder: 'http://jellystat.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'apikeyapikeyapikeyapikeyapikey' },
      days: { type: 'number', label: 'Days for statistics (optional)', placeholder: '30', default: '30' }
    }
  },

  'ghostfolio': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Ghostfolio URL', placeholder: 'http://ghostfolio.host.or.ip' },
      key: { type: 'text', label: 'Bearer Token', placeholder: 'ghostfoliobearertoken' }
    }
  },

  'romm': {
    required: ['url', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Romm URL', placeholder: 'http://romm.host.or.ip' },
      username: { type: 'text', label: 'Username', placeholder: 'username' },
      password: { type: 'password', label: 'Password', placeholder: 'password' }
    }
  },

  'actualbudget': {
    required: ['url', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Actual Budget URL', placeholder: 'http://actualbudget.host.or.ip' },
      password: { type: 'password', label: 'Server Password', placeholder: 'server-password' }
    }
  },

  'firefly': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Firefly III URL', placeholder: 'http://firefly.host.or.ip' },
      key: { type: 'text', label: 'Personal Access Token', placeholder: 'firefly-personal-access-token' }
    }
  },

  'frigate': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'Frigate URL', placeholder: 'http://frigate.host.or.ip:5000' },
      username: { type: 'text', label: 'Username (if auth enabled)', placeholder: 'admin' },
      password: { type: 'password', label: 'Password (if auth enabled)', placeholder: 'password' }
    }
  },

  'requestrr': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Requestrr URL', placeholder: 'http://requestrr.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'requestrr-api-key' }
    }
  },

  'trilium': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Trilium URL', placeholder: 'http://trilium.host.or.ip' },
      key: { type: 'text', label: 'ETAPI Token', placeholder: 'trilium-etapi-token' }
    }
  },

  'invoiceninja': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Invoice Ninja URL', placeholder: 'http://invoiceninja.host.or.ip' },
      key: { type: 'text', label: 'API Token', placeholder: 'invoice-ninja-api-token' }
    }
  },

  'plantit': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Plant-it URL', placeholder: 'http://plant-it.host.or.ip:port' },
      key: { type: 'text', label: 'API Key', placeholder: 'plant-it-api-key' }
    }
  },

  'karakeep': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Karakeep URL', placeholder: 'http://karakeep.host.or.ip:port' },
      key: { type: 'text', label: 'API Key', placeholder: 'karakeep_api_key' }
    }
  },

  'mailcow': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Mailcow URL', placeholder: 'http://mailcow.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'mailcowapikey' }
    }
  },

  'lubelogger': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'LubeLogger URL', placeholder: 'http://lubelogger.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'your-lubelogger-api-key' }
    }
  },

  'peanut': {
    required: ['url', 'key'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'PeaNUT URL', placeholder: 'http://peanut.host.or.ip:8080' },
      key: { type: 'text', label: 'UPS Name', placeholder: 'nameofyourups' },
      username: { type: 'text', label: 'Username (if auth enabled)', placeholder: 'username' },
      password: { type: 'password', label: 'Password (if auth enabled)', placeholder: 'password' }
    }
  },

  'moonraker': {
    required: ['url'],
    optional: ['key'],
    fields: {
      url: { type: 'url', label: 'Moonraker URL', placeholder: 'http://moonraker.host.or.ip:port' },
      key: { type: 'text', label: 'API Key (if auth enabled)', placeholder: 'api_keymoonraker' }
    }
  },

  // Additional missing service widgets based on WIDGET_TYPES list
  'netdata': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'Netdata URL', placeholder: 'http://netdata.host.or.ip:19999' },
      username: { type: 'text', label: 'Username (if auth enabled)', placeholder: 'admin' },
      password: { type: 'password', label: 'Password (if auth enabled)', placeholder: 'password' }
    }
  },

  'prometheus': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'Prometheus URL', placeholder: 'http://prometheus.host.or.ip:9090' },
      username: { type: 'text', label: 'Username (if auth enabled)', placeholder: 'admin' },
      password: { type: 'password', label: 'Password (if auth enabled)', placeholder: 'password' }
    }
  },

  'whatsupdocker': {
    required: ['url'],
    optional: ['key'],
    fields: {
      url: { type: 'url', label: "What's Up Docker URL", placeholder: 'http://whatsupdocker.host.or.ip:3000' },
      key: { type: 'text', label: 'API Key (if auth enabled)', placeholder: 'whatsupdocker-api-key' }
    }
  },

  'paperlessngx': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Paperless-ngx URL', placeholder: 'http://paperless.host.or.ip:8000' },
      key: { type: 'text', label: 'API Token', placeholder: 'paperless-api-token' }
    }
  },

  'gitea': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Gitea URL', placeholder: 'http://gitea.host.or.ip:3000' },
      key: { type: 'text', label: 'Access Token', placeholder: 'gitea-access-token' }
    }
  },

  // Additional missing widgets identified from comprehensive documentation review

  'flood': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'Flood URL', placeholder: 'http://flood.host.or.ip' },
      username: { type: 'text', label: 'Username (if set)', placeholder: 'username' },
      password: { type: 'password', label: 'Password (if set)', placeholder: 'password' }
    }
  },

  'autobrr': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Autobrr URL', placeholder: 'http://autobrr.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'apikeyapikeyapikeyapikeyapikey' }
    }
  },

  'mjpeg': {
    required: ['stream'],
    optional: [],
    fields: {
      stream: { type: 'url', label: 'MJPEG Stream URL', placeholder: 'http://mjpeg.host.or.ip/webcam/stream' }
    }
  },

  'portainer': {
    required: ['url', 'env', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Portainer URL', placeholder: 'https://portainer.host.or.ip:9443' },
      env: { type: 'number', label: 'Environment ID', placeholder: '1' },
      key: { type: 'text', label: 'API Access Key', placeholder: 'ptr_accesskeyaccesskeyaccesskeyaccesskey' }
    }
  },

  'opendtu': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'OpenDTU URL', placeholder: 'http://opendtu.host.or.ip' }
    }
  },

  'calibreweb': {
    required: ['url', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Calibre-web URL', placeholder: 'http://calibreweb.host.or.ip:port' },
      username: { type: 'text', label: 'Username', placeholder: 'username' },
      password: { type: 'password', label: 'Password', placeholder: 'password' }
    }
  },

  'fritzbox': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'FRITZ!Box URL', placeholder: 'http://fritz.box' },
      username: { type: 'text', label: 'Username (optional)', placeholder: 'admin' },
      password: { type: 'password', label: 'Password (optional)', placeholder: 'password' }
    }
  },

  'hdhomerun': {
    required: ['url'],
    optional: ['tuner', 'fields'],
    fields: {
      url: { type: 'url', label: 'HDHomerun URL', placeholder: 'http://hdhomerun.host.or.ip' },
      tuner: { type: 'number', label: 'Tuner Index (optional)', placeholder: '0', default: '0' },
      fields: { type: 'text', label: 'Fields (comma separated)', placeholder: 'channels,hd' }
    }
  },

  'mastodon': {
    required: ['url'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Mastodon Instance URL', placeholder: 'https://mastodon.host.name' }
    }
  },

  'freshrss': {
    required: ['url', 'username', 'password'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'FreshRSS URL', placeholder: 'http://freshrss.host.or.ip:port' },
      username: { type: 'text', label: 'Username', placeholder: 'username' },
      password: { type: 'password', label: 'API Password', placeholder: 'password' }
    }
  },

  'miniflux': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Miniflux URL', placeholder: 'http://miniflux.host.or.ip:port' },
      key: { type: 'text', label: 'API Key', placeholder: 'minifluxapikey' }
    }
  },

  'linkwarden': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Linkwarden URL', placeholder: 'http://linkwarden.host.or.ip' },
      key: { type: 'text', label: 'API Key', placeholder: 'myApiKeyHere' }
    }
  },

  'changedetectionio': {
    required: ['url', 'key'],
    optional: [],
    fields: {
      url: { type: 'url', label: 'Changedetection.io URL', placeholder: 'http://changedetection.host.or.ip:port' },
      key: { type: 'text', label: 'API Key', placeholder: 'apikeyapikeyapikeyapikeyapikey' }
    }
  },

  'stocks': {
    required: ['provider', 'watchlist'],
    optional: ['showUSMarketStatus'],
    fields: {
      provider: { 
        type: 'select', 
        label: 'Data Provider', 
        options: [
          { value: 'finnhub', label: 'Finnhub' }
        ],
        default: 'finnhub'
      },
      watchlist: { type: 'text', label: 'Stock Symbols (comma separated)', placeholder: 'GME,AMC,NVDA,TSM,TSLA,AAPL,MSFT' },
      showUSMarketStatus: { type: 'checkbox', label: 'Show US Market Status', default: true }
    }
  },

  'calendar': {
    required: [],
    optional: ['firstDayInWeek', 'view', 'maxEvents', 'showTime', 'timezone', 'integrations'],
    fields: {
      firstDayInWeek: { 
        type: 'select', 
        label: 'First Day of Week', 
        options: [
          { value: 'monday', label: 'Monday' },
          { value: 'sunday', label: 'Sunday' }
        ],
        default: 'monday'
      },
      view: { 
        type: 'select', 
        label: 'Calendar View', 
        options: [
          { value: 'monthly', label: 'Monthly' },
          { value: 'agenda', label: 'Agenda' }
        ],
        default: 'monthly'
      },
      maxEvents: { type: 'number', label: 'Max Events', placeholder: '10', default: '10' },
      showTime: { type: 'checkbox', label: 'Show event times', default: false },
      timezone: { type: 'text', label: 'Timezone (optional)', placeholder: 'America/Los_Angeles' }
    }
  },

  'iframe': {
    required: ['name', 'src'],
    optional: ['width', 'height'],
    fields: {
      name: { type: 'text', label: 'Frame Name', placeholder: 'myIframe' },
      src: { type: 'url', label: 'Source URL', placeholder: 'http://example.com' },
      width: { type: 'number', label: 'Width (optional)', placeholder: '800' },
      height: { type: 'number', label: 'Height (optional)', placeholder: '600' }
    }
  },

  // Downloads - Missing Widget
  'jackett': {
    required: ['url'],
    optional: ['username', 'password'],
    fields: {
      url: { type: 'url', label: 'Jackett URL', placeholder: 'http://jackett.host.or.ip:9117' },
      username: { type: 'text', label: 'Username (optional)', placeholder: 'username' },
      password: { type: 'password', label: 'Password (optional)', placeholder: 'password' }
    }
  }
};

const ServiceForm = ({ service, onSave, onCancel }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: service?.name || '',
    icon: service?.icon || '',
    href: service?.href || '',
    description: service?.description || '',
    server: service?.server || '',
    container: service?.container || '',
    widget: service?.widget || null,
    ping: service?.ping || null,
    target: service?.target || '_blank', // Nueva opción para controlar cómo se abre el enlace
    ...service
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Limpiar campos vacíos
    const cleanData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    onSave(cleanData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWidgetChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      widget: {
        ...prev.widget,
        [field]: value
      }
    }));
  };

  const renderWidgetFields = () => {
    const widgetType = formData.widget?.type;
    if (!widgetType || !WIDGET_PARAMETERS[widgetType]) {
      return null;
    }

    const widgetConfig = WIDGET_PARAMETERS[widgetType];
    const fields = [];

    // Renderizar campos requeridos
    widgetConfig.required.forEach(fieldName => {
      const field = widgetConfig.fields[fieldName];
      if (field) {
        fields.push(renderWidgetField(fieldName, field, true));
      }
    });

    // Renderizar campos opcionales
    widgetConfig.optional.forEach(fieldName => {
      const field = widgetConfig.fields[fieldName];
      if (field) {
        fields.push(renderWidgetField(fieldName, field, false));
      }
    });

    if (fields.length === 0) return null;

    return (
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px' }}>
          {WIDGET_TYPES.find(w => w.value === widgetType)?.label} Configuration
        </h4>
        {fields}
      </div>
    );
  };

  const renderWidgetField = (fieldName, field, isRequired) => {
    const value = formData.widget?.[fieldName] || field.default || '';
    
    return (
      <FormRow key={fieldName}>
        <FormGroup>
          <Label>
            {field.label} {isRequired && <span style={{ color: 'red' }}>*</span>}
          </Label>
          {renderFieldInput(fieldName, field, value, isRequired)}
        </FormGroup>
      </FormRow>
    );
  };

  const renderFieldInput = (fieldName, field, value, isRequired) => {
    switch (field.type) {
      case 'checkbox':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={value === true || value === 'true'}
              onChange={(e) => handleWidgetChange(fieldName, e.target.checked)}
              style={{ margin: 0 }}
            />
            <span style={{ fontSize: '14px', color: '#666' }}>
              {field.label}
            </span>
          </div>
        );
      
      case 'select':
        return (
          <Select
            value={value}
            onChange={(e) => handleWidgetChange(fieldName, e.target.value)}
            required={isRequired}
          >
            <option value="">Select an option</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      
      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleWidgetChange(fieldName, e.target.value)}
            placeholder={field.placeholder}
            step={field.step || '1'}
            required={isRequired}
          />
        );
      
      case 'password':
        return (
          <Input
            type="password"
            value={value}
            onChange={(e) => handleWidgetChange(fieldName, e.target.value)}
            placeholder={field.placeholder}
            required={isRequired}
          />
        );
      
      case 'email':
        return (
          <Input
            type="email"
            value={value}
            onChange={(e) => handleWidgetChange(fieldName, e.target.value)}
            placeholder={field.placeholder}
            required={isRequired}
          />
        );
      
      default: // text, url
        return (
          <Input
            type={field.type || 'text'}
            value={value}
            onChange={(e) => handleWidgetChange(fieldName, e.target.value)}
            placeholder={field.placeholder}
            required={isRequired}
          />
        );
    }
  };

  return (
    <FormContainer theme={theme}>
      <FormTitle theme={theme}>{service ? 'Edit Service' : 'Add New Service'}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label theme={theme}>Service Name *</Label>
            <Input
              theme={theme}
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g., Plex, Nextcloud, etc."
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Icon</Label>
            <IconSelector
              value={formData.icon}
              onChange={(value) => handleChange('icon', value)}
              placeholder="Search icons or enter custom URL/emoji..."
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label>URL *</Label>
            <Input
              type="url"
              value={formData.href}
              onChange={(e) => handleChange('href', e.target.value)}
              placeholder="https://example.com"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Open In</Label>
            <Select
              value={formData.target}
              onChange={(e) => handleChange('target', e.target.value)}
            >
              <option value="_blank">New Tab</option>
              <option value="_self">Same Tab</option>
              <option value="_parent">Parent Frame</option>
              <option value="_top">Top Frame</option>
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label>Description</Label>
            <TextArea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Brief description of the service"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label>Server (for widgets)</Label>
            <Input
              type="text"
              value={formData.server}
              onChange={(e) => handleChange('server', e.target.value)}
              placeholder="my-server"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Container (for Docker widgets)</Label>
            <Input
              type="text"
              value={formData.container}
              onChange={(e) => handleChange('container', e.target.value)}
              placeholder="container-name"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label>Widget Type</Label>
            <Select
              value={formData.widget?.type || ''}
              onChange={(e) => {
                const widgetType = e.target.value;
                if (widgetType) {
                  // Inicializar widget con valores por defecto
                  const defaultValues = {};
                  if (WIDGET_PARAMETERS[widgetType]) {
                    Object.entries(WIDGET_PARAMETERS[widgetType].fields).forEach(([fieldName, field]) => {
                      if (field.default !== undefined) {
                        defaultValues[fieldName] = field.default;
                      }
                    });
                  }
                  
                  handleChange('widget', { 
                    type: widgetType,
                    ...defaultValues
                  });
                } else {
                  handleChange('widget', null);
                }
              }}
            >
              <option value="">No widget</option>
              {/* Agrupar widgets por categoría */}
              {Object.entries(
                WIDGET_TYPES.reduce((acc, widget) => {
                  const category = widget.category || 'Other';
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(widget);
                  return acc;
                }, {})
              )
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([category, widgets]) => (
                  <optgroup key={category} label={`${category} (${widgets.length})`}>
                    {widgets
                      .sort((a, b) => a.label.localeCompare(b.label))
                      .map(widget => (
                        <option key={widget.value} value={widget.value}>
                          {widget.label}
                        </option>
                      ))}
                  </optgroup>
                ))
              }
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>Enable Ping</Label>
            <Input
              type="url"
              value={formData.ping || ''}
              onChange={(e) => handleChange('ping', e.target.value || null)}
              placeholder="URL to ping (optional)"
            />
          </FormGroup>
        </FormRow>

        {/* Campos dinámicos específicos del widget */}
        {renderWidgetFields()}

        <ButtonGroup>
          <Button type="button" className="secondary" onClick={onCancel}>
            <FiX /> Cancel
          </Button>
          <Button type="submit" className="primary">
            <FiSave /> Save Service
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default ServiceForm;
