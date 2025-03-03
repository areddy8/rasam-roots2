/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        agrandir: ['Agrandir', 'system-ui', '-apple-system', 'sans-serif'],
        agrandirBold: ['Agrandir Bold', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
