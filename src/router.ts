import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import CourseListView from './views/Course/CourseListView.vue'
import CourseEditView from './views/Course/CourseEditView.vue'
import ScoreCardNewView from './views/ScoreCard/ScoreCardNewView.vue'
import ScoreCardView from './views/ScoreCard/ScoreCardView.vue'
import ScoreCardListView from './views/ScoreCard/ScoreCardListView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/course/list', component: CourseListView },
  { path: '/course/:id', component: CourseEditView },
  { path: '/score-card/new', component: ScoreCardNewView },
  { path: '/score-card/list', component: ScoreCardListView },
  { path: '/score-card/:id', component: ScoreCardView },
]

const router = createRouter({
  history: createWebHistory('/frolfer/'),
  routes,
})

export default router
