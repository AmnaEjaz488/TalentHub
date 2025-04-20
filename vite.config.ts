// filepath: c:\Users\user\Desktop\bootcamp\Challenges\challenge 13\TalentHub\vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: Number(process.env.PORT) || 3000, // Convert PORT to a number or default to 3000
        host: '0.0.0.0', // Bind to all network interfaces
    },
    build: {
        outDir: 'dist', // Default output directory
    },
});