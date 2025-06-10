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
  background: ${props => props.theme?.colors?.surface || '#ffffff'};
  color: ${props => props.theme?.colors?.text || '#333333'};
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme?.colors?.primary || '#007acc'};
    box-shadow: 0 0 0 2px rgba(79, 168, 218, 0.2);
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
  border-bottom: 1px solid ${props => props.theme?.colors?.borderLight || '#e9ecef'};

  &:hover {
    background: ${props => props.theme?.colors?.surfaceHover || '#f8f9fa'};
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
  background: ${props => props.theme?.colors?.background || '#f8f9fa'};
  border-radius: 3px;
  border: 1px solid ${props => props.theme?.colors?.border || '#dee2e6'};
`;

const IconName = styled.span`
  flex: 1;
  font-size: 14px;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const HelperText = styled.div`
  font-size: 12px;
  color: ${props => props.theme?.colors?.textSecondary || '#6c757d'};
  margin-top: 4px;
  line-height: 1.4;
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

// Biblioteca de iconos actualizada con selfh.st/icons
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
      'rsnapshot', 'timeshift', 'vorta', 'kopia', 'restic'
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
      'netlify', 'cloudflare', 'firebase', 'supabase'
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
        `${prefix}${icon}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (matchingIcons.length > 0) {
        filtered[category] = { prefix, icons: matchingIcons };
      }
    });
    
    return filtered;
  }, [searchTerm]);

  const handleIconSelect = (category, icon) => {
    const library = ICON_LIBRARIES[category];
    const fullIconName = `${library.prefix}${icon}`;
    onChange(fullIconName);
    setIsOpen(false);
    setSearchTerm('');
  };

  const clearSelection = () => {
    onChange('');
    setSearchTerm('');
  };

  return (
    <SelectorContainer className={className}>
      <IconInput
        type="text"
        value={value || searchTerm}
        onChange={(e) => {
          if (!value) {
            setSearchTerm(e.target.value);
          } else {
            onChange(e.target.value);
          }
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder={placeholder}
        theme={theme}
      />
      
      <SearchButton
        type="button"
        onClick={value ? clearSelection : () => setIsOpen(!isOpen)}
        theme={theme}
      >
        {value ? <FiX size={16} /> : <FiSearch size={16} />}
      </SearchButton>

      {isOpen && (
        <DropdownContainer theme={theme}>
          {Object.entries(filteredIcons).map(([category, { prefix, icons }]) => (
            <div key={category}>
              <CategoryHeader theme={theme}>
                {category} ({prefix})
              </CategoryHeader>
              {icons.slice(0, 10).map((icon) => (
                <IconOption
                  key={icon}
                  onClick={() => handleIconSelect(category, icon)}
                  theme={theme}
                >
                  <IconPreview theme={theme}>
                    {/* Para selfh.st/icons y Simple Icons, mostrar un indicador genérico */}
                    🎯
                  </IconPreview>
                  <IconName theme={theme}>
                    {prefix}{icon}
                  </IconName>
                </IconOption>
              ))}
              {icons.length > 10 && (
                <IconOption theme={theme}>
                  <IconName theme={theme}>
                    ... y {icons.length - 10} más
                  </IconName>
                </IconOption>
              )}
            </div>
          ))}
          
          {Object.keys(filteredIcons).length === 0 && (
            <IconOption theme={theme}>
              <IconName theme={theme}>
                No se encontraron iconos. Prueba con: sh-plex, sh-docker, si-github
              </IconName>
            </IconOption>
          )}
        </DropdownContainer>
      )}
      
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
    </SelectorContainer>
  );
};

export default IconSelector;