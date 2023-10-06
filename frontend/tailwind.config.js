module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['outline-none'],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      spacing: {
        '1/2': '50%',
        '2/3': '66.666667%',
        '3/4': '75%',
      },
      zIndex: {
        '-1': '-1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
