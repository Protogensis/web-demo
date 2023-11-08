import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base:'./web-demo/',
  
  preview: {
    port: 8080,
  },
  build:{
    rollupOptions:{
      input:{
        main: resolve(__dirname, 'index.html'),
        helloweb: resolve(__dirname, 'views/helloweb.html'),
        xhxtx: resolve(__dirname, 'views/xhxtx.html'),
        dzjtx: resolve(__dirname, 'views/dzjtx.html'),
        tbfgtx: resolve(__dirname, 'views/tbfgtx.html'),
        tpkp: resolve(__dirname, 'views/tpkp.html'),
        gdsctx: resolve(__dirname, 'views/gdsctx.html'),
        klsflbj: resolve(__dirname, 'views/klsflbj.html'),
        echarttest: resolve(__dirname, 'views/echarttest.html'),
        threetest: resolve(__dirname, 'views/threetest.html'),
        gltfloader: resolve(__dirname, 'views/gltfloader.html'),
        sheenchair: resolve(__dirname, 'views/sheenchair.html'),
        litiqiu: resolve(__dirname, 'views/litiqiu.html'),
        nhdzt: resolve(__dirname, 'views/nhdzt.html'),
      }
    }
  }
  
})
