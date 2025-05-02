import tailwindcss from '@tailwindcss/vite'

export default {
  root: 'src/',
  base: '/img-strip-effect/',
  server: {
    host: true,
  },
  build: {
    outDir: '../docs',
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [
    tailwindcss(),
  ]
}
