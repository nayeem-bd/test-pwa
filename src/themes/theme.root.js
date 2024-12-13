import plugin from 'tailwindcss/plugin';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

export default plugin(function ({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({
    ':root': { ...newVars }
  });
});
