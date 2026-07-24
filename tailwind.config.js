/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
          950: '#0F3214',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'green': '0 8px 20px rgba(46, 125, 50, 0.25)',
        'green-lg': '0 16px 30px rgba(46, 125, 50, 0.35)',
        'card': '0 12px 30px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 24px 48px rgba(46, 125, 50, 0.10)',
        'exp': '0 12px 28px rgba(0, 0, 0, 0.04)',
        'exp-hover': '0 30px 50px rgba(27, 94, 32, 0.12)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'float-leaf': 'floatLeaf 18s infinite linear',
        'float-leaf-1': 'floatLeaf 22s infinite linear',
        'float-leaf-2': 'floatLeaf 26s infinite linear',
        'float-leaf-3': 'floatLeaf 20s infinite linear',
      },
      keyframes: {
        floatLeaf: {
          '0%': { transform: 'translateY(0) rotate(0deg) scale(0.8)', opacity: '0.2' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-120vh) rotate(720deg) scale(1.2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
