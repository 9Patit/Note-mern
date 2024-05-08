/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //สีที่ใช้ในproject
      colors: {
        primary: "#2B85FF",
        secondary: "#EF86#E",
      }
    },
  },
  plugins: [],
}

