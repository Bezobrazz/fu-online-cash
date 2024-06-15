/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      md: "768px",
      lg: "1440px",
    },
    extend: {},
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    ({ addComponents }) => {
      const paddingX = "16px";
      const paddingXLg = "100px";
      addComponents({
        ".container": {
          width: "100%",
          height: "90vh",
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
            maxWidth: "1440px",
          },
        },
      });
    },
    daisyui,
  ],
  daisyui: {
    themes: ["light"],
  },
};
