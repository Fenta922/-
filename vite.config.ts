import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base: './' 让构建产物可部署在任意子路径（GitHub Pages / 任意静态托管 / 本地 file:// 打开）
export default defineConfig({
  base: './',
  plugins: [react()],
})
