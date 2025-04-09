import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], 
  resolve: { 
    alias: { 
      'react-barcode-reader': 'react-barcode-reader/dist/index.js' 
    } 
  }
})
