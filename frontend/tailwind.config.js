/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        surface: {
          base:    'rgb(var(--color-surface-base) / <alpha-value>)',
          raised:  'rgb(var(--color-surface-raised) / <alpha-value>)',
          overlay: 'rgb(var(--color-surface-overlay) / <alpha-value>)',
        },
        content: {
          primary:   'rgb(var(--color-content-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-content-secondary) / <alpha-value>)',
          tertiary:  'rgb(var(--color-content-tertiary) / <alpha-value>)',
          inverse:   'rgb(var(--color-content-inverse) / <alpha-value>)',
        },
        border: {
          base:   'rgb(var(--color-border-base) / <alpha-value>)',
          strong: 'rgb(var(--color-border-strong) / <alpha-value>)',
        },
      },
      animation: {
        'fade-in':       'fadeIn 0.6s ease-in-out',
        'fade-in-up':    'fadeInUp 0.8s ease-out',
        'fade-in-down':  'fadeInDown 0.8s ease-out',
        'slide-in-right':'slideInRight 0.5s ease-out',
        'gradient':      'gradient 8s linear infinite',
        'glow':          'glow 2s ease-in-out infinite alternate',
        'float':         'float 6s ease-in-out infinite',
        'shimmer':       'shimmer 2s linear infinite',
        'spin-slow':     'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn:       { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp:     { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeInDown:   { '0%': { opacity: '0', transform: 'translateY(-20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        gradient:     { '0%, 100%': { 'background-position': '0% 50%' }, '50%': { 'background-position': '100% 50%' } },
        glow:         { '0%': { 'box-shadow': '0 0 20px rgba(59,130,246,0.3)' }, '100%': { 'box-shadow': '0 0 40px rgba(59,130,246,0.6)' } },
        float:        { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        shimmer:      { '0%': { 'background-position': '-200% 0' }, '100%': { 'background-position': '200% 0' } },
      },
      backgroundImage: {
        'grid-pattern':    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath fill='none' stroke='%23ffffff10' stroke-width='1' d='M0 0h40v40H0z'/%3E%3C/svg%3E\")",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(59,130,246,0.3)',
        'glow':    '0 0 20px rgba(59,130,246,0.4)',
        'glow-lg': '0 0 40px rgba(59,130,246,0.5)',
      },
    },
  },
  plugins: [],
};

