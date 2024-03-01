/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: ["disabled"],
      textColor: ["disabled"],
      colors: {
        primary: "#ed0973",
        secondary: "#221f52",
      },
    },
  },
  plugins: [],
};
