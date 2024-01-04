/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}", "'./dist/*.html"],
  theme: {
    extend: {
      fontFamily: {
        'main': ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}

