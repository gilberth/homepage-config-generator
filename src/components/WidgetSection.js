import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';
import { FiMove, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import WidgetForm from './WidgetForm';
import { useTheme } from '../contexts/ThemeContext';

const WidgetContainer = styled.div`
  margin-bottom: 20px;
`;

const AddWidgetButton = styled.button`
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

const WidgetItem = ({ widget, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { theme } = useTheme();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <WidgetItemContainer ref={setNodeRef} style={style} theme={theme}>
      <WidgetHeader>
        <DragHandle {...attributes} {...listeners} theme={theme}>
          <FiMove />
        </DragHandle>
        <WidgetInfo>
          <WidgetType theme={theme}>{widget.type}</WidgetType>
          {widget.key && <WidgetKey theme={theme}>Key: {widget.key}</WidgetKey>}
        </WidgetInfo>
        <WidgetActions>
          <ActionButton onClick={() => setIsEditing(true)} theme={theme}>
            <FiEdit />
          </ActionButton>
          <ActionButton onClick={() => onRemove(widget.id)} danger theme={theme}>
            <FiTrash2 />
          </ActionButton>
        </WidgetActions>
      </WidgetHeader>
      
      {widget.options && Object.keys(widget.options).length > 0 && (
        <WidgetOptions theme={theme}>
          <strong>Options:</strong>
          <pre>{JSON.stringify(widget.options, null, 2)}</pre>
        </WidgetOptions>
      )}
      
      {isEditing && (
        <WidgetForm
          widget={widget}
          onSave={(updates) => {
            onUpdate(widget.id, updates);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </WidgetItemContainer>
  );
};

const WidgetSection = ({ widgets, onAdd, onUpdate, onRemove }) => {
  const { theme } = useTheme();
  const [showForm, setShowForm] = useState(false);

  return (
    <WidgetContainer>
      <AddWidgetButton theme={theme} onClick={() => setShowForm(true)}>
        <FiPlus /> Add Widget
      </AddWidgetButton>
      
      {showForm && (
        <WidgetForm
          onSave={(widget) => {
            onAdd(widget);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
      
      {widgets.map((widget) => (
        <WidgetItem
          key={widget.id}
          widget={widget}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}
    </WidgetContainer>
  );
};

const WidgetItemContainer = styled.div`
  background: ${props => props.theme?.colors.surface};
  border: 1px solid ${props => props.theme?.colors.border};
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px ${props => props.theme?.colors.shadow};
  transition: all 0.2s ease;
`;

const WidgetHeader = styled.div`
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

const WidgetInfo = styled.div`
  flex: 1;
`;

const WidgetType = styled.div`
  font-weight: bold;
  color: ${props => props.theme?.colors.text};
  margin-bottom: 4px;
  text-transform: capitalize;
`;

const WidgetKey = styled.div`
  color: ${props => props.theme?.colors.textSecondary};
  font-size: 14px;
`;

const WidgetOptions = styled.div`
  padding: 0 15px 15px;
  color: ${props => props.theme?.colors.textSecondary};
  font-size: 12px;
  
  pre {
    background: ${props => props.theme?.colors.codeBackground};
    color: ${props => props.theme?.colors.codeText};
    border: 1px solid ${props => props.theme?.colors.border};
    padding: 10px;
    border-radius: 4px;
    margin: 5px 0 0 0;
    overflow-x: auto;
  }
`;

const WidgetActions = styled.div`
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

export default WidgetSection;
