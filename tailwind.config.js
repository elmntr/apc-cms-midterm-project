/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F1EB",
        "cream-dark": "#EDE8E0",
        brown: {
          DEFAULT: "#3D3425",
          light: "#5C4D3A",
          dark: "#2A241A",
        },
        tan: {
          DEFAULT: "#B8A88A",
          light: "#C9BC9F",
          dark: "#9A8B6F",
        },
        gold: "#B8A06E",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
