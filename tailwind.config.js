/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      scrollbar: {
        width: "10px",
        thumb: "#4a5568",
        track: "#1a202c",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    function ({ addUtilities }) {
      const newUtilities = {
        ".custom-scrollbar::-webkit-scrollbar": {
          width: "1px",
          height: "1px",
        },
        ".custom-scrollbar::-webkit-scrollbar-track": {
          background: "#DC1C27 #100F0F",
        },
        ".custom-scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: "#DC1C27 ",
          borderRadius: "1px",
          border: "3px solid #1a202c",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
