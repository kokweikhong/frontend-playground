/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,ts,jsx,js}", "./components/**/*.{tsx,ts,jsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
