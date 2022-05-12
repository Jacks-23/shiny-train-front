module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        extendAndFade: 'extendAndFade ease-in 10s infinite'
      },
      keyframes: {
        extendAndFade: {
          '0%': {transform: 'scale(0.5)', opacity:'0'},
          '30%': {opacity:'1'},
          '100%': {transform: 'scale(2)', opacity: '0'}
        }
      }
    },
  },
  plugins: [],
};
