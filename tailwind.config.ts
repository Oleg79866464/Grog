import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        premium: '0 24px 80px -30px rgba(2, 132, 199, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
