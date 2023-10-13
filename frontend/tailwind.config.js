/** @type {import('tailwindcss').Config} */
// const { NEUTRAL } = require('./src/shared/lib/consts/styles')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['outline-none'],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '1920px',
      },
      colors: {
        black: 'var(--black)',
        white: 'var(--white)',
        secondWhite: 'var(--secondWhite)',
        red: 'var(--red)',
        gray: 'var(--gray)',
        green: 'var(--green)',
        purple: 'var(--purple)',
        orange: 'var(--orange)',

        //========ERROR=========
        error50: 'var(--error50)',
        error300: 'var(--error300)',
        error500: 'var(--error500)',
        error700: 'var(--error700)',
        error900: 'var(--error900)',
        //======================

        //========PRIMARY=========
        //main
        primaryMain300: 'var(--primaryMain300)',
        primaryMain500: 'var(--primaryMain500)',
        primaryMain700: 'var(--primaryMain700)',
        primaryMain800: 'var(--primaryMain800)',
        primaryMain900: 'var(--primaryMain900)',

        //dashboard
        primaryDash50: 'var(--primaryDash50)',
        primaryDash400: 'var(--primaryDash400)',
        primaryDash600: 'var(--primaryDash600)',
        primaryDash800: 'var(--primaryDash800)',
        primaryDash900: 'var(--primaryDash900)',
        //======================

        //========SUCCESS=========
        success50: 'var(--success50)',
        success300: 'var(--success300)',
        success500: 'var(--success500)',
        success700: 'var(--success700)',
        success900: 'var(--success900)',
        //========================
      },
      textColor: {
        black: 'var(--black)',
        white: 'var(--white)',
        red: 'var(--red)',
        gray: 'var(--gray)',
        green: 'var(--green)',
        orange: 'var(--orange)',
      },
      // boxShadow: {
      //   'outline-normal': '0.4px 0.4px 16px var(--gray)',
      //   magical: 'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
      // },
    },
    screens: {
      '2xl': { max: '1400px' },
      xl: { max: '1200px' },
      lg: { max: '992px' },
      md: { max: '768px' },
      sm: { max: '576px' },
    },
    container: {
      xl: {
        // max: '1170px',
      },
    },
  },
}
