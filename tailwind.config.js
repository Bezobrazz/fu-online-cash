/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      md: "768px",
      lg: "1158px",
    },
    extend: {},
  },
  plugins: [
    ({ addComponents }) => {
      const paddingX = "16px";
      const paddingXLg = "15px";
      addComponents({
        ".container": {
          minWidth: "320px",
          maxWidth: "390px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: paddingX,
          paddingRight: paddingX,
          "@screen md": {
            paddingLeft: paddingX,
            paddingRight: paddingX,
            maxWidth: "768px",
          },
          "@screen lg": {
            paddingLeft: paddingXLg,
            paddingRight: paddingXLg,
            maxWidth: "1158px",
          },
        },
      });
    },
  ],
};
