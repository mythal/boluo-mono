const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const themeSwapper = require('tailwindcss-theme-swapper');

const { red, blue, green, yellow, white, black, gray, slate } = colors;

/** @type {import('tailwindcss').Config.theme} */
const lightTheme = {
  colors: {
    bg: white,
    text: black,
    design: {
      sidebar: gray['100'],
      sortItem: green[200],
      sortItemBorder: green[700],
      popoverBox: gray['100'],
    },
    button: {
      default: {
        bg: gray[300],
        hover: gray[200],
        active: gray[400],
        text: black,
      },
      primary: {
        bg: green[600],
        text: white,
        hover: green[500],
        active: green[700],
      },
    },
    dialog: {
      border: gray[300],
      bg: gray[50],
      shadow: 'rgba(0, 0, 0, 0.25)',
    },
    toast: {
      default: gray[700],
      warn: yellow[600],
      error: red[700],
      border: black,
    },
    select: {
      button: {
        bg: white,
        text: black,
        border: gray[300],
        disabled: gray[100],
        disabledText: gray[500],
        hoverBorder: gray[500],
        hover: gray[50],
        openBorder: gray[500],
        open: gray[200],
      },
      list: {
        border: black,
        text: black,
      },
      item: {
        bg: gray[100],
        text: black,
        hover: gray[50],
        highlighted: gray[50],
        selectedHover: green[600],
        selected: green[700],
        selectedHighlighted: green[600],
      },
    },
    link: {
      text: green[700],
      hover: green[600],
      active: green[500],
    },
    input: {
      default: {
        border: gray[300],
        bg: white,
        placeholder: gray[400],
        focusBorder: gray[600],
        hoverBorder: gray[600],
      },
      error: {
        border: red[500],
        bg: red[100],
        ring: red[100],
        placeholder: red[600],
        focusBorder: red[400],
        hoverBorder: red[400],
      },
      warning: {
        border: yellow[500],
        bg: yellow[100],
        ring: yellow[50],
        placeholder: yellow[600],
        focusBorder: yellow[300],
        hoverBorder: yellow[300],
      },
    },
  },
};

/** @type {import('tailwindcss').Config.theme} */
const darkTheme = {
  colors: {
    bg: slate[700],
    text: gray[50],
    design: {
      sidebar: slate[800],
      sortItem: green[700],
      sortItemBorder: black,
      popoverBox: gray[900],
    },
    button: {
      default: {
        bg: gray[600],
        hover: gray[500],
        active: gray[600],
        text: white,
      },
      primary: {
        bg: blue[600],
        text: white,
        hover: blue[500],
        active: blue[700],
      },
    },
    dialog: {
      border: gray[900],
      bg: slate[800],
      shadow: 'rgba(0, 0, 0, 0.03)',
    },
    toast: {
      default: gray[900],
      warn: yellow[700],
      error: red[800],
      border: white,
    },
    select: {
      button: {
        bg: gray[900],
        text: white,
        border: gray[600],
        disabled: black,
        disabledText: gray[500],
        hoverBorder: gray[500],
        hover: gray[800],
        openBorder: gray[500],
        open: black,
      },
      list: {
        border: gray[600],
        text: white,
      },
      item: {
        bg: black,
        text: white,
        hover: gray[600],
        highlighted: gray[600],
        selectedHover: blue[600],
        selected: blue[800],
        selectedHighlighted: blue[600],
      },
    },
    link: {
      text: blue[400],
      hover: blue[300],
      active: blue[200],
    },
    input: {
      default: {
        border: gray[600],
        bg: gray[900],
        placeholder: gray[700],
        focusBorder: gray[400],
        hoverBorder: gray[400],
      },
      error: {
        border: red[500],
        bg: red[900],
        ring: red[800],
        placeholder: red[600],
        focusBorder: red[600],
        hoverBorder: red[600],
      },
      warning: {
        border: yellow[500],
        bg: yellow[100],
        ring: yellow[50],
        placeholder: yellow[600],
        focusBorder: yellow[300],
        hoverBorder: yellow[300],
      },
    },
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', '../../packages/*/src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      green: colors.green,
      blue: colors.blue,
      neutral: colors.neutral,
      slate: colors.slate,
      gray: colors.gray,
      black: '#000',
      white: '#FFF',
      tooltip: colors.yellow[100],
      transprent: 'transparent',
    },
    borderWidth: {
      DEFAULT: '1px',
      '1/2': '0.125rem',
      1: '0.25rem',
    },
    extend: {
      boxShadow: {
        '1/2': '0.125rem 0.125rem 0',
        1: '0.25rem 0.25rem 0',
        toast: '0.125rem 0.125rem 0 rgba(0, 0, 0, 0.25)',
        menu: '0.25rem 0.25rem 0 rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        pixel: ['Fusion-Pixel-12', 'monospace'],
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('enabled', '&:not(:disabled)');
      addVariant('hover-enabled', '&:hover:not(:disabled)');
      addVariant('active-enabled', '&:active:not(:disabled)');
    }),

    themeSwapper({
      themes: [
        {
          name: 'base',
          selectors: [':root'],
          theme: lightTheme,
        },
        {
          name: 'dark',
          selectors: ['.dark'],
          theme: darkTheme,
        },
      ],
    }),
  ],
};
