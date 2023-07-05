/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",    
  ],
  purge: ['./src/**/*.html', './src/**/*.ts'],
  theme: {
    extend: {
      screens: {
        us: "340px",
        xs: "440px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
