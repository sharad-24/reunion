/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      purple: '#7065ee',
      lightPurple: '#f8f7fd'
     
  }),
    textColor: (theme) => ({
      ...theme("colors"),
      purple: '#7065ee'
     
  }),
    extend: {},
  },
  plugins: [],
}
