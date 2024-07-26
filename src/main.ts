import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './vee-validate'

import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
import 'primeicons/primeicons.css'

const app = createApp(App)
const pinia = createPinia()

app
  .use(PrimeVue, {
    theme: {
      preset: Lara,
    },
    ripple: true,
  })
  .use(router)
  .use(pinia)
  .mount('#app')

// app.mount('#app')
