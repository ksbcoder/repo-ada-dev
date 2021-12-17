module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'hard-green': '#003B46',
        'light-brown': '#E9E1DE'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
