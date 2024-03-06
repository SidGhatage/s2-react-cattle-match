module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        white: { A700: "#ffffff", A700_3f: "#ffffff3f" },
        indigo: {
          200: "#96a5db",
          900: "#10277b",
          "200_01": "#95a4da",
          "900_01": "#0f277b",
          "900_79": "#0f277b79",
          "900_4f": "#00006d4f",
        },
        gray: {
          200: "#ebebeb",
          300: "#e9e8da",
          400: "#c7c7c7",
          600: "#797979",
          "600_01": "#8f8952",
          "300_02": "#dadada",
          "300_01": "#eae8db",
        },
        green: { 50: "#efeddd" },
        blue_gray: { 100: "#d2d2d2", 600: "#4c5d77", 900: "#333333" },
        pink: { 300: "#fb5392" },
        blue: { 50: "#e5eaff" },
        light_blue: { 50: "#e8f8fe" },
        black: { 900: "#000000" },
        lime: { 50: "#faf3eb" },
        red: { 50: "#faeeec" },
      },
      boxShadow: {
        xs: "0px 0px  50px 0px #fb53927f",
        sm: "0px 10px  50px 0px #0f267b56",
        md: "0px 10px  50px -20px #00000026",
      },
      fontFamily: { publicsans: "Public Sans", nunitosans: "Nunito Sans", merriweather: "Merriweather" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
