/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gunmetal: '#2C3539',
        copper: '#B87333',
        coral: '#E07A5F',
        cream: '#FAF9F6',
        ivory: '#FFFFF0',
        gold: '#D4AF37',
      },
    },
  },
  plugins: [],
}