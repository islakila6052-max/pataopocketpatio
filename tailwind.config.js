/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      colors: {
        primary: {
          50: '#F1F4EB',
          100: '#E3EAD7',
          200: '#C9D8B5',
          300: '#A7C28C',
          400: '#85A96A',
          500: '#668B4F',
          600: '#4D713E',
          700: '#365B36',
          800: '#28482F',
          900: '#1D3729',
          950: '#12251B',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['DM Serif Display', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        green: '0 8px 20px rgba(46, 125, 50, 0.25)',
        'green-lg': '0 16px 30px rgba(46, 125, 50, 0.35)',
        card: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(46,125,50,0.08)',
        exp: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
        'exp-hover': '0 4px 8px rgba(0,0,0,0.06), 0 16px 32px rgba(27,94,32,0.10)',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
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
