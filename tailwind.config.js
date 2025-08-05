/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#1c1c1c",
        "light-blue": "#306FC4",
        "light-cyan": "#24A8BB"
      },
    },
  },
  plugins: [],
  important: true,
};
