/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Scan all relevant files
  theme: {
    extend: {
      colors: {
        gray: "rgba(2, 21, 38, 0.5)", // Custom gray color
        white: "#fff", // Custom white color
        blueviolet: "#9747ff", // CTA border color
        lightslategray: "#808a93", // CTA background color
        orangered: "#f93b1d", // Orangered for primary state
        orangeredHover: "#df3014", // Orangered hover state
        gainsboro: '#DCDCDC', // Cus
        forestgreen: "#45A849"
      },
      fontFamily: {
        firago: ["FiraGO", "sans-serif"], // Custom font family with a fallback
      },
      fontSize: {
        sm: "14px", // Font size for small buttons/text
        base: "16px", // Font size for base/medium text
        inherit: "inherit", // Added inherit option for font size
      },
      spacing: {
        2.5: "0.625rem", // Spacing for padding
        3.5: "0.875rem", // Additional spacing if needed
        4: "1rem", // Spacing for larger padding
        22: "5.5rem", // Icon size
      },
      borderRadius: {
        lg: "0.5rem", // Large border radius
        xl: "0.625rem", // Extra large border radius for large buttons
      },
      borderWidth: {
        1: "1px", // Custom border width for 1px
      },
      height: {
        47: "47px", // Custom height for large CTA
      },
    },
  },
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles (optional)
  },
};
