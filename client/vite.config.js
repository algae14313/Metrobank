import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '192.168.10.15',
        port: '80'
<<<<<<< HEAD
        // host: '192.168.1.7',
        // port: '80'
=======
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
        // host: 'localhost',
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
