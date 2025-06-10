// IconSelector.js - Componente avanzado para selección de íconos
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { FiSearch, FiX, FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const SelectorContainer = styled.div`
  position: relative;
  width: 100%;
`;

const IconInput = styled.input`
  width: 100%;
  padding: 8px 40px 8px 12px;
  border: 1px solid ${props => props.theme?.colors?.border || '#dee2e6'};
  border-radius: 4px;
  background: ${props => props.theme?.colors?.input || '#ffffff'};
  color: ${props => props.theme?.colors?.text || '#333333'};
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme?.colors?.primary || '#007acc'};
    box-shadow: 0 0 0 2px ${props => props.theme?.colors?.primaryAlpha || 'rgba(0, 122, 204, 0.2)'};
  }

  &::placeholder {
    color: ${props => props.theme?.colors?.textSecondary || '#6c757d'};
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme?.colors?.textSecondary || '#6c757d'};
  cursor: pointer;
  padding: 4px;
  border-radius: 2px;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme?.colors?.primary || '#007acc'};
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${props => props.theme?.colors?.surface || '#ffffff'};
  border: 1px solid ${props => props.theme?.colors?.border || '#dee2e6'};
  border-radius: 4px;
  box-shadow: 0 4px 12px ${props => props.theme?.colors?.shadow || 'rgba(0,0,0,0.15)'};
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 2px;
`;

const CategoryHeader = styled.div`
  padding: 8px 12px;
  background: ${props => props.theme?.colors?.background || '#f8f9fa'};
  border-bottom: 1px solid ${props => props.theme?.colors?.border || '#dee2e6'};
  font-weight: 600;
  font-size: 12px;
  color: ${props => props.theme?.colors?.textSecondary || '#6c757d'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const IconOption = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s ease;
  border-bottom: 1px solid ${props => props.theme?.colors?.border || '#dee2e6'};

  &:hover {
    background: ${props => props.theme?.colors?.hover || '#f8f9fa'};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const IconPreview = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: ${props => props.theme?.colors?.primary || '#007acc'};
`;

const IconLabel = styled.span`
  flex: 1;
  font-size: 14px;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const IconCode = styled.span`
  font-size: 12px;
  color: ${props => props.theme?.colors?.textSecondary || '#6c757d'};
  font-family: 'Courier New', monospace;
`;

const NoResults = styled.div`
  padding: 16px 12px;
  text-align: center;
  color: ${props => props.theme?.colors?.textSecondary || '#6c757d'};
  font-size: 14px;
`;

const HelperText = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: ${props => props.theme?.colors?.textSecondary || '#6c757d'};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ExternalLink = styled.a`
  color: ${props => props.theme?.colors?.primary || '#007acc'};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 2px;

  &:hover {
    text-decoration: underline;
  }
`;

// Extensas librerías de íconos organizadas por categorías
const ICON_LIBRARIES = {
  'selfh.st/icons': {
    prefix: 'sh-',
    icons: [
      // Aplicaciones populares de self-hosting
      'plex', 'jellyfin', 'emby', 'sonarr', 'radarr', 'lidarr', 'prowlarr', 'bazarr', 'overseerr', 'jellyseerr',
      'nextcloud', 'owncloud', 'seafile', 'syncthing', 'resilio-sync', 'duplicati', 'rclone', 'borgbackup',
      
      // Herramientas de desarrollo y DevOps
      'docker', 'kubernetes', 'portainer', 'rancher', 'nomad', 'consul', 'vault', 'terraform',
      'jenkins', 'gitlab', 'gitea', 'forgejo', 'github', 'bitbucket', 'drone', 'woodpecker',
      
      // Bases de datos
      'mysql', 'postgresql', 'mariadb', 'mongodb', 'redis', 'influxdb', 'prometheus', 'grafana',
      'elasticsearch', 'kibana', 'logstash', 'clickhouse', 'cassandra', 'couchdb',
      
      // Servidores web y proxy
      'nginx', 'apache', 'caddy', 'traefik', 'haproxy', 'cloudflare', 'lets-encrypt', 'certbot',
      
      // Monitoreo y observabilidad
      'uptime-kuma', 'healthchecks', 'statuspage', 'datadog', 'newrelic', 'sentry', 'bugsnag',
      'zabbix', 'nagios', 'icinga', 'checkmk', 'librenms', 'observium',
      
      // Automatización del hogar
      'home-assistant', 'openhab', 'domoticz', 'node-red', 'zigbee2mqtt', 'z-wave-js-ui',
      'mosquitto', 'esphome', 'tasmota', 'shelly', 'philips-hue', 'ikea-tradfri',
      
      // VPN y redes
      'wireguard', 'openvpn', 'pritunl', 'tailscale', 'zerotier', 'headscale', 'netbird',
      'pfsense', 'opnsense', 'ubiquiti', 'mikrotik', 'cisco', 'tp-link',
      
      // Comunicación y colaboración
      'mattermost', 'rocket-chat', 'matrix', 'element', 'signal', 'telegram', 'discord',
      'slack', 'teams', 'zoom', 'jitsi', 'bigbluebutton', 'mumble', 'teamspeak',
      
      // Almacenamiento y archivos
      'minio', 'garage', 'seaweedfs', 'ceph', 'glusterfs', 'nfs', 'samba', 'ftp',
      'filebrowser', 'filerun', 'alist', 'h5ai', 'directory-lister',
      
      // Gestores de contraseñas
      'bitwarden', 'vaultwarden', 'keepass', 'padloc', 'passbolt', 'psono',
      
      // Herramientas de red
      'pihole', 'adguard', 'unbound', 'bind9', 'dnsmasq', 'technitium',
      'speedtest', 'iperf3', 'smokeping', 'ntopng', 'cacti',
      
      // Gestión de servidores
      'portainer', 'yacht', 'dockge', 'lazydocker', 'ctop', 'dive',
      'cockpit', 'webmin', 'ajenti', 'ispconfig', 'froxlor',
      
      // Backup y sincronización
      'proxmox-backup', 'urbackup', 'bacula', 'bareos', 'amanda', 'rdiff-backup',
      'rsnapshot', 'timeshift', 'vorta', 'kopia', 'restic',
      
      // E-commerce y CMS
      'wordpress', 'drupal', 'joomla', 'ghost', 'strapi', 'directus',
      'prestashop', 'woocommerce', 'magento', 'opencart', 'bagisto',
      
      // Analytics y métricas
      'matomo', 'plausible', 'umami', 'ackee', 'fathom', 'google-analytics',
      'mixpanel', 'amplitude', 'hotjar', 'fullstory',
      
      // Herramientas de productividad
      'notion', 'obsidian', 'logseq', 'trilium', 'tiddlywiki', 'bookstack',
      'outline', 'siyuan', 'joplin', 'standard-notes', 'hedgedoc',
      
      // Gaming y entretenimiento
      'steam', 'epic-games', 'gog', 'itch-io', 'lutris', 'heroic',
      'minecraft', 'terraria', 'factorio', 'satisfactory',
      
      // Finanzas y contabilidad
      'firefly-iii', 'actual', 'maybe', 'budget-zero', 'kresus',
      'invoice-ninja', 'crater', 'akaunting', 'invoiceplane',
      
      // IoT y sensores
      'mqtt', 'influxdb', 'telegraf', 'chronograf', 'kapacitor',
      'thingsboard', 'devicehive', 'mainflux', 'arduino', 'raspberry-pi',
      
      // Servicios de desarrollo
      'gitea', 'forgejo', 'sourcehut', 'fossil', 'mercurial',
      'sonarqube', 'nexus', 'artifactory', 'harbor', 'registry',
      
      // Herramientas de sistema
      'htop', 'btop', 'glances', 'netdata', 'collectd', 'munin',
      'cacti', 'rrdtool', 'mrtg', 'pandora-fms'
    ]
  },
  
  'Simple Icons': {
    prefix: 'si-',
    icons: [
      // Tecnología y desarrollo
      'docker', 'kubernetes', 'nginx', 'apache', 'nodejs', 'python', 'javascript',
      'typescript', 'react', 'vue', 'angular', 'svelte', 'nextdotjs', 'nuxtdotjs',
      
      // Servicios cloud
      'amazonaws', 'googlecloud', 'microsoftazure', 'digitalocean', 'heroku', 'vercel',
      'netlify', 'cloudflare', 'firebase', 'supabase',
      
      // Bases de datos
      'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'influxdb',
      'prometheus', 'grafana', 'kibana',
      
      // Monitoreo y observabilidad
      'datadog', 'newrelic', 'sentry', 'bugsnag', 'honeybadger', 'rollbar',
      'uptime-robot', 'pingdom', 'statuspage',
      
      // Media y entretenimiento
      'plex', 'jellyfin', 'emby', 'kodi', 'netflix', 'spotify', 'youtube',
      'twitch', 'discord', 'slack', 'teamspeak', 'mumble',
      
      // Automatización y CI/CD
      'jenkins', 'githubactions', 'gitlab', 'bitbucket', 'teamcity', 'bamboo',
      'circleci', 'travisci', 'ansible', 'terraform',
      
      // Virtualización
      'vmware', 'virtualbox', 'proxmox', 'citrix', 'hyperv',
      
      // Almacenamiento
      'synology', 'qnap', 'freenas', 'truenas', 'nextcloud', 'owncloud',
      'dropbox', 'googledrive', 'onedrive', 'box',
      
      // Comunicación y colaboración
      'mattermost', 'rocketchat', 'matrix', 'signal', 'telegram', 'whatsapp',
      'zoom', 'microsoftteams', 'googlehangouts', 'skype',
      
      // Home Assistant y IoT
      'homeassistant', 'openhab', 'nodered', 'mosquitto', 'zigbee', 'zwave',
      'philipshue', 'xiaomi', 'samsung', 'apple', 'google',
      
      // Redes
      'ubiquiti', 'mikrotik', 'cisco', 'netgear', 'linksys', 'asus',
      'pfsense', 'opnsense', 'unifi', 'edgerouter',
      
      // Seguridad
      'bitwarden', 'lastpass', 'keepass', 'authy', 'nordvpn', 'expressvpn',
      'wireguard', 'openvpn', 'tailscale', 'zerotier',
      
      // Desarrollo de juegos
      'unity', 'unrealengine', 'godot', 'blender', 'steam', 'epicgames',
      'nintendo', 'playstation', 'xbox', 'twitch',
      
      // Finanzas y criptomonedas
      'bitcoin', 'ethereum', 'litecoin', 'dogecoin', 'monero', 'binance',
      'coinbase', 'kraken', 'paypal', 'stripe',
      
      // E-commerce
      'shopify', 'woocommerce', 'magento', 'prestashop', 'opencart',
      'amazon', 'ebay', 'etsy', 'alibaba',
      
      // Redes sociales
      'facebook', 'twitter', 'instagram', 'linkedin', 'reddit', 'pinterest',
      'tiktok', 'snapchat', 'tumblr', 'flickr',
      
      // Productividad
      'notion', 'obsidian', 'evernote', 'onenote', 'todoist', 'trello',
      'asana', 'monday', 'airtable', 'zapier',
      
      // Herramientas de código
      'visualstudiocode', 'intellijidea', 'sublime', 'atom', 'vim', 'emacs',
      'github', 'gitlab', 'gitea', 'forgejo', 'sourcetree',
      
      // API y herramientas
      'postman', 'insomnia', 'swagger', 'apidog', 'httpie', 'curl'
    ]
  }
};

const IconSelector = ({ value, onChange, placeholder = "Search icons...", className }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar íconos basado en el término de búsqueda
  const filteredIcons = useMemo(() => {
    if (!searchTerm) return ICON_LIBRARIES;
    
    const filtered = {};
    Object.entries(ICON_LIBRARIES).forEach(([category, { prefix, icons }]) => {
      const matchingIcons = icons.filter(icon => 
        icon.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (prefix + icon).toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (matchingIcons.length > 0) {
        filtered[category] = { prefix, icons: matchingIcons };
      }
    });
    
    return filtered;
  }, [searchTerm]);

  const handleIconSelect = (icon, prefix) => {
    const iconValue = prefix ? `${prefix}${icon}` : icon;
    onChange(iconValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    onChange(inputValue);
    if (!isOpen) setIsOpen(true);
  };

  const getIconPreview = (icon, prefix) => {
    const fullIcon = prefix ? `${prefix}${icon}` : icon;
    
    // Si es una URL, mostrar un indicador de imagen
    if (fullIcon.startsWith('http')) {
      return '🖼️';
    }
    
    // Si es un emoji, mostrarlo directamente
    if (/[\u{1F300}-\u{1F9FF}]/u.test(fullIcon)) {
      return fullIcon;
    }
    
    // Para selfh.st/icons y Simple Icons, mostrar un indicador genérico
    if (fullIcon.startsWith('mdi-')) {
      return '🎨';
    }
    
    if (fullIcon.startsWith('si-')) {
      return '🏢';
    }
    
    return '📷';
  };

  const totalIcons = Object.values(filteredIcons).reduce((total, { icons }) => total + icons.length, 0);

  return (
    <div className={className}>
      <SelectorContainer>
        <IconInput
          theme={theme}
          type="text"
          value={value}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder={placeholder}
          autoComplete="off"
        />
        <SearchButton 
          theme={theme} 
          type="button" 
          onClick={handleInputClick}
        >
          <FiSearch />
        </SearchButton>
        
        {isOpen && (
          <DropdownContainer theme={theme}>
            {totalIcons === 0 ? (
              <NoResults theme={theme}>
                No se encontraron íconos para "{searchTerm}"
              </NoResults>
            ) : (
              Object.entries(filteredIcons).map(([category, { prefix, icons }]) => (
                <div key={category}>
                  <CategoryHeader theme={theme}>
                    {category} ({icons.length} íconos)
                  </CategoryHeader>
                  {icons.slice(0, 50).map((icon) => (
                    <IconOption
                      key={`${prefix}${icon}`}
                      theme={theme}
                      onClick={() => handleIconSelect(icon, prefix)}
                    >
                      <IconPreview theme={theme}>
                        {getIconPreview(icon, prefix)}
                      </IconPreview>
                      <IconLabel theme={theme}>
                        {icon}
                      </IconLabel>
                      <IconCode theme={theme}>
                        {prefix}{icon}
                      </IconCode>
                    </IconOption>
                  ))}
                  {icons.length > 50 && (
                    <IconOption theme={theme}>
                      <IconLabel theme={theme} style={{ fontStyle: 'italic' }}>
                        ... y {icons.length - 50} íconos más
                      </IconLabel>
                    </IconOption>
                  )}
                </div>
              ))
            )}
          </DropdownContainer>
        )}
      </SelectorContainer>
      
      <HelperText theme={theme}>
        Soporta íconos de selfh.st/icons (sh-), Simple Icons (si-), URLs, y emojis •{' '}
        <ExternalLink 
          href="https://selfh.st/icons/" 
          target="_blank" 
          rel="noopener noreferrer"
          theme={theme}
        >
          selfh.st/icons <FiExternalLink size={10} />
        </ExternalLink>{' '}
        •{' '}
        <ExternalLink 
          href="https://simpleicons.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          theme={theme}
        >
          Simple Icons <FiExternalLink size={10} />
        </ExternalLink>
      </HelperText>
    </div>
  );
};

export default IconSelector;
