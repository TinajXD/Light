import  THREE  from 'three'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['THREE'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'THREE',
        },
      },
    },
  },
})