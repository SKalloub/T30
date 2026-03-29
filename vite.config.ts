import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/T30/', // أضف هذا السطر بالضبط (اسم المستودع بين سلاشين)
})