import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The Day-1 markdown content lives in /content (outside src) and is imported
// via import.meta.glob('.../*.md', { query: '?raw' }). It is inside the project
// root, so Vite's default fs.allow covers it.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
