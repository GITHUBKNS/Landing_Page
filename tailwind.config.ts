import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        surface: '#11131a',
        text: '#e6eaf2',
        muted: '#9aa4b5',
        accent: '#6ee7ff'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: []
};

export default config;
