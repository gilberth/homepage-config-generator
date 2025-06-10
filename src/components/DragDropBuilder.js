import React, { useState, useCallback, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import styled from 'styled-components';
import ServiceGroup from './ServiceGroup';
import WidgetSection from './WidgetSection';
import BookmarkSection from './BookmarkSection';
import SettingsForm from './SettingsForm';
import ConfigPreview from './ConfigPreview';
import LivePreview from './LivePreview';
import NotificationSystem, { useNotifications } from './NotificationSystem';
import ImportSection from './ImportSection';
import ThemeToggle from './ThemeToggle';
import ThemeStatus from './ThemeStatus';
import { useTheme } from '../contexts/ThemeContext';
import { loadInitialConfig, importHomepageConfig } from '../utils/configUtils';

const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  min-height: 100vh;
  background: ${props => props.theme?.colors?.background || '#f5f5f5'};
  transition: background 0.3s ease;
`;

const LeftPanel = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightPanel = styled.div`
  flex: 1;
  position: sticky;
  top: 20px;
  height: fit-content;
`;

const Section = styled.div`
  background: ${props => props.theme?.colors?.surface || '#ffffff'};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px ${props => props.theme?.colors?.shadow || 'rgba(0,0,0,0.1)'};
  transition: all 0.3s ease;
`;

const SectionTitle = styled.h2`
  margin: 0 0 20px 0;
  color: ${props => props.theme?.colors?.text || '#333333'};
  border-bottom: 2px solid ${props => props.theme?.colors?.primary || '#007acc'};
  padding-bottom: 10px;
`;

const HeaderSection = styled.div`
  background: ${props => props.theme?.colors?.surface || '#ffffff'};
  border-radius: 8px;
  padding: 15px 20px;
  box-shadow: 0 2px 4px ${props => props.theme?.colors?.shadow || 'rgba(0,0,0,0.1)'};
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AppTitle = styled.h1`
  margin: 0;
  color: ${props => props.theme?.colors?.text || '#333333'};
  font-size: 24px;
  font-weight: 600;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme?.colors?.border || '#dee2e6'};
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: ${props => props.active ? props.theme?.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme?.colors.textSecondary};
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? props.theme?.colors.primary : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme?.colors.primary : props.theme?.colors.surfaceHover};
    color: ${props => props.active ? 'white' : props.theme?.colors.text};
  }
`;

const ConfigStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding: 10px;
  background: ${props => props.theme?.colors.surfaceHover};
  border-radius: 4px;
  border-left: 4px solid ${props => props.theme?.colors.success};
  font-size: 14px;
  color: ${props => props.theme?.colors.text};
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.loaded ? props.theme?.colors.success : props.theme?.colors.secondary};
`;

const ClearButton = styled.button`
  background: ${props => props.theme?.colors.danger};
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-left: auto;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${props => props.theme?.colors.dangerHover};
  }
`;

const DemoButton = styled.button`
  background: #6f42c1;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
  transition: background 0.2s ease;
  
  &:hover {
    background: #5a2d91;
  }
`;

const DragDropBuilder = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('services');
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);
  const { 
    notifications, 
    removeNotification, 
    success, 
    error, 
    warning, 
    info 
  } = useNotifications();
  
  const [config, setConfig] = useState({
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
  });

  // Cargar configuración inicial
  useEffect(() => {
    const initializeConfig = async () => {
      try {
        const initialConfig = await loadInitialConfig();
        setConfig(initialConfig);
      } catch (error) {
        console.error('Error loading initial config:', error);
      }
    };
    
    initializeConfig();
  }, []); // Solo ejecutar una vez al montar el componente

  // DEBUG: Rastrear cambios en el estado config
  useEffect(() => {
    console.log('🔄 ESTADO CONFIG CAMBIÓ:');
    console.log('📊 Servicios:', config.services?.length || 0);
    console.log('📊 Widgets:', config.widgets?.length || 0);
    console.log('📊 Bookmarks:', config.bookmarks?.length || 0);
    console.log('📊 Config completo:', config);
  }, [config]);

  // DEBUG: Rastrear cambios en isConfigLoaded
  useEffect(() => {
    console.log('🔄 isConfigLoaded CAMBIÓ A:', isConfigLoaded);
  }, [isConfigLoaded]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setConfig(prev => {
        const items = prev[activeTab];
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);

        return {
          ...prev,
          [activeTab]: arrayMove(items, oldIndex, newIndex)
        };
      });
    }
  }, [activeTab]);

  const addItem = useCallback((type, item) => {
    setConfig(prev => ({
      ...prev,
      [type]: [...prev[type], { ...item, id: Date.now().toString() }]
    }));
    
    const itemTypes = {
      services: 'servicio',
      widgets: 'widget',
      bookmarks: 'marcador'
    };
    
    success(`${itemTypes[type]} añadido`, `Se ha añadido el ${itemTypes[type]} "${item.name || item.title}" correctamente`);
  }, [success]);

  const updateItem = useCallback((type, id, updates) => {
    setConfig(prev => ({
      ...prev,
      [type]: prev[type].map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    }));
    
    const itemTypes = {
      services: 'servicio',
      widgets: 'widget',
      bookmarks: 'marcador'
    };
    
    info(`${itemTypes[type]} actualizado`, `Se ha actualizado el ${itemTypes[type]} correctamente`);
  }, [info]);

  const updateSettings = useCallback((newSettings) => {
    setConfig(prev => ({
      ...prev,
      settings: newSettings
    }));
    
    success('Configuración actualizada', 'Los ajustes generales se han guardado correctamente');
  }, [success]);

  const removeItem = useCallback((type, id) => {
    const item = config[type].find(item => item.id === id);
    setConfig(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
    
    const itemTypes = {
      services: 'servicio',
      widgets: 'widget',
      bookmarks: 'marcador'
    };
    
    warning(`${itemTypes[type]} eliminado`, `Se ha eliminado el ${itemTypes[type]} "${item?.name || item?.title || 'elemento'}" correctamente`);
  }, [config, warning]);

  const handleImport = useCallback(async (files) => {
    try {
      console.log('🚀 INICIANDO IMPORTACIÓN EN DRAGDROPBUILDER');
      console.log('📁 Archivos recibidos:', files);
      
      const importedConfig = await importHomepageConfig(files);
      console.log('📊 CONFIG IMPORTADA EN DRAGDROPBUILDER:', importedConfig);
      console.log('📊 Servicios importados:', importedConfig.services?.length || 0);
      console.log('📊 Widgets importados:', importedConfig.widgets?.length || 0);
      console.log('📊 Bookmarks importados:', importedConfig.bookmarks?.length || 0);
      
      console.log('⚡ Actualizando estado con setConfig...');
      
      // Crear una nueva referencia del objeto para forzar el re-render
      const newConfig = {
        services: [...(importedConfig.services || [])],
        widgets: [...(importedConfig.widgets || [])],
        bookmarks: [...(importedConfig.bookmarks || [])],
        settings: { ...importedConfig.settings }
      };
      
      console.log('⚡ Nuevo config a establecer:', newConfig);
      setConfig(newConfig);
      
      console.log('⚡ Marcando configuración como cargada...');
      setIsConfigLoaded(true);
      
      // Verificar el estado inmediatamente después
      setTimeout(() => {
        console.log('🔍 VERIFICANDO ESTADO DESPUÉS DE 100ms');
        console.log('🔍 Estado config actual será verificado en próximo render');
      }, 100);
      
      success('Importación completada', 'Los archivos YAML se han importado y cargado correctamente');
      return newConfig;
    } catch (importError) {
      console.error('❌ ERROR EN IMPORTACIÓN DRAGDROPBUILDER:', importError);
      error('Error de importación', `No se pudieron procesar los archivos: ${importError.message}`);
      throw importError;
    }
  }, [success, error]);

  const clearConfiguration = useCallback(() => {
    if (window.confirm('¿Estás seguro de que quieres limpiar toda la configuración? Esta acción no se puede deshacer.')) {
      setConfig({
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
      });
      setIsConfigLoaded(false);
      warning('Configuración limpiada', 'Toda la configuración ha sido eliminada');
    }
  }, [warning]);

  const loadDemoConfiguration = useCallback(() => {
    const demoConfig = {
      services: [
        {
          id: 'demo_service_1',
          name: 'GitHub',
          href: 'https://github.com',
          description: 'Code repositories and version control',
          group: 'Development',
          icon: 'si-github',
          target: '_blank'
        },
        {
          id: 'demo_service_2',
          name: 'Docker Hub',
          href: 'https://hub.docker.com',
          description: 'Container registry',
          group: 'Development',
          icon: 'si-docker',
          target: '_blank'
        },
        {
          id: 'demo_service_3',
          name: 'Nextcloud',
          href: 'https://nextcloud.example.com',
          description: 'Personal cloud storage',
          group: 'Productivity',
          icon: 'si-nextcloud',
          target: '_self'
        },
        {
          id: 'demo_service_4',
          name: 'Plex',
          href: 'https://plex.example.com',
          description: 'Media server',
          group: 'Media',
          icon: 'si-plex',
          target: '_blank'
        }
      ],
      widgets: [
        {
          id: 'demo_widget_1',
          type: 'search',
          name: 'Search Widget',
          provider: 'google',
          target: '_blank'
        },
        {
          id: 'demo_widget_2',
          type: 'datetime',
          name: 'DateTime Widget',
          text_size: 'xl',
          format: {
            timeStyle: 'short',
            dateStyle: 'long',
            hourCycle: 'h23'
          }
        },
        {
          id: 'demo_widget_3',
          type: 'resources',
          name: 'Resources Widget',
          backend: 'glances',
          expanded: true,
          cpu: true,
          memory: true
        }
      ],
      bookmarks: [
        {
          id: 'demo_bookmark_1',
          name: 'GitHub',
          href: 'https://github.com',
          group: 'Development',
          icon: 'si-github',
          description: 'Code repositories',
          target: '_blank'
        },
        {
          id: 'demo_bookmark_2',
          name: 'Stack Overflow',
          href: 'https://stackoverflow.com',
          group: 'Development',
          icon: 'si-stackoverflow',
          description: 'Programming Q&A',
          target: '_blank'
        },
        {
          id: 'demo_bookmark_3',
          name: 'Reddit',
          href: 'https://reddit.com',
          group: 'Social',
          icon: 'si-reddit',
          description: 'Social news',
          target: '_blank'
        }
      ],
      settings: {
        title: 'My Demo Homepage',
        favicon: 'https://example.com/favicon.ico',
        theme: 'dark',
        color: 'slate',
        headerStyle: 'clean',
        layout: {
          Development: { style: 'row', columns: 2 },
          Productivity: { style: 'column' },
          Media: { style: 'row', columns: 3 }
        }
      }
    };

    setConfig(demoConfig);
    setIsConfigLoaded(true);
    info('Demo cargado', 'Se ha cargado una configuración de ejemplo para probar la aplicación');
  }, [info]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'services':
        return (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={config.services}
              strategy={verticalListSortingStrategy}
            >
              <ServiceGroup
                services={config.services}
                onAdd={(item) => addItem('services', item)}
                onUpdate={(id, updates) => updateItem('services', id, updates)}
                onRemove={(id) => removeItem('services', id)}
              />
            </SortableContext>
          </DndContext>
        );
      case 'widgets':
        return (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={config.widgets}
              strategy={verticalListSortingStrategy}
            >
              <WidgetSection
                widgets={config.widgets}
                onAdd={(item) => addItem('widgets', item)}
                onUpdate={(id, updates) => updateItem('widgets', id, updates)}
                onRemove={(id) => removeItem('widgets', id)}
              />
            </SortableContext>
          </DndContext>
        );
      case 'bookmarks':
        return (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={config.bookmarks}
              strategy={verticalListSortingStrategy}
            >
              <BookmarkSection
                bookmarks={config.bookmarks}
                onAdd={(item) => addItem('bookmarks', item)}
                onUpdate={(id, updates) => updateItem('bookmarks', id, updates)}
                onRemove={(id) => removeItem('bookmarks', id)}
              />
            </SortableContext>
          </DndContext>
        );
      case 'settings':
        return (
          <SettingsForm
            settings={config.settings}
            onUpdate={updateSettings}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container theme={theme}>
      <LeftPanel>
        <HeaderSection theme={theme}>
          <AppTitle theme={theme}>🏠 Homepage Config Generator</AppTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ThemeStatus />
            <ThemeToggle showLabel={true} size="normal" />
          </div>
        </HeaderSection>
        
        <ImportSection 
          onImport={handleImport}
          onLoadDemo={loadDemoConfiguration}
          onNotify={{ success, error, warning, info }}
        />
        
        <Section theme={theme}>
          <SectionTitle theme={theme}>Homepage Configuration Builder</SectionTitle>
          
          {isConfigLoaded && (
            <ConfigStatus theme={theme}>
              <StatusDot loaded={true} theme={theme} />
              Configuración importada activa - Total: {config.services.length} servicios, {config.widgets.length} widgets, {config.bookmarks.length} marcadores
              <ClearButton onClick={clearConfiguration} theme={theme}>
                Limpiar Todo
              </ClearButton>
            </ConfigStatus>
          )}
          
          {/* DEBUG: Mostrar estado actual siempre */}
          <div style={{ 
            background: '#f0f0f0', 
            padding: '10px', 
            borderRadius: '4px', 
            fontSize: '12px',
            marginBottom: '10px',
            border: '1px solid #ddd'
          }}>
            <strong>🔍 DEBUG Estado:</strong><br/>
            • isConfigLoaded: {isConfigLoaded ? 'SÍ' : 'NO'}<br/>
            • Servicios: {config.services?.length || 0}<br/>
            • Widgets: {config.widgets?.length || 0}<br/>
            • Bookmarks: {config.bookmarks?.length || 0}<br/>
            • Última actualización: {new Date().toLocaleTimeString()}
          </div>
          
          <TabContainer theme={theme}>
            <Tab
              active={activeTab === 'services'}
              onClick={() => setActiveTab('services')}
              theme={theme}
            >
              Services (services.yaml)
            </Tab>
            <Tab
              active={activeTab === 'widgets'}
              onClick={() => setActiveTab('widgets')}
              theme={theme}
            >
              Info Widgets (widgets.yaml)
            </Tab>
            <Tab
              active={activeTab === 'bookmarks'}
              onClick={() => setActiveTab('bookmarks')}
              theme={theme}
            >
              Bookmarks
            </Tab>
            <Tab
              active={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
              theme={theme}
            >
              Settings
            </Tab>
          </TabContainer>
          {renderActiveTab()}
        </Section>
      </LeftPanel>
      
      <RightPanel>
        <ConfigPreview 
          config={config} 
          onNotify={{ success, error, warning, info }}
          onConfigUpdate={setConfig}
        />
        <LivePreview config={config} />
      </RightPanel>
      
      <NotificationSystem 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </Container>
  );
};

export default DragDropBuilder;
