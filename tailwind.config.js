/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '2xl-max': {'max': '1536px'},
      'xl-max': {'max': '1280px'},
      'lg-max': {'max': '1024px'},
      'md-max': {'max': '768px'},
      'sm-max': {'max': '640px'},
      ...defaultTheme.screens
    },
    extend: {
    },
  },
  plugins: [require("daisyui")],
}

