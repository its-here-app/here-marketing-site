module.exports = {
  mode: "jit",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
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
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '4rem',      // 64px
      '7xl': '5rem',      // 80px
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
