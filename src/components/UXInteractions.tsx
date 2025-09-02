import React, { useState } from 'react';
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Snackbar,
  Alert,
  Skeleton,
  Box,
  CircularProgress,
  Backdrop,
  Zoom,
  Fade,
  Slide,
  Typography,
  LinearProgress
} from '@mui/material';
import { 
  Add, 
  Chat, 
  Code, 
  Image, 
  Settings,
  Close,
  Sparkles
} from 'lucide-react';
import { gradients } from '../theme/nexusTheme';

interface LoadingState {
  isLoading: boolean;
  progress?: number;
  message?: string;
}

interface NotificationState {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

const fabActions = [
  { icon: <Chat size={20} />, name: 'Yeni Sohbet', action: 'chat' },
  { icon: <Code size={20} />, name: 'Kod Analizi', action: 'code' },
  { icon: <Image size={20} />, name: 'Görsel Analiz', action: 'image' },
  { icon: <Settings size={20} />, name: 'Ayarlar', action: 'settings' },
];

export const LoadingSkeletons: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Skeleton variant="text" sx={{ fontSize: '2rem', mb: 2 }} />
      <Skeleton variant="rectangular" height={100} sx={{ mb: 2, borderRadius: 2 }} />
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rounded" width="100%" height={60} />
      </Box>
      <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
    </Box>
  );
};

export const LoadingOverlay: React.FC<{ loading: LoadingState }> = ({ loading }) => {
  return (
    <Backdrop
      sx={{ 
        color: '#fff', 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: 'blur(4px)',
        background: 'rgba(0, 0, 0, 0.7)'
      }}
      open={loading.isLoading}
    >
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress 
          size={60} 
          thickness={2}
          sx={{
            color: 'primary.main',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }}
        />
        {loading.message && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {loading.message}
          </Typography>
        )}
        {loading.progress !== undefined && (
          <LinearProgress 
            variant="determinate" 
            value={loading.progress}
            sx={{ 
              mt: 2, 
              width: 200,
              height: 6,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                background: gradients.primary,
                borderRadius: 3
              }
            }}
          />
        )}
      </Box>
    </Backdrop>
  );
};

export const FloatingActionButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
    setOpen(false);
  };

  return (
    <SpeedDial
      ariaLabel="Quick Actions"
      sx={{ 
        position: 'fixed', 
        bottom: 24, 
        right: 24,
        '& .MuiFab-primary': {
          background: gradients.primary,
          '&:hover': {
            background: gradients.primary,
            filter: 'brightness(1.1)',
          }
        }
      }}
      icon={<SpeedDialIcon icon={<Sparkles />} openIcon={<Close />} />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      TransitionComponent={Zoom}
    >
      {fabActions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => handleAction(action.action)}
          sx={{
            '&:hover': {
              background: gradients.primary,
              color: 'white',
            }
          }}
        />
      ))}
    </SpeedDial>
  );
};

export const NotificationSnackbar: React.FC<{ notification: NotificationState; onClose: () => void }> = ({ 
  notification, 
  onClose 
}) => {
  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={6000}
      onClose={onClose}
      TransitionComponent={Slide}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert 
        onClose={onClose} 
        severity={notification.severity}
        variant="filled"
        sx={{ 
          width: '100%',
          backdropFilter: 'blur(8px)',
          background: notification.severity === 'success' ? 'rgba(16, 185, 129, 0.9)' :
                     notification.severity === 'error' ? 'rgba(239, 68, 68, 0.9)' :
                     notification.severity === 'warning' ? 'rgba(245, 158, 11, 0.9)' :
                     'rgba(59, 130, 246, 0.9)'
        }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export const PulseAnimation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        '@keyframes pulse': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.5,
          },
        },
      }}
    >
      {children}
    </Box>
  );
};

export const GlowEffect: React.FC<{ children: React.ReactNode; color?: string }> = ({ 
  children, 
  color = '#9333EA' 
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
          filter: 'blur(20px)',
          zIndex: -1,
          animation: 'glow 2s ease-in-out infinite',
        },
        '@keyframes glow': {
          '0%, 100%': {
            opacity: 0.5,
            transform: 'translate(-50%, -50%) scale(1)',
          },
          '50%': {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1.1)',
          },
        },
      }}
    >
      {children}
    </Box>
  );
};

export const SwipeableDrawerMobile: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diff = currentX - startX;
    if (Math.abs(diff) > 100) {
      console.log(diff > 0 ? 'Swiped right' : 'Swiped left');
    }
    setDragging(false);
    setCurrentX(0);
    setStartX(0);
  };

  return (
    <Box
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      sx={{
        transform: dragging ? `translateX(${currentX - startX}px)` : 'translateX(0)',
        transition: dragging ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      {children}
    </Box>
  );
};

export const HoverCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 40px -12px rgba(147, 51, 234, 0.35)',
        },
      }}
    >
      {children}
    </Box>
  );
};

export const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({ 
  value, 
  duration = 1000 
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  React.useEffect(() => {
    const steps = 30;
    const increment = value / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{displayValue.toLocaleString()}</span>;
};