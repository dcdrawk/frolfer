<script setup lang="ts">
import { useCoursesStore } from '../../course/store/useCoursesStore'
import { useScoreCardStore } from '../store/useScoreCardStore'

const route = useRoute()
const scoreCardStore = useScoreCardStore()
const { activeId: activeScoreCardId, setActiveId: setActiveScoreCardId } = scoreCardStore
const { activeScoreCard } = storeToRefs(scoreCardStore)

const coursesStore = useCoursesStore()
const { activeId: activeCourseId, setActiveId: setActiveCourseId } = coursesStore
const { activeCourse } = storeToRefs(coursesStore)

const routeId = route.params.id as string

if (activeScoreCardId !== routeId) {
  setActiveScoreCardId(routeId)
}

if (activeScoreCard && activeCourseId !== activeScoreCard.value?.courseId) {
  setActiveCourseId(activeScoreCard.value?.courseId ?? '')
}
</script>

<template>
  <h2 class="text-3xl font-semibold mb-4">
    Score Card
  </h2>

  <h3
    v-if="activeCourse && activeScoreCard"
    class="text-2xl font-semibold mb-4"
  >
    {{ activeCourse.name }}
    <span class="ml-2 opacity-60">
      {{ activeScoreCard.date }}
    </span>
  </h3>

  <ScoreCardTable />
</template>
