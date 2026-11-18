import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://arkantsabit123.github.io',
  base: '/Ark-Coffee-Eatery/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
