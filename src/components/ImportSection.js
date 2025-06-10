import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FiUpload, FiFile, FiX, FiCheck, FiPlay } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const ImportContainer = styled.div`
  background: ${props => props.theme?.colors?.surface || '#ffffff'};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px ${props => props.theme?.colors?.shadow || 'rgba(0,0,0,0.1)'};
  margin-bottom: 20px;
  transition: all 0.3s ease;
`;

const ImportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ImportTitle = styled.h3`
  margin: 0;
  color: ${props => props.theme?.colors?.text || '#333333'};
  font-size: 18px;
`;

const ImportButton = styled.button`
  background: ${props => props.theme?.colors?.success || '#28a745'};
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${props => props.theme?.colors?.successHover || '#218838'};
  }
  
  &:disabled {
    background: ${props => props.theme?.colors?.secondary || '#6c757d'};
    cursor: not-allowed;
  }
`;

const DemoButton = styled.button`
  background: #6f42c1;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin-left: 10px;
  
  &:hover {
    background: #5a2d91;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const FileInput = styled.input`
  display: none;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: ${props => props.theme?.colors?.surfaceHover || '#f8f9fa'};
  border: 1px solid ${props => props.theme?.colors?.border || '#dee2e6'};
  border-radius: 4px;
  font-size: 14px;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme?.colors?.danger || '#dc3545'};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${props => (props.theme?.colors?.danger || '#dc3545') + '20'};
  }
`;

const ProcessButton = styled.button`
  background: ${props => props.theme?.colors?.primary || '#007acc'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  width: 100%;
  justify-content: center;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${props => props.theme?.colors?.primaryHover || '#0056b3'};
  }
  
  &:disabled {
    background: ${props => props.theme?.colors?.secondary || '#6c757d'};
    cursor: not-allowed;
  }
`;

const HelpText = styled.p`
  font-size: 12px;
  color: ${props => props.theme?.colors?.textSecondary || '#666666'};
  margin: 10px 0 0 0;
  line-height: 1.4;
`;

const ImportSection = ({ onImport, onLoadDemo, onNotify }) => {
  const { theme } = useTheme();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef();

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const yamlFiles = files.filter(file => 
      file.name.toLowerCase().endsWith('.yaml') || 
      file.name.toLowerCase().endsWith('.yml')
    );
    
    if (yamlFiles.length !== files.length) {
      onNotify?.warning(
        'Archivos filtrados', 
        'Solo se pueden importar archivos .yaml o .yml'
      );
    }
    
    setSelectedFiles(prev => [...prev, ...yamlFiles]);
    event.target.value = ''; // Reset input
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processImport = async () => {
    if (selectedFiles.length === 0) {
      onNotify?.warning('Sin archivos', 'Selecciona al menos un archivo YAML para importar');
      return;
    }

    setIsProcessing(true);
    
    try {
      const importedConfig = await onImport(selectedFiles);
      setSelectedFiles([]);
      onNotify?.success(
        'Importación exitosa', 
        `Se han importado ${selectedFiles.length} archivos correctamente`
      );
    } catch (error) {
      console.error('Import error:', error);
      onNotify?.error(
        'Error de importación', 
        `Error al procesar los archivos: ${error.message}`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const getFileTypeIcon = (fileName) => {
    const name = fileName.toLowerCase();
    if (name.includes('services')) return '🔧';
    if (name.includes('widgets')) return '📊';
    if (name.includes('bookmarks')) return '🔖';
    if (name.includes('settings')) return '⚙️';
    return '📄';
  };

  return (
    <ImportContainer theme={theme}>
      <ImportHeader>
        <ImportTitle theme={theme}>📁 Import Configuration</ImportTitle>
        <ButtonGroup>
          <ImportButton onClick={() => fileInputRef.current?.click()} theme={theme}>
            <FiUpload /> Seleccionar Archivos
          </ImportButton>
          <DemoButton onClick={onLoadDemo}>
            <FiPlay /> Cargar Demo
          </DemoButton>
        </ButtonGroup>
      </ImportHeader>

      <FileInput
        ref={fileInputRef}
        type="file"
        multiple
        accept=".yaml,.yml"
        onChange={handleFileSelect}
      />

      {selectedFiles.length > 0 && (
        <>
          <FileList>
            {selectedFiles.map((file, index) => (
              <FileItem key={index} theme={theme}>
                <FileInfo theme={theme}>
                  <span>{getFileTypeIcon(file.name)}</span>
                  <FiFile />
                  <span>{file.name}</span>
                  <span style={{ color: theme.colors.textSecondary, fontSize: '12px' }}>
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </FileInfo>
                <RemoveButton onClick={() => removeFile(index)} theme={theme}>
                  <FiX size={16} />
                </RemoveButton>
              </FileItem>
            ))}
          </FileList>

          <ProcessButton 
            onClick={processImport} 
            disabled={isProcessing}
            theme={theme}
          >
            {isProcessing ? 'Procesando...' : <><FiCheck /> Importar Configuración</>}
          </ProcessButton>
        </>
      )}

      <HelpText theme={theme}>
        Puedes importar archivos YAML de homepage existentes: services.yaml, widgets.yaml, 
        bookmarks.yaml y settings.yaml. Los archivos se procesarán y cargarán en el editor 
        para que puedas continuar modificándolos.
      </HelpText>
    </ImportContainer>
  );
};

export default ImportSection;
