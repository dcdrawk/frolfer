<script setup lang="ts">
// import { useCoursesStore } from '../../features/course/store/useCoursesStore'
// import { useScoreCardStore } from '../../features/score-card/store/useScoreCardStore'

// const { activeCourse } = useCoursesStore()
// const { activeScoreCard } = useScoreCardStore()

// const breadCrumbLabel = computed(() => {
//   return activeScoreCard?.date
// })
</script>

<template>
  <section class="container mx-auto py-8 px-4">
    <!-- <AppBreadcrumbs
      :items="[
        { label: 'Score Cards', route: '/score-card/list' },
        { label: breadCrumbLabel }
      ]"
    /> -->
    <ScoreCardEdit />
  </section>
</template>

<style scoped>

</style>
