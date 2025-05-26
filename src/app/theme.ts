// Configuración del tema Colegio Sugamuxi para la Plataforma Química
export const sugamuxiTheme = {
  colors: {
    // Colores principales
    background: '#ffffff',
    foreground: '#1a1a1a',

    // Colores de tarjetas
    card: '#ffffff',
    cardForeground: '#1a1a1a',

    // Colores de popover
    popover: '#ffffff',
    popoverForeground: '#1a1a1a',

    // Colores institucionales Sugamuxi
    primary: '#22c55e', // Verde institucional
    primaryForeground: '#ffffff',

    // Colores secundarios
    secondary: '#f97316', // Naranja institucional
    secondaryForeground: '#ffffff',

    // Colores silenciados
    muted: '#f8fafc',
    mutedForeground: '#64748b',

    // Colores de acento
    accent: '#22c55e',
    accentForeground: '#ffffff',

    // Colores destructivos
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',

    // Bordes y elementos de entrada
    border: '#e2e8f0',
    input: '#e2e8f0',
    ring: '#22c55e',

    // Colores específicos de Sugamuxi
    sugamuxiGreen: '#22c55e',
    sugamuxiOrange: '#f97316',
    sugamuxiBlack: '#1a1a1a',
    sugamuxiWhite: '#ffffff',
  },

  // Radio de bordes
  radius: '0.5rem',

  // Fuentes
  fonts: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },

  // Sombras
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    sugamuxi: '0 8px 25px rgba(34, 197, 94, 0.15)',
  },

  // Transiciones
  transitions: {
    default: 'all 0.2s ease',
    slow: 'all 0.3s ease',
    hover: 'transform 0.2s ease, box-shadow 0.2s ease',
  },

  // Gradientes institucionales
  gradients: {
    primary: 'linear-gradient(135deg, #22c55e 0%, #f97316 100%)',
    subtle:
      'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)',
    header: 'linear-gradient(135deg, #22c55e 0%, #f97316 100%)',
  },
};

// Función para aplicar el tema Sugamuxi
export const applySugamuxiTheme = () => {
  const root = document.documentElement;

  Object.entries(sugamuxiTheme.colors).forEach(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    root.style.setProperty(`--${cssVar}`, value);
  });

  root.style.setProperty('--radius', sugamuxiTheme.radius);
};

// Utilidades para usar los colores del tema
export const getThemeColor = (colorName: keyof typeof sugamuxiTheme.colors) => {
  return `var(--${colorName.replace(/([A-Z])/g, '-$1').toLowerCase()})`;
};

// Clases CSS predefinidas para componentes Sugamuxi
export const sugamuxiClasses = {
  card: 'bg-card text-card-foreground border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-200',
  featureCard: 'feature-card',
  statsCard: 'stats-card',
  button: {
    primary: 'button-primary',
    secondary: 'button-secondary',
    destructive:
      'bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md px-4 py-2 font-medium transition-colors',
  },
  input:
    'border border-input bg-background px-3 py-2 rounded-md text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'sugamuxi-header',
  logo: 'sugamuxi-logo',
  welcomeSection: 'welcome-section',
};

// Configuración específica para el Colegio Sugamuxi
export const sugamuxiConfig = {
  institution: {
    name: 'Colegio Sugamuxi',
    foundedYear: 1905,
    motto: 'Excelencia Educativa',
    colors: {
      primary: '#22c55e',
      secondary: '#f97316',
      neutral: '#1a1a1a',
      background: '#ffffff',
    },
  },
  platform: {
    name: 'Plataforma Química Digital',
    version: '1.0.0',
    features: [
      'Laboratorio Virtual',
      'Base de Datos Química',
      'Análisis y Reportes',
      'Recursos Educativos',
      'Calculadora Química',
      'Comunidad Académica',
    ],
  },
};

export default sugamuxiTheme;
