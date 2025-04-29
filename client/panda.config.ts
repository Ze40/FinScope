import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./app/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      //Responsive
      breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      tokens: {
        //Colors
        colors: {
          side: { value: "#EBEBF5" },
          main: { value: "#F2F2FA" },
          primary: { value: "#14121F" },
          secondary: { value: "#150AA9" },
          ghost: { value: "#56565E" },
          ghostLighter: { value: "{colors.gray.200}" },
          white: { value: "#FFFFFF" },
        },

        shadows: {
          around: {
            value: {
              offsetX: 0,
              offsetY: 0,
              blur: 5,
              spread: 5,
              color: "{colors.side}",
            },
          },
        },
      },

      semanticTokens: {
        //Шрифты
        fontSizes: {
          sm: {
            value: {
              base: "12px",
              sm: "13px",
              md: "14px",
              lg: "15px",
              xl: "16px",
              "2xl": "18px",
            },
          },
          md: {
            value: {
              base: "16px",
              sm: "18px",
              md: "20px",
              lg: "22px",
              xl: "24px",
              "2xl": "28px",
            },
          },
          lg: {
            value: {
              base: "24px",
              sm: "28px",
              md: "32px",
              lg: "34px",
              xl: "36px",
              "2xl": "38px",
            },
          },
          xl: {
            value: {
              base: "24px",
              sm: "28px",
              md: "32px",
              lg: "36px",
              xl: "40px",
              "2xl": "40px",
            },
          },
        },

        //Радиус
        radii: {
          main: {
            value: {
              base: "20px",
              sm: "25px",
              md: "30px",
              lg: "35px",
              xl: "40px",
              "2xl": "50px",
            },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "/src/styles/styled-system",
});
