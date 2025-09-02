import { createTheme } from '@mui/material/styles';

export const nexusTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B5CF6',
      light: '#A78BFA',
      dark: '#6D28D9',
    },
    secondary: {
      main: '#EC4899',
      light: '#F472B6',
      dark: '#DB2777',
    },
    background: {
      default: '#0A0A0F',
      paper: 'rgba(255, 255, 255, 0.08)',
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#9CA3AF',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 300, letterSpacing: '-0.02em' },
    h2: { fontWeight: 400, letterSpacing: '-0.01em' },
    h3: { fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          padding: '10px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 20px 40px -12px rgba(147, 51, 234, 0.35)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
          boxShadow: '0 10px 30px -12px rgba(147, 51, 234, 0.5)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backdropFilter: 'blur(8px)',
          background: 'rgba(147, 51, 234, 0.1)',
          border: '1px solid rgba(147, 51, 234, 0.2)',
        },
      },
    },
  },
});

export const gradients = {
  primary: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
  secondary: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
  success: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
  warning: 'linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)',
  text: 'linear-gradient(135deg, #9333EA 0%, #EC4899 50%, #3B82F6 100%)',
};

export const glassmorphism = {
  light: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  medium: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  dark: {
    background: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
};

// Prompt Engineering UI Configuration
export const promptTechniques = {
  CoT: {
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
    description: 'Chain-of-Thought Reasoning'
  },
  ToT: {
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
    description: 'Tree-of-Thought Processing'
  },
  Meta: {
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
    description: 'Meta-Prompting Strategy'
  },
  FewShot: {
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    description: 'Few-Shot Learning'
  },
  ZeroShot: {
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)',
    description: 'Zero-Shot Reasoning'
  }
};

// Quality Indicators
export const qualityMetrics = {
  excellent: { color: '#10B981', threshold: 90 },
  good: { color: '#3B82F6', threshold: 75 },
  moderate: { color: '#F59E0B', threshold: 60 },
  poor: { color: '#EF4444', threshold: 0 }
};