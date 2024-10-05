import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sansita': ['Sansita', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        "primary-purple": "#5927E5",
        "secondary-purple": "#835DF0",
        "primary-black": "#383839",
        "light-gray":"#F1F1F1",
        "dark-gray":"#E2E2E2"
      },
      boxShadow: {
        custom: "0 0 10px rgba(0, 0, 0, 0.3)",
      },
      fontSize: {
        "2.5xl": "27px",
      },
    },
  },
  plugins: [],
};
export default config;
