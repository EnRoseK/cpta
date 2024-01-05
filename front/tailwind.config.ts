import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: '#eeeeee',
        description: '#9AA5B3',
        primary: '#3764EB',
        dark: '#142441',
        secondary: '#FEE100',
      },
      fontFamily: {
        sans: [
          'Arimo',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      fontSize: {
        small: [
          '14px',
          {
            lineHeight: 'normal',
          },
        ],
        sectionTitle: [
          '28px',
          {
            lineHeight: 'normal',
          },
        ],
        date: [
          '14px',
          {
            lineHeight: '16px',
          },
        ],
      },
      boxShadow: {
        card: '0px 4px 10px 0px rgba(0, 0, 0, 0.06)',
      },
      spacing: {
        15: '60px',
        25: '100px',
      },
      backgroundImage: {
        pageHeaderOne:
          'linear-gradient(97deg, #FFF 0%, rgba(255, 255, 255, 0.46) 77.6%, rgba(202, 217, 232, 0.00) 89.58%, rgba(255, 255, 255, 0.00) 100%)',
        pageHeaderTwo:
          'linear-gradient(97deg, #FFF 0%, rgba(255, 255, 255, 0.46) 77.6%, rgba(202, 217, 232, 0.00) 89.58%, rgba(255, 255, 255, 0.00) 100%)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        modalIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        modalOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn .2s ease forwards',
        fadeOut: 'fadeOut .2s ease forwards',
        modalIn: 'modalIn .2s ease forwards',
        modalOut: 'modalOut .2s ease forwards',
      },
    },
  },
  plugins: [],
};
export default config;
