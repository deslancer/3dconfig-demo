/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "dark-gray": "#1c1c1c",
        "light-blue": "#306FC4",
        "light-cyan": "#24A8BB",
        "dark-bg": "#15151a",
        "dark-surface": "#1f1f24",
        "dark-text": "#e5e5e5",
      },
      backgroundColor: {
        'light-theme': '#ffffff',
        'dark-theme': '#15151a',
        'light-surface': '#ffffff',
        'dark-surface': '#1f1f24',
      },
      textColor: {
        'light-theme': '#1c1c1c',
        'dark-theme': '#e5e5e5',
      }
    },
  },
  plugins: [],
  important: true,
};
