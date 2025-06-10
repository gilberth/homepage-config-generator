import React, { useState } from 'react';
import styled from 'styled-components';
import { FiDownload, FiEye, FiCode, FiEdit3, FiSave, FiX } from 'react-icons/fi';
import { generateYamlFiles } from '../utils/configUtils';
import { useTheme } from '../contexts/ThemeContext';
import yaml from 'js-yaml';

const PreviewContainer = styled.div`
  background: ${props => props.theme?.colors.surface};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px ${props => props.theme?.colors.shadow};
  transition: all 0.3s ease;
`;

const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid ${props => props.theme?.colors.primary};
  padding-bottom: 10px;
`;

const PreviewTitle = styled.h2`
  margin: 0;
  color: ${props => props.theme?.colors.text};
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid ${props => props.theme?.colors.border};
`;

const Tab = styled.button`
  padding: 8px 16px;
  border: none;
  background: ${props => props.active ? props.theme?.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme?.colors.textSecondary};
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? props.theme?.colors.primary : 'transparent'};
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme?.colors.primary : props.theme?.colors.surfaceHover};
    color: ${props => props.active ? 'white' : props.theme?.colors.text};
  }
`;

const CodeBlock = styled.pre`
  background: ${props => props.theme?.colors.codeBackground};
  color: ${props => props.theme?.colors.codeText};
  border: 1px solid ${props => props.theme?.colors.border};
  border-radius: 4px;
  padding: 15px;
  font-size: 12px;
  overflow-x: auto;
  white-space: pre-wrap;
  max-height: 400px;
  overflow-y: auto;
`;

const DownloadButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin-bottom: 10px;
  
  &:hover {
    background: #218838;
  }
`;

const PreviewStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background: ${props => props.theme?.colors.surfaceHover};
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  border: 1px solid ${props => props.theme?.colors.border};
`;

const StatNumber = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme?.colors.primary};
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${props => props.theme?.colors.textSecondary};
  text-transform: uppercase;
`;

const EditButton = styled.button`
  background: #17a2b8;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  margin-left: 8px;
  
  &:hover {
    background: #138496;
  }
`;

const SaveButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  margin-left: 8px;
  
  &:hover {
    background: #218838;
  }
`;

const CancelButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  margin-left: 8px;
  
  &:hover {
    background: #c82333;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const EditorContainer = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 4px;
  overflow: hidden;
`;

const YamlTextArea = styled.textarea`
  width: 100%;
  height: 400px;
  border: none;
  outline: none;
  padding: 15px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  line-height: 1.4;
  background: #f8f9fa;
  color: #333;
  resize: none;
  white-space: pre;
  overflow-wrap: normal;
  overflow-x: auto;
  
  &:focus {
    background: #fff;
  }
`;

const ConfigPreview = ({ config, onNotify, onConfigUpdate }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('services');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  // Generar YAML para cada sección usando las utilidades
  const yamlFiles = generateYamlFiles(config);
  
  const generateYaml = (section) => {
    const fileMap = {
      'services': 'services.yaml',
      'widgets': 'widgets.yaml', 
      'bookmarks': 'bookmarks.yaml',
      'settings': 'settings.yaml'
    };
    
    return yamlFiles[fileMap[section]] || '';
  };

  const downloadFile = (filename, content) => {
    try {
      const element = document.createElement('a');
      const file = new Blob([content], { type: 'text/yaml' });
      element.href = URL.createObjectURL(file);
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      if (onNotify) {
        onNotify.success('Descarga completada', `El archivo ${filename} se ha descargado correctamente`);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      if (onNotify) {
        onNotify.error('Error de descarga', `No se pudo descargar el archivo ${filename}`);
      }
    }
  };

  const downloadAll = () => {
    try {
      let downloadedCount = 0;
      Object.entries(yamlFiles).forEach(([filename, content]) => {
        if (content.trim()) {
          downloadFile(filename, content);
          downloadedCount++;
        }
      });
      
      if (onNotify && downloadedCount > 0) {
        onNotify.success('Descarga masiva completada', `Se han descargado ${downloadedCount} archivos YAML correctamente`);
      } else if (onNotify && downloadedCount === 0) {
        onNotify.warning('Sin archivos para descargar', 'No hay configuración suficiente para generar archivos YAML');
      }
    } catch (error) {
      console.error('Error downloading all files:', error);
      if (onNotify) {
        onNotify.error('Error de descarga masiva', 'No se pudieron descargar todos los archivos');
      }
    }
  };

  const startEditing = () => {
    setEditedContent(generateYaml(activeTab));
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedContent('');
  };

  const saveChanges = () => {
    try {
      // Validar YAML
      const parsedYaml = yaml.load(editedContent);
      
      if (!onConfigUpdate) {
        onNotify?.error('Error de configuración', 'No se puede aplicar cambios: función de actualización no disponible');
        return;
      }

      // Aplicar cambios según la sección activa
      applyYamlChanges(activeTab, parsedYaml);
      
      setIsEditing(false);
      setEditedContent('');
      onNotify?.success('Cambios aplicados', `La configuración de ${activeTab} se ha actualizado correctamente`);
      
    } catch (error) {
      console.error('Error parsing YAML:', error);
      onNotify?.error('Error de sintaxis YAML', 'El código YAML contiene errores de sintaxis. Por favor, corrígelo antes de guardar.');
    }
  };

  const applyYamlChanges = (section, parsedData) => {
    if (!parsedData) return;

    const newConfig = { ...config };

    switch (section) {
      case 'services':
        // Convertir servicios desde formato YAML a formato interno
        if (Array.isArray(parsedData)) {
          newConfig.services = parsedData.map(service => ({
            id: Date.now() + Math.random(),
            name: service.name || 'Servicio',
            description: service.description || '',
            icon: service.icon || 'fas fa-server',
            href: service.href || '',
            widget: service.widget || null
          }));
        }
        break;

      case 'widgets':
        // Convertir widgets desde formato YAML a formato interno
        if (Array.isArray(parsedData)) {
          newConfig.widgets = parsedData.map(widget => ({
            id: Date.now() + Math.random(),
            type: widget.type || 'custom',
            name: widget.name || 'Widget',
            ...widget
          }));
        }
        break;

      case 'bookmarks':
        // Convertir bookmarks desde formato YAML a formato interno
        if (Array.isArray(parsedData)) {
          newConfig.bookmarks = parsedData.map(bookmark => ({
            id: Date.now() + Math.random(),
            name: bookmark.name || 'Bookmark',
            href: bookmark.href || '',
            icon: bookmark.icon || 'fas fa-bookmark',
            description: bookmark.description || '',
            target: bookmark.target || '_self'
          }));
        }
        break;

      case 'settings':
        // Aplicar configuraciones generales
        if (typeof parsedData === 'object') {
          newConfig.settings = { ...newConfig.settings, ...parsedData };
        }
        break;

      default:
        break;
    }

    onConfigUpdate(newConfig);
  };

  return (
    <PreviewContainer theme={theme}>
      <PreviewHeader theme={theme}>
        <PreviewTitle theme={theme}>Configuration Preview</PreviewTitle>
      </PreviewHeader>

      <PreviewStats>
        <StatCard theme={theme}>
          <StatNumber theme={theme}>{config.services.length}</StatNumber>
          <StatLabel theme={theme}>Services</StatLabel>
        </StatCard>
        <StatCard theme={theme}>
          <StatNumber theme={theme}>{config.widgets.length}</StatNumber>
          <StatLabel theme={theme}>Widgets</StatLabel>
        </StatCard>
        <StatCard theme={theme}>
          <StatNumber theme={theme}>{config.bookmarks.length}</StatNumber>
          <StatLabel theme={theme}>Bookmarks</StatLabel>
        </StatCard>
      </PreviewStats>

      <DownloadButton onClick={downloadAll}>
        <FiDownload /> Download All YAML Files
      </DownloadButton>

      <TabContainer theme={theme}>
        <Tab
          active={activeTab === 'services'}
          onClick={() => setActiveTab('services')}
          theme={theme}
        >
          <FiCode /> services.yaml
        </Tab>
        <Tab
          active={activeTab === 'widgets'}
          onClick={() => setActiveTab('widgets')}
          theme={theme}
        >
          <FiCode /> widgets.yaml
        </Tab>
        <Tab
          active={activeTab === 'bookmarks'}
          onClick={() => setActiveTab('bookmarks')}
          theme={theme}
        >
          <FiCode /> bookmarks.yaml
        </Tab>
        <Tab
          active={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
          theme={theme}
        >
          <FiCode /> settings.yaml
        </Tab>
      </TabContainer>

      <ButtonGroup>
        <DownloadButton 
          onClick={() => downloadFile(`${activeTab}.yaml`, generateYaml(activeTab))}
          style={{ marginBottom: '15px', fontSize: '12px', padding: '6px 12px', marginRight: '8px' }}
        >
          <FiDownload /> Download {activeTab}.yaml
        </DownloadButton>

        {!isEditing ? (
          <EditButton onClick={startEditing}>
            <FiEdit3 /> Editar Código
          </EditButton>
        ) : (
          <>
            <SaveButton onClick={saveChanges}>
              <FiSave /> Guardar
            </SaveButton>
            <CancelButton onClick={cancelEditing}>
              <FiX /> Cancelar
            </CancelButton>
          </>
        )}
      </ButtonGroup>

      {isEditing ? (
        <EditorContainer>
          <YamlTextArea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Edita tu código YAML aquí..."
            spellCheck={false}
          />
        </EditorContainer>
      ) : (
        <CodeBlock theme={theme}>
          {generateYaml(activeTab) || `# No ${activeTab} configured yet`}
        </CodeBlock>
      )}
    </PreviewContainer>
  );
};

export default ConfigPreview;
