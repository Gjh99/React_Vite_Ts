import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from "vite-plugin-eslint";
import {resolve} from 'path';
import {ViteMockOptions, viteMockServe} from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
    server:{
      proxy:{
          '/api':{
              target:'http://localhost:5000',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
          }
      }
    },
    plugins: [
        react(),
        eslintPlugin({
            cache: false
        }),
        viteMockServe({
            mockPath: 'src/mocks', // mock数据存放的文件夹路径
            localEnabled: true, // 是否启用本地mock
            prodEnabled: false, // 是否在生产环境中启用mock
            injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
        } as ViteMockOptions),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@ant-design/icons-svg': resolve(__dirname, 'node_modules/@ant-design/icons-svg')
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
