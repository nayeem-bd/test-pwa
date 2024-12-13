import animate from 'tailwindcss-animate';
import shadcnuiTheme from './src/themes/theme.shadcnui';
import rootTheme from './src/themes/theme.root';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  safelist: ['dark'],
  prefix: '',
  content: [
    './pages/**/*.{js,jsx,vue}',
    './components/**/*.{js,jsx,vue}',
    './app/**/*.{js,jsx,vue}',
    './src/**/*.{js,jsx,vue}'
  ],
  plugins: [shadcnuiTheme, animate]
};
