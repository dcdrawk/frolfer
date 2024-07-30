import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import ScoreCardNewView from './views/ScoreCard/ScoreCardNewView.vue'
import ScoreCardView from './views/ScoreCard/ScoreCardView.vue'
import ScoreCardList from './views/ScoreCard/ScoreCardListView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/score-card/new', component: ScoreCardNewView },
  { path: '/score-card/list', component: ScoreCardList },
  { path: '/score-card/:id', component: ScoreCardView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
