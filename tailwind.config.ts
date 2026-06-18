import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        premium: '0 24px 80px -30px rgba(2, 132, 199, 0.45)',
        glow: '0 0 0 1px rgba(34, 211, 238, 0.14), 0 24px 80px -35px rgba(34, 211, 238, 0.45)',
      },
      backgroundImage: {
        'hero-grid':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
