import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
    
      // global imports to register
      imports: [
        // presets
        'vue'
        // 'vue-router',
        // custom
        // {
        //   '@vueuse/core': [
        //     // named imports
        //     'useMouse', // import { useMouse } from '@vueuse/core',
        //     // alias
        //     ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
        //   ],
        // },
        // example type import
        // {
        //   from: 'vue-router',
        //   imports: ['RouteLocationRaw'],
        //   type: true,
        // },
      ],
    
      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      // dts: './auto-imports.d.ts',
      dts: true,
    
      // Auto import inside Vue template
      vueTemplate: true,
    
      // Inject the imports at the end of other imports
      injectAtEnd: true,

      // resolvers: [
      //   PrimeVueResolver()
      // ]
    
      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: true,
        filepath: './eslintrc-auto-import.mjs', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    Components({
      dts: true,

      resolvers: [
        PrimeVueResolver()
      ]
    })
  ]
})
