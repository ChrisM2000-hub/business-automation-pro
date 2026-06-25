import { defineConfig } from '@tanstack/start/vite'
import { TanStackStartVitePlugin } from '@tanstack/start/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss/vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  vite: {
    plugins: [
      TanStackStartVitePlugin(),
      react(),
      tailwindcss(),
      tsConfigPaths(),
    ],
  },
  server: {
    entry: 'src/server.ts',
  },
})
