/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0F1117",
        cardBg: "#1C202B",
        cardHover: "#252B3A",
        textPrimary: "#FFFFFF",
        textSecondary: "#A0A6B5",
        accent: "#F5C518",
        accentHover: "#E5B817",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      screens: {
        'xs': '480px',
      }
    },
  },
  plugins: [],
}
