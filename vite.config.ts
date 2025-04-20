import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // Optional: Specify the port for local development
    },
    build: {
        outDir: 'dist', // Default output directory
    },
});