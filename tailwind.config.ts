import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '320px',
      sm: '540px',
      md: '720px',
      lg: '920px',
      xl: '1040px',
    },
    colors: {
      white: 'var(--white)',
      martinique: 'var(--martinique)',
      bunker: 'var(--bunker)',
      carnatrion: 'var(--carnatrion)',
      alabaster: 'var(--alabaster)',
      mirage: 'var(--mirage)',
      'purple-heart': 'var(--purple-heart)',
      'medium-purple': 'var(--medium-purple)',
      'steel-gray': 'var(--steel-gray)',
      'link-water': 'var(--link-water)',
      'amethyst-smoke': 'var(--amethyst-smoke)',
      'wild-blue-yonder': 'var(--wild-blue-yonder)',
      'sweet-pink': 'var(--sweet-pink)',
      'gun-powder': 'var(--gun-powder)',
      'mulled-wine': 'var(--mulled-wine)',
    },
    fontSize: {
      xs: ['0.8125rem', { lineHeight: '15px', letterSpacing: '-0.1px' }],
      sm: ['0.9375rem', { lineHeight: '15px', letterSpacing: '-0.25px' }],
      lg: ['0.9375rem', { lineHeight: '24px', letterSpacing: '-0.25px' }],
      xl: ['1.5rem', { lineHeight: '22px', letterSpacing: '-0.75px' }],
    },
    extend: {},
  },
  plugins: [],
};
export default config;
