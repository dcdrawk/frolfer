import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
import 'primeicons/primeicons.css'


const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Lara
  },
  ripple: true
}).use(router).mount('#app')


// app.mount('#app')
