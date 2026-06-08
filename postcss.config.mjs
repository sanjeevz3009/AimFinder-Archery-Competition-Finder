// postcss.config.mjs
// Tailwind v4 uses the dedicated PostCSS plugin instead of the old tailwindcss plugin
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
