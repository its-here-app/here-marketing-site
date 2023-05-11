/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    screens: {
      'sm': '390px',
      'md': '768px',
      'lg': '1440px',
      'xl': '1728px',
    },
  },
  plugins: [],
}
