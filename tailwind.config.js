module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'className'
  theme: {
    backgroundColor:theme=>({
      ...theme('colors'),
      'hover-bg':'#009b98'
    }),
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      borderRadius: ['hover'],
    },
  },
  plugins: [],
}
