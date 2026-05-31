/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0E27",
        panel: "#161B3D",
        card: "#1B2350",
        brand: "#D4202A",
        link: "#5B9DFF",
        credit: "#35C97D",
        muted: "#9AA3C0",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "16px",
      },
      maxWidth: {
        phone: "390px",
      },
    },
  },
  plugins: [],
};
