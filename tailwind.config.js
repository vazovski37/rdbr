/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths to match your project structure
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        gainsboro: "#dbdbdb",
        lightslategray: "#808a93",
        dimgray: "#676e76",
        gray: "#021526",
        lightgray: "rgba(2, 21, 38, 0.4)",
        darkslategray: "#2d3648",
        orangered: "#f93b1d",
        orangeredHover: "#e5371a", // Hover effect for primary button
        forestgreen: "#228B22",  // Validation error color
      },
      fontFamily: {
        firago: ["FiraGO", "sans-serif"], // Ensure FiraGO is loaded in your project
        "helvetica-neue": ["Helvetica Neue", "sans-serif"], // Add custom fonts as needed
      },
      borderRadius: {
        "3xs": "10px",
        lg: "12px",
      },
      spacing: {
        "2.5": "10px",
        "3.5": "14px",
        "6": "24px",
        "22": "88px",
        "120": "480px",
      },
      fontSize: {
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
      boxShadow: {
        small: "5px 5px 4px rgba(0, 0, 0, 0.08)",
        md: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  corePlugins: {
    preflight: false, // Disable Preflight to avoid conflicting with global styles
  },
  plugins: [],
};
