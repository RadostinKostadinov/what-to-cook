/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        15: "3.75rem",
        18: "4.50rem",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
        lato: ["Lato"],
        garamond: ["Garamond"],
      },
      backgroundImage: (theme) => ({
        "app-gradientBg": `linear-gradient(to bottom, ${theme(
          "colors.app-yellow"
        )}, ${theme("colors.app-red")})`,
      }),
      boxShadow: {
        header: "0px 5px 8px 0px rgba(0, 0, 0, 0.25)",
      },
    },
    colors: {
      ...colors,
      "app-red": "#E76F51",
      "app-orange": "#F4A261",
      "app-yellow": "#E9C46A",
      "app-lightBlue": "#2A9D8F",
      "app-darkBlue": "#264653",
    },
  },
  plugins: [],
};
