/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": "#181818",
        "darker": "#141414",
        "new-red": "#CA2B16",
        "new-green": "#20D553",
        "purple": "#460E95",
        "light": "#F5F5F5",
      },
    },
  },
  plugins: [],
}