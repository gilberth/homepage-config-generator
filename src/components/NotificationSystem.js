import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  animation: ${props => props.isClosing ? slideOut : slideIn} 0.3s ease-in-out;
  
  background: ${props => {
    switch (props.type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  }};
  
  color: white;
`;

const NotificationIcon = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const NotificationMessage = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const NotificationSystem = ({ notifications, onRemove }) => {
  const [closingIds, setClosingIds] = useState(new Set());

  const handleClose = (id) => {
    setClosingIds(prev => new Set([...prev, id]));
    setTimeout(() => {
      onRemove(id);
      setClosingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 300);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <FiCheck size={20} />;
      case 'error': return <FiX size={20} />;
      case 'warning': return <FiAlertCircle size={20} />;
      case 'info': return <FiInfo size={20} />;
      default: return <FiInfo size={20} />;
    }
  };

  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.autoClose !== false) {
        const timer = setTimeout(() => {
          handleClose(notification.id);
        }, notification.duration || 4000);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications]);

  return (
    <NotificationContainer>
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          type={notification.type}
          isClosing={closingIds.has(notification.id)}
        >
          <NotificationIcon>
            {getIcon(notification.type)}
          </NotificationIcon>
          <NotificationContent>
            <NotificationTitle>{notification.title}</NotificationTitle>
            {notification.message && (
              <NotificationMessage>{notification.message}</NotificationMessage>
            )}
          </NotificationContent>
          <CloseButton onClick={() => handleClose(notification.id)}>
            <FiX size={16} />
          </CloseButton>
        </NotificationItem>
      ))}
    </NotificationContainer>
  );
};

// Hook para gestionar notificaciones
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    // Evitar notificaciones duplicadas recientes
    const isDuplicate = notifications.some(n => 
      n.title === notification.title && 
      n.message === notification.message &&
      (Date.now() - parseInt(n.id)) < 2000 // 2 segundos
    );
    
    if (!isDuplicate) {
      setNotifications(prev => {
        const newNotifications = [...prev, { ...notification, id }];
        // Limitar a máximo 5 notificaciones
        return newNotifications.slice(-5);
      });
    }
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const success = (title, message) => {
    addNotification({ type: 'success', title, message });
  };

  const error = (title, message) => {
    addNotification({ type: 'error', title, message });
  };

  const warning = (title, message) => {
    addNotification({ type: 'warning', title, message });
  };

  const info = (title, message) => {
    addNotification({ type: 'info', title, message });
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info
  };
};

export default NotificationSystem;
