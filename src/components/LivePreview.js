import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

// Función auxiliar para convertir valores de blur a CSS
const getBlurValue = (blur) => {
  const blurMap = {
    'xs': '4px',
    'sm': '8px',
    'md': '12px',
    'lg': '16px',
    'xl': '24px',
    '2xl': '40px',
    '3xl': '64px',
    'none': '0px'
  };
  return blurMap[blur] || '0px';
};

const LivePreviewContainer = styled.div`
  background: ${props => props.theme?.colors.surface};
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  color: ${props => props.theme?.colors.text};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-shadow: 0 2px 4px ${props => props.theme?.colors.shadow};
  transition: all 0.3s ease;
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${props => props.theme?.colors.border};
`;

const PreviewHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleButton = styled.button`
  background: ${props => props.theme?.colors.primary};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${props => props.theme?.colors.primaryHover};
  }
`;

const PreviewTitle = styled.h3`
  margin: 0;
  color: ${props => props.theme?.colors.text};
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PreviewIcon = styled.span`
  font-size: 20px;
`;

const DashboardContainer = styled.div`
  background: ${props => props.backgroundImage 
    ? `linear-gradient(rgba(0,0,0,${1 - (props.opacity || 65) / 100}), rgba(0,0,0,${1 - (props.opacity || 65) / 100})), url('${props.backgroundImage}')`
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  background-size: cover;
  background-position: center;
  filter: brightness(${props => props.brightness || 60}%) saturate(${props => props.saturate || 100}%);
  ${props => props.cardBlur && props.cardBlur !== 'none' ? `backdrop-filter: blur(${getBlurValue(props.cardBlur)});` : ''}
  border-radius: 12px;
  padding: 30px;
  min-height: 500px;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 20px;
    min-height: 400px;
  }
`;

const DashboardHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const DashboardTitle = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 300;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const DashboardSubtitle = styled.p`
  color: rgba(255,255,255,0.8);
  font-size: 1.1rem;
  margin: 0;
`;

const SearchWidget = styled.div`
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid rgba(255,255,255,0.2);
`;

const SearchInput = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  color: #333;
  font-size: 16px;
  
  &::before {
    content: "🔍";
    margin-right: 10px;
  }
  
  &::after {
    content: "Buscar en internet...";
    color: #999;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const ServiceGroup = styled.div`
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255,255,255,0.2);
  ${props => props.cardBlur && props.cardBlur !== 'none' ? `backdrop-filter: blur(${getBlurValue(props.cardBlur)});` : ''}
`;

const ServiceGroupTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin: 0 0 15px 0;
  font-weight: 500;
`;

const ServiceItem = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 12px 15px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(255,255,255,0.2);
    transform: translateX(5px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ServiceIcon = styled.span`
  font-size: 20px;
  margin-right: 12px;
  width: 24px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceName = styled.div`
  color: white;
  font-weight: 500;
  font-size: 14px;
`;

const ServiceDescription = styled.div`
  color: rgba(255,255,255,0.7);
  font-size: 12px;
  margin-top: 2px;
`;

const ServiceStatus = styled.div`
  width: ${props => props.statusStyle === 'dot' ? '8px' : '12px'};
  height: ${props => props.statusStyle === 'dot' ? '8px' : '12px'};
  border-radius: ${props => props.statusStyle === 'dot' ? '50%' : '2px'};
  background: ${props => props.status === 'online' ? '#4ade80' : props.status === 'offline' ? '#ef4444' : '#fbbf24'};
  margin-left: 8px;
  flex-shrink: 0;
  ${props => props.statusStyle !== 'dot' && `
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: white;
    font-weight: bold;
  `}
`;

const WidgetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
  }
`;

const Widget = styled.div`
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 15px;
  border: 1px solid rgba(255,255,255,0.2);
  text-align: center;
`;

const WidgetTitle = styled.div`
  color: white;
  font-weight: 500;
  margin-bottom: 10px;
  font-size: 14px;
`;

const WidgetContent = styled.div`
  color: rgba(255,255,255,0.8);
  font-size: 12px;
`;

const BookmarksSection = styled.div`
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255,255,255,0.2);
`;

const BookmarksTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin: 0 0 15px 0;
  font-weight: 500;
`;

const BookmarksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 8px;
  }
`;

const BookmarkItem = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 10px 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(255,255,255,0.2);
    transform: scale(1.05);
  }
`;

const BookmarkIcon = styled.span`
  font-size: 16px;
  margin-right: 8px;
`;

const BookmarkName = styled.div`
  color: white;
  font-size: 13px;
  font-weight: 500;
`;

// Función mejorada para renderizar iconos de diferentes tipos
const renderIcon = (icon, iconStyle = 'gradient') => {
  if (!icon || typeof icon !== 'string') return '🌐';
  
  // Si es un emoji, devolverlo directamente
  if (/\p{Emoji}/u.test(icon)) {
    return icon;
  }
  
  // Si es una URL (http/https), crear un elemento img
  if (icon.startsWith('http://') || icon.startsWith('https://')) {
    return `<img src="${icon}" alt="icon" style="width: 1em; height: 1em; vertical-align: middle;" />`;
  }
  
  // Si es un icono de Material Design (mdi-)
  if (icon.startsWith('mdi-')) {
    const iconName = icon.replace('mdi-', '');
    // Para el preview, usaremos emojis como fallback para los iconos mdi
    return getEmojiFromMdiIcon(iconName);
  }
  
  // Si es un icono de Simple Icons (si-)
  if (icon.startsWith('si-')) {
    const iconName = icon.replace('si-', '');
    // Para el preview, usaremos emojis como fallback para los iconos si
    return getEmojiFromSimpleIcon(iconName);
  }
  
  // Para otros casos, usar la función original
  return getEmojiIcon(icon);
};

// Función para convertir iconos MDI a emojis para preview
const getEmojiFromMdiIcon = (iconName) => {
  const mdiToEmoji = {
    'account': '👤',
    'home': '🏠',
    'server': '🖥️',
    'database': '🗄️',
    'cloud': '☁️',
    'monitor': '📊',
    'chart-line': '📈',
    'calendar': '📅',
    'clock': '🕐',
    'email': '✉️',
    'phone': '📞',
    'camera': '📷',
    'video': '🎥',
    'music': '🎵',
    'gamepad-variant': '🎮',
    'book': '📖',
    'file': '📄',
    'folder': '📁',
    'download': '⬇️',
    'upload': '⬆️',
    'magnify': '🔍',
    'bell': '🔔',
    'heart': '❤️',
    'star': '⭐',
    'bookmark': '🔖',
    'lock': '🔒',
    'key': '🔑',
    'shield': '🛡️',
    'fire': '🔥',
    'lightning-bolt': '⚡',
    'earth': '🌍',
    'wifi': '📶',
    'television': '📺',
    'desktop-mac': '🖥️',
    'cellphone': '📱',
    'code-tags': '💻',
    'console': '💻',
    'git': '🌿',
    'github': '🐙',
    'docker': '🐳',
    'kubernetes': '☸️',
    'wrench': '🔧',
    'web': '🌐',
    'elephant': '🐘',
    'leaf': '🍃',
    'circle': '🔴',
    'movie': '🎬',
    'youtube': '📺',
    'spotify': '🎵',
    'discord': '💬',
    'bug': '🐛',
    'alert': '⚠️',
    'close': '❌',
    'check': '✅',
    'information': 'ℹ️',
    'weather-cloudy': '🌤️',
    'newspaper': '📰',
    'rss': '📡',
    'cart': '🛒',
    'currency-btc': '₿',
    'clipboard-check': '✅',
    'note-text': '📝'
  };
  
  return mdiToEmoji[iconName] || mdiToEmoji[iconName.replace(/-/g, '')] || '🔧';
};

// Función para convertir iconos Simple Icons a emojis para preview
const getEmojiFromSimpleIcon = (iconName) => {
  const siToEmoji = {
    'google': '🌐',
    'github': '🐙',
    'gitlab': '🦊',
    'docker': '🐳',
    'kubernetes': '☸️',
    'jenkins': '🔧',
    'nginx': '🌐',
    'apache': '🌐',
    'mysql': '🗄️',
    'postgresql': '🐘',
    'mongodb': '🍃',
    'redis': '🔴',
    'elasticsearch': '🔍',
    'grafana': '📊',
    'prometheus': '🔥',
    'plex': '🎬',
    'jellyfin': '🎬',
    'netflix': '🎬',
    'youtube': '📺',
    'spotify': '🎵',
    'discord': '💬',
    'slack': '💬',
    'microsoftteams': '👥',
    'zoom': '📹',
    'twitch': '🎮',
    'steam': '🎮',
    'facebook': '📘',
    'twitter': '🐦',
    'instagram': '📷',
    'linkedin': '💼',
    'whatsapp': '💬',
    'telegram': '💬',
    'visualstudiocode': '💻',
    'vim': '💻',
    'atom': '💻',
    'sublimetext': '💻',
    'intellijidea': '💻',
    'eclipse': '💻',
    'proxmox': '🖥️',
    'truenas': '🗄️',
    'pfsense': '🛡️',
    'ubiquiti': '📶',
    'portainer': '🐳',
    'homeassistant': '🏠',
    'nextcloud': '☁️',
    'bitwarden': '🔐',
    'bitcoin': '₿',
    'ethereum': '💎',
    'react': '⚛️',
    'vue': '💚',
    'angular': '🅰️',
    'node': '💚',
    'python': '🐍',
    'javascript': '💛',
    'typescript': '💙',
    'php': '🐘',
    'java': '☕',
    'dotnet': '🔵',
    'go': '🐹',
    'rust': '🦀',
    'cplusplus': '⚙️',
    'amazonwebservices': '☁️',
    'googlecloud': '☁️',
    'microsoftazure': '☁️',
    'heroku': '💜',
    'vercel': '⚫',
    'netlify': '🌊'
  };
  
  return siToEmoji[iconName] || siToEmoji[iconName.replace(/-/g, '')] || '🌐';
};

// Función para convertir iconos FontAwesome a emojis (función original mantenida para compatibilidad)
const getEmojiIcon = (icon) => {
  if (!icon || typeof icon !== 'string') return '🌐';
  
  const iconMap = {
    // Servicios comunes
    'server': '🖥️',
    'database': '🗄️',
    'cloud': '☁️',
    'home': '🏠',
    'user': '👤',
    'users': '👥',
    'cog': '⚙️',
    'settings': '⚙️',
    'gear': '⚙️',
    'chart': '📊',
    'analytics': '📊',
    'calendar': '📅',
    'clock': '🕐',
    'time': '🕐',
    'mail': '✉️',
    'email': '✉️',
    'phone': '📞',
    'camera': '📷',
    'video': '🎥',
    'music': '🎵',
    'sound': '🎵',
    'game': '🎮',
    'gaming': '🎮',
    'book': '📖',
    'file': '📄',
    'folder': '📁',
    'download': '⬇️',
    'upload': '⬆️',
    'search': '🔍',
    'bell': '🔔',
    'notification': '🔔',
    'heart': '❤️',
    'star': '⭐',
    'bookmark': '🔖',
    'tag': '🏷️',
    'lock': '🔒',
    'security': '🔒',
    'key': '🔑',
    'shield': '🛡️',
    'fire': '🔥',
    'bolt': '⚡',
    'lightning': '⚡',
    'globe': '🌍',
    'world': '🌍',
    'wifi': '📶',
    'network': '📶',
    'tv': '📺',
    'desktop': '🖥️',
    'mobile': '📱',
    'tablet': '📱',
    'code': '💻',
    'terminal': '💻',
    'console': '💻',
    
    // Tecnologías específicas
    'git': '🌿',
    'github': '🐙',
    'docker': '🐳',
    'kubernetes': '☸️',
    'jenkins': '🔧',
    'nginx': '🌐',
    'apache': '🌐',
    'mysql': '🗄️',
    'postgresql': '🐘',
    'mongodb': '🍃',
    'redis': '🔴',
    'elasticsearch': '🔍',
    'grafana': '📊',
    'prometheus': '🔥',
    'plex': '🎬',
    'jellyfin': '🎬',
    'netflix': '🎬',
    'youtube': '📺',
    'spotify': '🎵',
    'discord': '💬',
    'slack': '💬',
    'teams': '👥',
    'zoom': '📹',
    'twitch': '🎮',
    'steam': '🎮',
    
    // Sistemas y monitoreo
    'monitor': '📊',
    'dashboard': '📊',
    'status': '📊',
    'health': '❤️',
    'log': '📋',
    'bug': '🐛',
    'warning': '⚠️',
    'error': '❌',
    'success': '✅',
    'info': 'ℹ️',
    
    // Redes sociales y comunicación
    'facebook': '📘',
    'twitter': '🐦',
    'instagram': '📷',
    'linkedin': '💼',
    'whatsapp': '💬',
    'telegram': '💬',
    
    // Herramientas desarrollo
    'vscode': '💻',
    'vim': '💻',
    'atom': '💻',
    'sublime': '💻',
    'phpstorm': '💻',
    'intellij': '💻',
    'eclipse': '💻',
    
    // Infrastructure & DevOps
    'proxmox': '🖥️',
    'truenas': '🗄️',
    'pfsense': '🛡️',
    'unifi': '📶',
    'portainer': '🐳',
    'grafana': '📊',
    'prometheus': '🔥',
    'homeassistant': '🏠',
    'nextcloud': '☁️',
    'bitwarden': '🔐',
    'authelia': '🔑',
    'ollama': '🧠',
    'webui': '💬',
    'brain': '🧠',
    'chat': '💬',
    
    // Otros
    'weather': '🌤️',
    'news': '📰',
    'rss': '📡',
    'feed': '📡',
    'shopping': '🛒',
    'cart': '🛒',
    'money': '💰',
    'bitcoin': '₿',
    'crypto': '₿',
    'todo': '✅',
    'tasks': '✅',
    'note': '📝',
    'notes': '📝'
  };
  
  // Convertir a minúsculas para búsqueda
  const iconLower = icon.toLowerCase();
  
  // Buscar coincidencias exactas primero
  if (iconMap[iconLower]) {
    return iconMap[iconLower];
  }
  
  // Buscar coincidencias parciales
  for (const [key, emoji] of Object.entries(iconMap)) {
    if (iconLower.includes(key) || key.includes(iconLower)) {
      return emoji;
    }
  }
  
  // Si ya es un emoji, devolverlo
  if (/\p{Emoji}/u.test(icon)) {
    return icon;
  }
  
  return '🌐';
};

const LivePreview = ({ config }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar la hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Verificar que config existe y tiene las propiedades necesarias
  if (!config) {
    return (
      <LivePreviewContainer theme={theme}>
        <PreviewHeader theme={theme}>
          <PreviewHeaderLeft>
            <PreviewIcon>👁️</PreviewIcon>
            <PreviewTitle theme={theme}>Vista Previa en Vivo - Homepage Dashboard</PreviewTitle>
          </PreviewHeaderLeft>
          <ToggleButton onClick={() => setIsVisible(!isVisible)} theme={theme}>
            {isVisible ? <FiEyeOff /> : <FiEye />}
            {isVisible ? 'Ocultar' : 'Mostrar'}
          </ToggleButton>
        </PreviewHeader>
        {isVisible && (
          <DashboardContainer>
            <div style={{ 
              textAlign: 'center', 
              color: 'rgba(255,255,255,0.6)', 
              padding: '60px 20px',
              fontSize: '18px'
            }}>
              ⚙️ Configurando dashboard...
            </div>
          </DashboardContainer>
        )}
      </LivePreviewContainer>
    );
  }

  const services = config.services || [];
  const widgets = config.widgets || [];
  const bookmarks = config.bookmarks || [];
  const settings = config.settings || {};

  const groupedServices = services.reduce((groups, service) => {
    const group = service.group || 'Servicios';
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(service);
    return groups;
  }, {});

  // Obtener widgets de búsqueda
  const hasSearchWidget = widgets.some(widget => 
    widget.type === 'search' || widget.name?.toLowerCase().includes('search') || widget.name?.toLowerCase().includes('búsqueda')
  );

  // Función para determinar el estado del servicio basado en el nombre/tipo
  const getServiceStatus = (service, index) => {
    const serviceName = (service.name || '').toLowerCase();
    const serviceDescription = (service.description || '').toLowerCase();
    
    // Estados predeterminados basados en tipos de servicio comunes
    if (serviceName.includes('database') || serviceName.includes('mysql') || serviceName.includes('postgres') || serviceName.includes('mongo')) {
      return 'online';
    }
    if (serviceName.includes('backup') || serviceName.includes('maintenance')) {
      return 'warning';
    }
    if (serviceName.includes('test') || serviceName.includes('staging') || serviceName.includes('dev')) {
      return 'warning';
    }
    if (serviceDescription.includes('offline') || serviceDescription.includes('down')) {
      return 'offline';
    }
    
    // Distribución realista: 70% online, 20% warning, 10% offline
    const statuses = ['online', 'online', 'online', 'online', 'online', 'online', 'online', 'warning', 'warning', 'offline'];
    return statuses[index % statuses.length];
  };

  return (
    <LivePreviewContainer theme={theme}>
      <PreviewHeader theme={theme}>
        <PreviewHeaderLeft>
          <PreviewIcon>👁️</PreviewIcon>
          <PreviewTitle theme={theme}>
            Vista Previa en Vivo - Homepage Dashboard
            <span style={{ 
              fontSize: '10px', 
              background: '#4ade80', 
              color: 'white', 
              padding: '2px 6px', 
              borderRadius: '12px',
              animation: 'pulse 2s infinite'
            }}>
              LIVE
            </span>
          </PreviewTitle>
        </PreviewHeaderLeft>
        <ToggleButton onClick={() => setIsVisible(!isVisible)} theme={theme}>
          {isVisible ? <FiEyeOff /> : <FiEye />}
          {isVisible ? 'Ocultar' : 'Mostrar'}
        </ToggleButton>
      </PreviewHeader>

      {isVisible && (
        <DashboardContainer
          backgroundImage={settings.background?.image}
          brightness={settings.background?.brightness}
          saturate={settings.background?.saturate}
          opacity={settings.background?.opacity}
          cardBlur={settings.cardBlur}
        >
          <DashboardHeader>
            <DashboardTitle>{settings.title || 'Enterprise Infrastructure Portal'}</DashboardTitle>
            <DashboardSubtitle>
              {settings.subtitle || 'Panel de control empresarial'}
            </DashboardSubtitle>
          </DashboardHeader>

          {(hasSearchWidget || widgets.length === 0 || !settings.quicklaunch?.hideInternetSearch) && (
            <SearchWidget>
              <SearchInput />
            </SearchWidget>
          )}

          {Object.keys(groupedServices).length > 0 && (
            <ServicesGrid>
              {Object.entries(groupedServices).map(([groupName, groupServices]) => (
                <ServiceGroup key={groupName} cardBlur={settings.cardBlur}>
                  <ServiceGroupTitle>{groupName}</ServiceGroupTitle>
                  {groupServices.map((service, index) => (
                    <ServiceItem key={service.id || index}>
                      <ServiceIcon>
                        <span dangerouslySetInnerHTML={{ __html: renderIcon(service.icon, config.iconStyle) }} />
                      </ServiceIcon>
                      <ServiceInfo>
                        <ServiceName>
                          {service.name || 'Servicio'}
                          {service.target === '_blank' && (
                            <span style={{ marginLeft: '4px', fontSize: '10px', opacity: 0.7 }}>🔗</span>
                          )}
                        </ServiceName>
                        {service.description && (
                          <ServiceDescription>{service.description}</ServiceDescription>
                        )}
                      </ServiceInfo>
                      <ServiceStatus 
                        status={getServiceStatus(service, index)} 
                        statusStyle={settings.statusStyle}
                      >
                        {settings.statusStyle !== 'dot' && (
                          service.status === 'online' ? '✓' : service.status === 'offline' ? '✗' : '!'
                        )}
                      </ServiceStatus>
                    </ServiceItem>
                  ))}
                </ServiceGroup>
              ))}
            </ServicesGrid>
          )}

          {widgets.filter(w => w.type !== 'search' && !w.name?.toLowerCase().includes('search')).length > 0 && (
            <WidgetsContainer>
              {widgets
                .filter(w => w.type !== 'search' && !w.name?.toLowerCase().includes('search'))
                .map((widget, index) => (
                  <Widget key={widget.id || index}>
                    <WidgetTitle>{widget.name || widget.type || 'Widget'}</WidgetTitle>
                    <WidgetContent>
                      {widget.type === 'datetime' && (
                        <div style={{ whiteSpace: 'pre-line' }}>
                          📅 {currentTime.toLocaleTimeString('es-ES', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            second: '2-digit'
                          })}
                          <br />
                          📆 {currentTime.toLocaleDateString('es-ES', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      )}
                      {widget.type === 'weather' && (
                        <div style={{ whiteSpace: 'pre-line' }}>
                          🌤️ 22°C
                          <br />
                          🌍 Madrid, España
                          <br />
                          💨 Viento: 12 km/h
                        </div>
                      )}
                      {widget.type === 'resources' && (
                        <div style={{ whiteSpace: 'pre-line' }}>
                          💾 RAM: 8.2GB / 16GB
                          <br />
                          ⚡ CPU: 45%
                          <br />
                          💿 Disco: 256GB / 512GB
                        </div>
                      )}
                      {widget.type === 'calendar' && (
                        <div style={{ whiteSpace: 'pre-line' }}>
                          📅 Próximos eventos
                          <br />
                          • Reunión equipo (14:00)
                          <br />
                          • Demo proyecto (16:30)
                        </div>
                      )}
                      {widget.type === 'custom' && '⚙️ Widget personalizado'}
                      {!['datetime', 'weather', 'resources', 'custom', 'calendar'].includes(widget.type) && 
                       `📊 ${widget.type || 'Información'}`}
                    </WidgetContent>
                  </Widget>
                ))}
            </WidgetsContainer>
          )}

          {bookmarks.length > 0 && (
            <BookmarksSection>
              <BookmarksTitle>Marcadores</BookmarksTitle>
              <BookmarksGrid>
                {bookmarks.map((bookmark, index) => (
                  <BookmarkItem key={bookmark.id || index}>
                    <BookmarkIcon>
                      <span dangerouslySetInnerHTML={{ __html: renderIcon(bookmark.icon, config.iconStyle) }} />
                    </BookmarkIcon>
                    <BookmarkName>
                      {bookmark.name || 'Marcador'}
                      {bookmark.target === '_blank' && (
                        <span style={{ marginLeft: '4px', fontSize: '10px', opacity: 0.7 }}>🔗</span>
                      )}
                    </BookmarkName>
                  </BookmarkItem>
                ))}
              </BookmarksGrid>
            </BookmarksSection>
          )}

          {services.length === 0 && widgets.length === 0 && bookmarks.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              color: 'rgba(255,255,255,0.6)', 
              padding: '60px 20px',
              fontSize: '18px'
            }}>
              🎯 Añade servicios, widgets o marcadores para ver tu dashboard aquí
              <br />
              <span style={{ fontSize: '14px', marginTop: '10px', display: 'block' }}>
                Usa el botón "Cargar Demo" para ver un ejemplo completo
              </span>
            </div>
          )}
        </DashboardContainer>
      )}
    </LivePreviewContainer>
  );
};

export default LivePreview;
