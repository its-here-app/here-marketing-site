module.exports = {
  mode: "jit",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        "in-out-quint": "cubic-bezier(0.23, 1, 0.32,1)",
        "in-out-image": "cubic-bezier(0.65, 0.05, 0.36, 1)",
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        green: "#00FF47",
        gray: {
          100: "#",
          200: "#",
          300: "#DFDFDF",
          400: "#",
          500: "#757575",
          600: "#",
          700: "#",
          900: "#",
        },
      },
      // leading
      lineHeight: {
        100: "1em",
        105: "1.05em",
        107: "1.07em",
        110: "1.1em",
        120: "1.2em",
        125: "1.25em",
        150: "1.5em",
      },
      //tracking
      letterSpacing: {
        "1": "-0.01em",
        "3": "-0.03em",
        "4": "-0.04em",
        "6": "-0.06em",
      },
    },
    fontFamily: {
      'sans': ['Golos', 'sans-serif'],
      'serif': ['Crimson', 'serif'],
    },
    fontSize: {
      'xs': '.75rem',     // 12px
      'sm': '.875rem',    // 14px
      'base': '1rem',     // 16px
      'lg': '1.125rem',   // 18px
      'xl': '1.25rem',    // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.75rem', // 28px
    },
    screens: {
      'sm': '390px',
      'md': '768px',
      'lg': '1440px',
      'xl': '1728px',
      'xxl': '1920px',
    },
    extends: {
      colors: {
        'neon': '#00ff00',
      }
    }
  },
  plugins: [],
}
