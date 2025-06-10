import yaml from 'js-yaml';

// Función para cargar y parsear datos YAML iniciales
export const loadInitialConfig = async () => {
  // Datos de ejemplo basados en los archivos existentes
  const initialServices = [
    // Storage & Networking
    {
      id: '1',
      name: 'Proxmox VE',
      href: 'https://pve.local:8006/',
      description: 'Virtualization Management Platform',
      group: 'Storage & Networking',
      icon: 'server'
    },
    {
      id: '2',
      name: 'TrueNAS Scale',
      href: 'https://truenas.local/',
      description: 'Network Attached Storage',
      group: 'Storage & Networking',
      icon: 'database'
    },
    {
      id: '3',
      name: 'pfSense',
      href: 'https://firewall.local/',
      description: 'Firewall & Router',
      group: 'Storage & Networking',
      icon: 'shield'
    },
    {
      id: '4',
      name: 'Unifi Controller',
      href: 'https://unifi.local:8443/',
      description: 'Network Equipment Management',
      group: 'Storage & Networking',
      icon: 'wifi'
    },
    // Core Infrastructure
    {
      id: '5',
      name: 'Docker Portainer',
      href: 'https://portainer.local:9443/',
      description: 'Container Management',
      group: 'Core Infrastructure',
      icon: 'docker'
    },
    {
      id: '6',
      name: 'Kubernetes Dashboard',
      href: 'https://k8s.local/dashboard/',
      description: 'Kubernetes Cluster Management',
      group: 'Core Infrastructure',
      icon: 'kubernetes'
    },
    {
      id: '7',
      name: 'Grafana',
      href: 'https://grafana.local:3000/',
      description: 'Monitoring & Analytics',
      group: 'Core Infrastructure',
      icon: 'chart'
    },
    // Media
    {
      id: '8',
      name: 'Plex Media Server',
      href: 'https://plex.local:32400/',
      description: 'Media Streaming Platform',
      group: 'Media',
      icon: 'plex'
    },
    {
      id: '9',
      name: 'Jellyfin',
      href: 'https://jellyfin.local:8096/',
      description: 'Open Source Media System',
      group: 'Media',
      icon: 'jellyfin'
    },
    // Automatización y Productividad
    {
      id: '10',
      name: 'Home Assistant',
      href: 'https://homeassistant.local:8123/',
      description: 'Home Automation Platform',
      group: 'Automatización y Productividad',
      icon: 'home'
    },
    {
      id: '11',
      name: 'Nextcloud',
      href: 'https://nextcloud.local/',
      description: 'Cloud Storage & Collaboration',
      group: 'Automatización y Productividad',
      icon: 'cloud'
    },
    {
      id: '12',
      name: 'GitLab',
      href: 'https://gitlab.local/',
      description: 'DevOps Lifecycle Tool',
      group: 'Automatización y Productividad',
      icon: 'git'
    },
    // Seguridad y Acceso
    {
      id: '13',
      name: 'Bitwarden',
      href: 'https://bitwarden.local/',
      description: 'Password Manager',
      group: 'Seguridad y Acceso',
      icon: 'lock'
    },
    {
      id: '14',
      name: 'Authelia',
      href: 'https://auth.local/',
      description: 'Authentication & Authorization',
      group: 'Seguridad y Acceso',
      icon: 'key'
    },
    // Herramientas de IA
    {
      id: '15',
      name: 'Ollama',
      href: 'https://ollama.local:11434/',
      description: 'Local AI Model Server',
      group: 'Herramientas de IA',
      icon: 'brain'
    },
    {
      id: '16',
      name: 'Open WebUI',
      href: 'https://webui.local:3000/',
      description: 'AI Chat Interface',
      group: 'Herramientas de IA',
      icon: 'chat'
    }
  ];

  const initialBookmarks = [
    {
      id: '1',
      name: 'GitHub',
      href: 'https://github.com/',
      group: 'Development',
      icon: 'github',
      description: 'Code repository hosting',
      target: '_blank'
    },
    {
      id: '2',
      name: 'Stack Overflow',
      href: 'https://stackoverflow.com/',
      group: 'Development',
      icon: 'code',
      description: 'Developer Q&A community',
      target: '_blank'
    },
    {
      id: '3',
      name: 'Docker Hub',
      href: 'https://hub.docker.com/',
      group: 'Development',
      icon: 'docker',
      description: 'Container registry',
      target: '_blank'
    },
    {
      id: '4',
      name: 'AWS Console',
      href: 'https://console.aws.amazon.com/',
      group: 'Cloud',
      icon: 'cloud',
      description: 'Amazon Web Services',
      target: '_blank'
    },
    {
      id: '5',
      name: 'Cloudflare',
      href: 'https://dash.cloudflare.com/',
      group: 'Cloud',
      icon: 'shield',
      description: 'DNS & Security services',
      target: '_blank'
    },
    {
      id: '6',
      name: 'Reddit',
      href: 'https://reddit.com/r/selfhosted',
      group: 'Community',
      icon: 'users',
      description: 'Self-hosting community',
      target: '_blank'
    },
    {
      id: '7',
      name: 'Hacker News',
      href: 'https://news.ycombinator.com/',
      group: 'News',
      icon: 'news',
      description: 'Tech news aggregator',
      target: '_blank'
    },
    {
      id: '8',
      name: 'Proxmox Documentation',
      href: 'https://pve.proxmox.com/wiki/',
      group: 'Documentation',
      icon: 'book',
      description: 'Proxmox VE documentation',
      target: '_blank'
    }
  ];

  const initialWidgets = [
    {
      id: '1',
      type: 'search',
      key: 'search',
      name: 'Search',
      options: {
        provider: 'duckduckgo',
        target: '_blank'
      }
    },
    {
      id: '2',
      type: 'datetime',
      key: 'datetime',
      name: 'Date & Time',
      options: {
        text_size: 'xl',
        format: {
          timeStyle: 'short',
          dateStyle: 'short'
        }
      }
    },
    {
      id: '3',
      type: 'openweathermap',
      key: 'weather',
      name: 'Weather',
      options: {
        latitude: 40.4168,
        longitude: -3.7038,
        city: 'Madrid',
        units: 'metric'
      }
    },
    {
      id: '4',
      type: 'resources',
      key: 'resources',
      name: 'System Resources',
      options: {
        cpu: true,
        memory: true,
        disk: '/home'
      }
    },
    {
      id: '5',
      type: 'calendar',
      key: 'calendar',
      name: 'Calendar Events',
      options: {
        maxEvents: 5,
        showTime: true
      }
    }
  ];

  const initialSettings = {
    title: 'Enterprise Infrastructure Portal',
    favicon: 'https://example.com/favicon.ico',
    theme: 'dark',
    color: 'gray',
    headerStyle: 'boxed',
    hideVersion: true,
    hideErrors: true,
    useEqualHeights: true,
    statusStyle: 'dot',
    showStats: false,
    cardBlur: 'sm',
    background: {
      image: 'https://raw.githubusercontent.com/yourusername/yourrepo/main/images/background.jpg',
      blur: 'sm',
      saturate: 100,
      brightness: 60,
      opacity: 65
    },
    quicklaunch: {
      searchDescriptions: true,
      hideInternetSearch: true,
      showSearchSuggestions: true,
      hideVisitURL: true,
      provider: 'custom',
      url: 'https://search.example.com/?q=',
      suggestionUrl: 'https://suggestions.example.com/?q='
    },
    providers: {
      openweathermap: 'your_openweather_api_key_here',
      glances: 'http://localhost:61208',
      longhorn: {
        url: 'http://longhorn.local',
        username: 'admin',
        password: 'your_longhorn_password'
      }
    },
    layout: {
      'Storage & Networking': {
        header: true,
        style: 'row',
        columns: 4
      },
      'Core Infrastructure': {
        header: true,
        style: 'row',
        columns: 3
      },
      'Media': {
        header: true,
        style: 'row',
        columns: 2
      },
      'Automatización y Productividad': {
        header: true,
        style: 'row',
        columns: 3
      },
      'Seguridad y Acceso': {
        header: true,
        style: 'row',
        columns: 2
      },
      'Herramientas de IA': {
        header: true,
        style: 'row',
        columns: 2
      },
      'Calendar': {
        header: true,
        style: 'row',
        columns: 3
      }
    }
  };

  return {
    services: initialServices,
    widgets: initialWidgets,
    bookmarks: initialBookmarks,
    settings: initialSettings
  };
};

// Función para convertir la configuración visual a formato YAML de homepage
export const convertToHomepageFormat = (config) => {
  const result = {};

  // Convertir servicios agrupados
  if (config.services && config.services.length > 0) {
    const groupedServices = config.services.reduce((acc, service) => {
      const group = service.group || 'Default';
      if (!acc[group]) {
        acc[group] = [];
      }
      
      const serviceConfig = {
        [service.name]: {
          href: service.href,
          ...(service.icon && { icon: service.icon }),
          ...(service.description && { description: service.description }),
          ...(service.server && { server: service.server }),
          ...(service.container && { container: service.container }),
          ...(service.widget && { widget: service.widget }),
          ...(service.ping && { ping: service.ping }),
          ...(service.target && service.target !== '_self' && { target: service.target })
        }
      };
      
      acc[group].push(serviceConfig);
      return acc;
    }, {});
    
    result.services = groupedServices;
  }

  // Convertir widgets
  if (config.widgets && config.widgets.length > 0) {
    result.widgets = config.widgets.map(widget => {
      const widgetConfig = {
        type: widget.type,
        ...(widget.key && { key: widget.key }),
        ...(widget.options && Object.keys(widget.options).length > 0 && { options: widget.options })
      };
      return widgetConfig;
    });
  }

  // Convertir bookmarks agrupados
  if (config.bookmarks && config.bookmarks.length > 0) {
    const groupedBookmarks = config.bookmarks.reduce((acc, bookmark) => {
      const group = bookmark.group || 'Default';
      if (!acc[group]) {
        acc[group] = [];
      }
      
      const bookmarkConfig = {
        [bookmark.name]: {
          href: bookmark.href,
          ...(bookmark.icon && { icon: bookmark.icon }),
          ...(bookmark.description && { description: bookmark.description }),
          ...(bookmark.target && bookmark.target !== '_self' && { target: bookmark.target })
        }
      };
      
      acc[group].push(bookmarkConfig);
      return acc;
    }, {});
    
    result.bookmarks = groupedBookmarks;
  }

  // Configuración general
  if (config.settings) {
    result.settings = config.settings;
  }

  return result;
};

// Función para generar archivos YAML listos para descargar
export const generateYamlFiles = (config) => {
  const homepageConfig = convertToHomepageFormat(config);
  
  return {
    'services.yaml': yaml.dump([homepageConfig.services] || [], { indent: 2 }),
    'widgets.yaml': yaml.dump(homepageConfig.widgets || [], { indent: 2 }),
    'bookmarks.yaml': yaml.dump([homepageConfig.bookmarks] || [], { indent: 2 }),
    'settings.yaml': yaml.dump(homepageConfig.settings || {}, { indent: 2 })
  };
};

// Función para parsear archivo YAML importado
export const parseYamlFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const yamlContent = e.target.result;
        const parsedData = yaml.load(yamlContent);
        resolve(parsedData);
      } catch (error) {
        reject(new Error(`Error parsing YAML: ${error.message}`));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
};

// Función para importar y convertir configuración de homepage a formato interno
export const importHomepageConfig = async (files) => {
  console.log('🔍 Iniciando importación de archivos:', files);
  
  const config = {
    services: [],
    widgets: [],
    bookmarks: [],
    settings: {
      title: 'Homepage',
      favicon: '',
      theme: 'dark',
      color: 'slate',
      headerStyle: 'clean',
      layout: {}
    }
  };

  for (const file of files) {
    try {
      console.log(`📄 Procesando archivo: ${file.name}`);
      const parsedData = await parseYamlFile(file);
      console.log(`📊 Datos parseados de ${file.name}:`, parsedData);
      
      const fileName = file.name.toLowerCase();

      if (fileName.includes('services') || fileName.includes('example')) {
        console.log('🔧 Procesando como archivo de servicios');
        const convertedServices = convertServicesToInternal(parsedData);
        console.log('✅ Servicios convertidos:', convertedServices);
        config.services = convertedServices;
      } else if (fileName.includes('widgets')) {
        console.log('📊 Procesando como archivo de widgets');
        const convertedWidgets = convertWidgetsToInternal(parsedData);
        console.log('✅ Widgets convertidos:', convertedWidgets);
        config.widgets = convertedWidgets;
      } else if (fileName.includes('bookmarks')) {
        console.log('🔖 Procesando como archivo de bookmarks');
        const convertedBookmarks = convertBookmarksToInternal(parsedData);
        console.log('✅ Bookmarks convertidos:', convertedBookmarks);
        config.bookmarks = convertedBookmarks;
      } else if (fileName.includes('settings')) {
        console.log('⚙️ Procesando como archivo de settings');
        config.settings = { ...config.settings, ...parsedData };
      } else {
        // Auto-detectar el tipo de archivo basado en la estructura de datos
        console.log('🔍 Auto-detectando tipo de archivo basado en estructura');
        if (Array.isArray(parsedData)) {
          // Si es un array, podría ser services o bookmarks
          const firstItem = parsedData[0];
          if (firstItem && typeof firstItem === 'object') {
            const keys = Object.keys(firstItem);
            const hasServiceStructure = keys.some(key => {
              const item = firstItem[key];
              return Array.isArray(item) && item[0] && typeof item[0] === 'object' && 
                     Object.keys(item[0])[0] && firstItem[key][0][Object.keys(item[0])[0]].href;
            });
            
            if (hasServiceStructure) {
              console.log('🔧 Auto-detectado como archivo de servicios por estructura');
              const convertedServices = convertServicesToInternal(parsedData);
              console.log('✅ Servicios convertidos:', convertedServices);
              config.services = convertedServices;
            } else {
              console.log('🔖 Auto-detectado como archivo de bookmarks por estructura');
              const convertedBookmarks = convertBookmarksToInternal(parsedData);
              console.log('✅ Bookmarks convertidos:', convertedBookmarks);
              config.bookmarks = convertedBookmarks;
            }
          }
        } else if (typeof parsedData === 'object') {
          console.log('⚙️ Auto-detectado como archivo de settings por estructura');
          config.settings = { ...config.settings, ...parsedData };
        }
      }
    } catch (error) {
      console.error(`❌ Error importing ${file.name}:`, error);
      throw error;
    }
  }

  console.log('🎯 Configuración final importada:', config);
  return config;
};

// Convertir servicios de formato homepage a formato interno
const convertServicesToInternal = (servicesData) => {
  console.log('🔧 Convertiendo servicios, datos recibidos:', servicesData);
  const services = [];
  
  if (Array.isArray(servicesData)) {
    servicesData.forEach((categoryObj, categoryIndex) => {
      console.log(`📂 Procesando categoría ${categoryIndex}:`, categoryObj);
      
      Object.entries(categoryObj).forEach(([categoryName, serviceList]) => {
        console.log(`📁 Categoría: ${categoryName}, servicios:`, serviceList);
        
        if (Array.isArray(serviceList)) {
          serviceList.forEach((serviceObj, serviceIndex) => {
            console.log(`🔧 Procesando servicio ${serviceIndex}:`, serviceObj);
            
            Object.entries(serviceObj).forEach(([serviceName, serviceConfig]) => {
              console.log(`⚙️ Configurando servicio: ${serviceName}`, serviceConfig);
              
              // Manejar tanto objetos como strings simples
              const config = typeof serviceConfig === 'string' 
                ? { href: serviceConfig } 
                : serviceConfig;
                
              const serviceItem = {
                id: `imported_service_${categoryIndex}_${serviceIndex}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                name: serviceName,
                href: config.href || '',
                description: config.description || '',
                group: categoryName,
                icon: config.icon || 'mdi-web',
                target: config.target || '_blank', // Añadir soporte para target
                // Incluir widget si existe
                ...(config.widget && { widget: config.widget }),
                // Incluir otras propiedades si existen
                ...(config.siteMonitor && { siteMonitor: config.siteMonitor })
              };
              
              console.log(`✅ Servicio procesado:`, serviceItem);
              services.push(serviceItem);
            });
          });
        }
      });
    });
  }
  
  console.log(`🎯 Total de servicios convertidos: ${services.length}`, services);
  return services;
};

// Convertir widgets de formato homepage a formato interno
const convertWidgetsToInternal = (widgetsData) => {
  const widgets = [];
  
  if (Array.isArray(widgetsData)) {
    widgetsData.forEach((widget, index) => {
      Object.entries(widget).forEach(([type, config]) => {
        widgets.push({
          id: `imported_widget_${index}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: type,
          name: `${type.charAt(0).toUpperCase() + type.slice(1)} Widget`,
          ...config
        });
      });
    });
  }
  
  return widgets;
};

// Convertir bookmarks de formato homepage a formato interno  
const convertBookmarksToInternal = (bookmarksData) => {
  const bookmarks = [];
  
  if (Array.isArray(bookmarksData)) {
    bookmarksData.forEach((categoryObj, categoryIndex) => {
      Object.entries(categoryObj).forEach(([categoryName, bookmarkList]) => {
        if (Array.isArray(bookmarkList)) {
          bookmarkList.forEach((bookmarkObj, bookmarkIndex) => {
            Object.entries(bookmarkObj).forEach(([bookmarkName, bookmarkList2]) => {
              if (Array.isArray(bookmarkList2)) {
                bookmarkList2.forEach((bookmark, bmIndex) => {
                  bookmarks.push({
                    id: `imported_bookmark_${categoryIndex}_${bookmarkIndex}_${bmIndex}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    name: bookmarkName || 'Bookmark',
                    href: bookmark.href || '',
                    group: categoryName,
                    icon: bookmark.icon || 'mdi-bookmark',
                    description: bookmark.description || '',
                    target: bookmark.target || '_self'
                  });
                });
              } else {
                // Manejar formato directo sin array anidado
                bookmarks.push({
                  id: `imported_bookmark_${categoryIndex}_${bookmarkIndex}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                  name: bookmarkName,
                  href: bookmarkList2.href || bookmarkList2,
                  group: categoryName,
                  icon: bookmarkList2.icon || 'mdi-bookmark',
                  description: bookmarkList2.description || '',
                  target: bookmarkList2.target || '_self'
                });
              }
            });
          });
        }
      });
    });
  }
  
  return bookmarks;
};

// No usar export default, solo named exports
