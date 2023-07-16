/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/*.html"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      },
      gridTemplateColumns: {
        'main': 'repeat(auto-fit, minmax(300px, 24%))',
      }
    },
  },
  plugins: [],
}

