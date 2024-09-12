/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Add this to include your index.html file
    "./src/**/*.{js,jsx,ts,tsx}", // Include all your source files
    "./components/**/*.{js,jsx,ts,tsx}", // Include all your source files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
