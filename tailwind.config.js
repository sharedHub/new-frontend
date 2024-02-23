/** @type {import('tailwindcss').Config} */
export default {
  content: [    
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'nunito': ['nunito', 'sans-serif'],
      'Manrope': ['"Manrope"', 'serif'] // Ensure fonts with spaces have " " surrounding it.
    },
    screens: {
      'tablet': '1180px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      tabview: '#D9D9D9',
      themecolor: '#0F172A',
      textcolor:'#6F6F6F',
      inputcolor:'#616161',
      "dark-purple": "#081A51",
      "light-white": "rgba(255,255,255,0.17)",
      buttoncolor:"#212F51",
    },
    extend: {},
  },
  plugins: [],
  
}

