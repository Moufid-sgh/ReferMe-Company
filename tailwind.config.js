/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {

    colors: {
      red: "#F44336",
      black: {
        500: "#4F5665",
        600: "#0B132A",
      },
      white: {
        300: "#F8F8F8",
        500: "#fff",
      },
      gray: {
        100: "#EEEFF2",
        400: "#AFB5C0",
        500: "#DDDDDD",
      },
      green:{
         500:'#0FA958'
        },
      blue: "#0F70B7",
      royaleblue: "#6795d2",
    },

    fontFamily: {
      'ubuntu': ['Ubuntu']
    },
    extend: {},
  },
  plugins: [ require('@tailwindcss/forms')],
}
