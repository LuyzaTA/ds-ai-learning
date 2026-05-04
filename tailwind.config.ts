import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Autism-friendly soft palette
        brand: {
          50:  '#EEF4FF',
          100: '#E0EAFF',
          200: '#C7D7FD',
          300: '#A5BFFA',
          400: '#819CF7',
          500: '#6272F3',
          600: '#4A55E8',
          700: '#3C43CD',
          800: '#3138A5',
          900: '#2D3582',
        },
        emerald: {
          50:  '#ECFDF5',
          500: '#10B981',
          600: '#059669',
        },
        violet: {
          50:  '#F5F3FF',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        amber: {
          50:  '#FFFBEB',
          400: '#FBBF24',
          500: '#F59E0B',
        },
        rose: {
          50:  '#FFF1F2',
          500: '#F43F5E',
        },
        slate: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1.5' }],
        'sm':   ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem',     { lineHeight: '1.7' }],
        'lg':   ['1.125rem', { lineHeight: '1.7' }],
        'xl':   ['1.25rem',  { lineHeight: '1.6' }],
        '2xl':  ['1.5rem',   { lineHeight: '1.5' }],
        '3xl':  ['1.875rem', { lineHeight: '1.4' }],
        '4xl':  ['2.25rem',  { lineHeight: '1.3' }],
      },
      borderRadius: {
        'xl':  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft':  '0 2px 12px 0 rgba(0,0,0,0.06)',
        'card':  '0 4px 24px 0 rgba(0,0,0,0.08)',
        'hover': '0 8px 32px 0 rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-in':   'fadeIn 0.2s ease-out',
        'slide-in':  'slideIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' },              to: { opacity: '1' } },
        slideIn: { from: { transform: 'translateY(-6px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
