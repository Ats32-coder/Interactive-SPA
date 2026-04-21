import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repositoryName = 'Interactive-SPA';

export default defineConfig({
  base: `/${repositoryName}/`,
  plugins: [react()],
});
