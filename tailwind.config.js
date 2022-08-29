const defaultTheme = require('tailwindcss/defaultTheme');
const forms = require('@tailwindcss/forms');

module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './src/**/*..{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'logo-r': 'url("/assets/images/gros_logo_en_arriere_plan.png")',
        'logo-r2': 'url("./assets/images/gros_logo_en_arriere_plan.png)',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'blue-rb': {
          400: '#8ED6FF',
          700: '#3390FA',
          750: '#3380DA',
          800: '#24529F',
          850: '#24427F',
          900: '#003399',
        },
        'cyan-rb': {
          500: '#00DAE1',
        },
        'gray-rb': {
          50: '#00000029',
          500: '#E8E8E8',
          600: '#BEBEBE',
          650: '#AAAAAA',
          700: '#A9A9A9',
          750: '#A8A8A8',
          800: '#969696',
          900: '#707070',
          950: '#606060',
        },
        'red-rb': {
          800: '#7E0005',
          900: '#700005',
        },
      },
      fontFamily: {
        'rb-akira-exp': ['Akira Expanded', ...defaultTheme.fontFamily.sans],
        'rb-swis': ['Swis721BlkExBT', ...defaultTheme.fontFamily.sans],
        'rb-akira-sup': ['Akira Super', ...defaultTheme.fontFamily.sans],
        'rb-Bahns': ['Bahnschrift', ...defaultTheme.fontFamily.sans],
      },
      height: {
        'screen-rb': '98vh',
      },
      width: {
        'screen-rb': '99%',
      },
    },
  },
  variants: {},
  plugins: [forms],
};
