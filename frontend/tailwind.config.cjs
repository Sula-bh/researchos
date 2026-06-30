/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
      },
      // map ring and outline utilities to use the CSS variable
      ringColor: {
        DEFAULT: "var(--ring)",
      },
    },
  },
  plugins: [],
};
