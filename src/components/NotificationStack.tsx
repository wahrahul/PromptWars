import React from 'react';
import { useNotification } from '../context/NotificationContext';
import type { Notification as NotificationType } from '../context/NotificationContext';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';

const NotificationItem: React.FC<{ notification: NotificationType }> = ({ notification }) => {
  const { removeNotification } = useNotification();

  const getIcon = () => {
    switch (notification.type) {
      case 'success': return <CheckCircle size={18} color="#10b981" />;
      case 'info': return <Info size={18} color="#3b82f6" />;
      case 'warning': return <AlertTriangle size={18} color="#f59e0b" />;
      case 'error': return <XCircle size={18} color="#ef4444" />;
    }
  };

  const getBorderColor = () => {
    switch (notification.type) {
      case 'success': return 'rgba(16, 185, 129, 0.3)';
      case 'info': return 'rgba(59, 130, 246, 0.3)';
      case 'warning': return 'rgba(245, 158, 11, 0.3)';
      case 'error': return 'rgba(239, 68, 68, 0.3)';
    }
  };

  return (
    <div className="glass-panel notification-item" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      minWidth: '320px',
      maxWidth: '450px',
      borderLeft: `4px solid ${getBorderColor()}`,
      background: 'rgba(15, 15, 25, 0.85)',
      animation: 'slideInTop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.5)',
      pointerEvents: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {getIcon()}
      </div>
      <div style={{ flex: 1, fontSize: '0.85rem', fontWeight: 500, color: '#f8fafc', lineHeight: '1.4' }}>
        {notification.message}
      </div>
      <button 
        onClick={() => removeNotification(notification.id)}
        className="icon-btn" 
        style={{ padding: '0.25rem', opacity: 0.5 }}
      >
        <X size={14} />
      </button>
    </div>
  );
};

const NotificationStack: React.FC = () => {
  const { notifications } = useNotification();

  return (
    <div style={{
      position: 'fixed',
      top: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      pointerEvents: 'none',
      width: '100%',
      alignItems: 'center'
    }}>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
      <style>{`
        @keyframes slideInTop {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .notification-item { transition: all 0.3s ease; }
      `}</style>
    </div>
  );
};

export default NotificationStack;
