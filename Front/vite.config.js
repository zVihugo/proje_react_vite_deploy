import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server:{
    key: fs.readFileSync("../Back/certificado/key.pem"),	
    cert: fs.readFileSync("../Back/certificado/cert.pem"),
  },
  port:5173
})
