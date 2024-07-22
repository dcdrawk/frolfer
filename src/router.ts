import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import ScoreCardNew from './views/ScoreCard/ScoreCardNew.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/score-card/new', component: ScoreCardNew }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router