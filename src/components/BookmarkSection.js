import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';
import { FiMove, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import BookmarkForm from './BookmarkForm';
import { useTheme } from '../contexts/ThemeContext';

const BookmarkContainer = styled.div`
  margin-bottom: 20px;
`;

const AddBookmarkButton = styled.button`
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

const BookmarkGroup = styled.div`
  background: ${props => props.theme?.colors.surface};
  border: 1px solid ${props => props.theme?.colors.border};
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px ${props => props.theme?.colors.shadow};
  transition: all 0.2s ease;
`;

const BookmarkGroupHeader = styled.div`
  background: ${props => props.theme?.colors.primary};
  color: white;
  padding: 15px;
  border-radius: 8px 8px 0 0;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BookmarkList = styled.div`
  padding: 15px;
`;

const BookmarkItem = ({ bookmark, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { theme } = useTheme();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: bookmark.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <BookmarkItemContainer ref={setNodeRef} style={style} theme={theme}>
      <BookmarkHeader>
        <DragHandle {...attributes} {...listeners} theme={theme}>
          <FiMove />
        </DragHandle>
        <BookmarkInfo>
          <BookmarkName theme={theme}>
            {bookmark.name}
            {bookmark.target === '_blank' && (
              <span style={{ marginLeft: '6px', fontSize: '12px', opacity: 0.6 }}>🔗</span>
            )}
          </BookmarkName>
          <BookmarkUrl theme={theme}>{bookmark.href}</BookmarkUrl>
        </BookmarkInfo>
        <BookmarkActions>
          <ActionButton onClick={() => setIsEditing(true)} theme={theme}>
            <FiEdit />
          </ActionButton>
          <ActionButton onClick={() => onRemove(bookmark.id)} danger theme={theme}>
            <FiTrash2 />
          </ActionButton>
        </BookmarkActions>
      </BookmarkHeader>
      
      {bookmark.description && (
        <BookmarkDescription theme={theme}>{bookmark.description}</BookmarkDescription>
      )}
      
      {isEditing && (
        <BookmarkForm
          bookmark={bookmark}
          onSave={(updates) => {
            onUpdate(bookmark.id, updates);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </BookmarkItemContainer>
  );
};

const BookmarkSection = ({ bookmarks, onAdd, onUpdate, onRemove }) => {
  const [showForm, setShowForm] = useState(false);
  const { theme } = useTheme();

  // Agrupar bookmarks por grupo
  const groupedBookmarks = bookmarks.reduce((acc, bookmark) => {
    const group = bookmark.group || 'Default';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(bookmark);
    return acc;
  }, {});

  return (
    <BookmarkContainer>
      <AddBookmarkButton onClick={() => setShowForm(true)} theme={theme}>
        <FiPlus /> Add Bookmark
      </AddBookmarkButton>
      
      {showForm && (
        <BookmarkForm
          onSave={(bookmark) => {
            onAdd(bookmark);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
      
      {Object.entries(groupedBookmarks).map(([groupName, groupBookmarks]) => (
        <BookmarkGroup key={groupName} theme={theme}>
          <BookmarkGroupHeader theme={theme}>
            <FiMove />
            {groupName}
          </BookmarkGroupHeader>
          <BookmarkList>
            {groupBookmarks.map((bookmark) => (
              <BookmarkItem
                key={bookmark.id}
                bookmark={bookmark}
                onUpdate={onUpdate}
                onRemove={onRemove}
              />
            ))}
          </BookmarkList>
        </BookmarkGroup>
      ))}
    </BookmarkContainer>
  );
};

const BookmarkItemContainer = styled.div`
  background: ${props => props.theme?.colors.surface};
  border: 1px solid ${props => props.theme?.colors.border};
  border-radius: 6px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
`;

const BookmarkHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
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

const BookmarkInfo = styled.div`
  flex: 1;
`;

const BookmarkName = styled.div`
  font-weight: bold;
  color: ${props => props.theme?.colors.text};
  margin-bottom: 4px;
`;

const BookmarkUrl = styled.div`
  color: ${props => props.theme?.colors.textSecondary};
  font-size: 14px;
`;

const BookmarkDescription = styled.div`
  padding: 0 12px 12px;
  color: ${props => props.theme?.colors.textSecondary};
  font-size: 14px;
`;

const BookmarkActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: ${props => props.danger ? props.theme?.colors.danger : props.theme?.colors.secondary};
  color: white;
  border: none;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${props => props.danger ? props.theme?.colors.dangerHover : props.theme?.colors.secondaryHover};
  }
`;

export default BookmarkSection;
