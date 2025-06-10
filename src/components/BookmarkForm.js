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
  cursor: pointer;
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
  transition: all 0.2s ease;
  
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

const BookmarkForm = ({ bookmark, onSave, onCancel }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: bookmark?.name || '',
    href: bookmark?.href || '',
    description: bookmark?.description || '',
    group: bookmark?.group || 'Default',
    icon: bookmark?.icon || '',
    target: bookmark?.target || '_self', // Nueva opción para controlar cómo se abre el enlace
    ...bookmark
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

  return (
    <FormContainer theme={theme}>
      <FormTitle theme={theme}>{bookmark ? 'Edit Bookmark' : 'Add New Bookmark'}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label theme={theme}>Bookmark Name *</Label>
            <Input
              theme={theme}
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g., Google, GitHub, etc."
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Group</Label>
            <Input
              theme={theme}
              type="text"
              value={formData.group}
              onChange={(e) => handleChange('group', e.target.value)}
              placeholder="e.g., Social, Work, Development"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label theme={theme}>URL *</Label>
            <Input
              theme={theme}
              type="url"
              value={formData.href}
              onChange={(e) => handleChange('href', e.target.value)}
              placeholder="https://example.com"
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
            <Label theme={theme}>Open In</Label>
            <Select
              theme={theme}
              value={formData.target}
              onChange={(e) => handleChange('target', e.target.value)}
            >
              <option value="_self">Same Tab</option>
              <option value="_blank">New Tab</option>
              <option value="_parent">Parent Frame</option>
              <option value="_top">Top Frame</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Description</Label>
            <TextArea
              theme={theme}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Brief description of the bookmark"
            />
          </FormGroup>
        </FormRow>

        <ButtonGroup>
          <Button theme={theme} type="button" className="secondary" onClick={onCancel}>
            <FiX /> Cancel
          </Button>
          <Button theme={theme} type="submit" className="primary">
            <FiSave /> Save Bookmark
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default BookmarkForm;
