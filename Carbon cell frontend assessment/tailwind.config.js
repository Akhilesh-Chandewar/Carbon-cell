/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "chateau-green": "#31b44d",
        "heavy-metal": "#1a1e1c",
        "mine-shaft": "#333333",
        "code-gray": "#0b0b0b",
        "green": "#2ab42a"
      }
    },
  },
  plugins: [],
}

