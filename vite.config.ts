import { defineConfig } from 'vite';

export default defineConfig({
    base: "./",
    build: {
        assetsInlineLimit: 0,
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser'],
                }
            }
        }

    },
});
