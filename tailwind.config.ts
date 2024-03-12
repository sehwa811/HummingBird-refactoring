import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        'dark-gradient': 'linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
      }
    },
  },
  plugins: [],
};
export default config;
