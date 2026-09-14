import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  fontFamilyMonospace: 'Lato, monospace',
  headings: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: {
        fontSize: '56px',
        lineHeight: '1.2',
        fontWeight: '700',
      },
      h2: {
        fontSize: '36px',
        lineHeight: '1.3',
        fontWeight: '600',
      },
      h3: {
        fontSize: '28px',
        lineHeight: '1.4',
        fontWeight: '600',
      },
    },
  },
  colors: {
    navy: [
      '#E8EDF5',
      '#C4D0E3',
      '#9FB3D1',
      '#7B96BF',
      '#5679AD',
      '#315C9B',
      '#0F172A',
      '#0C1321',
      '#090E18',
      '#060A0F',
    ],
    sky: [
      '#EFF6FF',
      '#DBEAFE',
      '#BFDBFE',
      '#93C5FD',
      '#60A5FA',
      '#3B82F6',
      '#2563EB',
      '#1D4ED8',
      '#1E40AF',
      '#1E3A8A',
    ],
  },
  primaryColor: 'sky',
  defaultRadius: 'md',
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  },
});
