/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: { 
      colors: {
      'orange-500': 'rgb(241,91,42)',
    }
  },
   
  },
  plugins: [],
}