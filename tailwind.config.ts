import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        borderGreen: "#12464E",
        backgroundGreen: "#02191D",
        textGreen: '#24A0B5'
      },
    },
  },
  plugins: [],
} satisfies Config;
