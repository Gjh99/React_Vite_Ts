import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from "vite-plugin-eslint";
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        eslintPlugin({
            cache: false
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    css: {
        postcss: './postcss.config.cjs',
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,  // 确保支持 Less 中的 JavaScript 语法
            },
        },
    }
})
