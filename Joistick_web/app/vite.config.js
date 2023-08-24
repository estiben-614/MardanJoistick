import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{

    host:true,
    //Puerto que se usará en docker
    port:8001,

    watch:{
      //Solo si se usa windows y hot reload no funciona. Sincroniza cambios en tiempo real
      usePolling:true
    } 
  }
})
