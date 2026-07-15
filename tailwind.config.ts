import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          1: '#f5f5f7',
          2: '#ffffff',
        },
        border: '#d2d2d7',
        ink: {
          primary: '#1d1d1f',
          secondary: '#6e6e73',
        },
        warning: '#9a6a00',
        'warning-bg': '#fdf3e3',
        success: '#1a7a3e',
        'success-bg': '#e3f5e9',
        danger: '#b3261e',
        'danger-bg': '#fbe7e7',
      },
      borderRadius: {
        card: '12px',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Microsoft JhengHei"',
          'Segoe UI',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
