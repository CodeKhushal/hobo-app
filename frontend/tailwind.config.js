/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        bgColor: "rgba(5, 150, 105)",
      },
      backgroundOpacity: {
        x: "1",
      },
    },
    container: {
      padding: {
        sm: "6rem",
        md: "10rem",
      }
    },
  },
  plugins: [],
};
