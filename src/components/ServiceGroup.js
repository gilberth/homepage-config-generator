import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';
import { FiMove, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import ServiceForm from './ServiceForm';
import { useTheme } from '../contexts/ThemeContext';

const ServiceContainer = styled.div`
  margin-bottom: 20px;
`;

const ServiceGroupHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  background: ${props => props.theme?.colors.primary};
  color: white;
  padding: 15px;
  border-radius: 8px 8px 0 0;
  font-weight: bold;
`;

const AddServiceButton = styled.button`
  background: ${props => props.theme?.colors.success};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${props => props.theme?.colors.successHover};
  }
`;

const ServiceItem = ({ service, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { theme } = useTheme();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: service.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ServiceItemContainer ref={setNodeRef} style={style} theme={theme}>
      <ServiceHeader>
        <DragHandle {...attributes} {...listeners} theme={theme}>
          <FiMove />
        </DragHandle>
        <ServiceInfo>
          <ServiceName theme={theme}>
            {service.name} {service.target === '_blank' && '🔗'}
          </ServiceName>
          <ServiceUrl theme={theme}>{service.href}</ServiceUrl>
        </ServiceInfo>
        <ServiceActions>
          <ActionButton onClick={() => setIsEditing(true)} theme={theme}>
            <FiEdit />
          </ActionButton>
          <ActionButton onClick={() => onRemove(service.id)} danger theme={theme}>
            <FiTrash2 />
          </ActionButton>
        </ServiceActions>
      </ServiceHeader>
      
      {service.description && (
        <ServiceDescription theme={theme}>{service.description}</ServiceDescription>
      )}
      
      {isEditing && (
        <ServiceForm
          service={service}
          onSave={(updates) => {
            onUpdate(service.id, updates);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </ServiceItemContainer>
  );
};

const ServiceGroup = ({ services, onAdd, onUpdate, onRemove }) => {
  const { theme } = useTheme();
  const [showForm, setShowForm] = useState(false);

  return (
    <ServiceContainer>
      <AddServiceButton theme={theme} onClick={() => setShowForm(true)}>
        <FiPlus /> Add Service
      </AddServiceButton>
      
      {showForm && (
        <ServiceForm
          onSave={(service) => {
            onAdd(service);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
      
      {services.map((service) => (
        <ServiceItem
          key={service.id}
          service={service}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}
    </ServiceContainer>
  );
};

const ServiceItemContainer = styled.div`
  background: ${props => props.theme?.colors.surface};
  border: 1px solid ${props => props.theme?.colors.border};
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px ${props => props.theme?.colors.shadow};
  transition: all 0.2s ease;
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  gap: 10px;
`;

const DragHandle = styled.div`
  cursor: grab;
  color: ${props => props.theme?.colors.textSecondary};
  display: flex;
  align-items: center;
  
  &:active {
    cursor: grabbing;
  }
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceName = styled.div`
  font-weight: bold;
  color: ${props => props.theme?.colors.text};
  margin-bottom: 4px;
`;

const ServiceUrl = styled.div`
  color: ${props => props.theme?.colors.textSecondary};
  font-size: 14px;
`;

const ServiceDescription = styled.div`
  padding: 0 15px 15px;
  color: ${props => props.theme?.colors.textSecondary};
  font-size: 14px;
`;

const ServiceActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: ${props => props.danger ? props.theme?.colors.danger : props.theme?.colors.secondary};
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${props => props.danger ? props.theme?.colors.dangerHover : props.theme?.colors.secondaryHover};
  }
`;

export default ServiceGroup;
