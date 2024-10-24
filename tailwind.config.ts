import { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#007BFF",
        primaryDark: "#0056b3",
        secondary: "#FFA500",
        secondaryDark: "#b37300",
        lightGray: "#F7F7F7",
        mediumGray: "#B0B0B0",
        actionAmber: "#FFBF00",
        actionRed: "#FF3B30",
        error: "#DC3545",
        success: "#28A745",
        textPrimary: "#333333",
        textSecondary: "#666666",
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
        secondary: ["Roboto", "sans-serif"],
      },
      fontSize: {
        h1: "48px",
        h2: "36px",
        h3: "28px",
        body: ["16px", "18px"],
        button: ["14px", "16px"],
      },
      borderRadius: {
        DEFAULT: "0.375rem",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#007BFF",
          secondary: "#FFA500",
          accent: "#FFBF00",
          neutral: "#F7F7F7",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};

export default config;
