<script setup lang="ts">
// import router from '../../../router'
import { useCoursesStore } from '../../course/store/useCoursesStore'
// import { useScoreCardStore } from '../store/useScoreCardStore'

// const { scoreCards, delete: deleteScoreCard } = useScoreCardStore()
const { courses } = useCoursesStore()

// const selectedCard = ref<IScoreCard | null>(null)
// const selectedCardIndex = ref<number | null>(null)

const menu = ref()
const items = ref([
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    // command: () => {
    //   if (!selectedCard.value) return

    //   deleteScoreCard(selectedCard.value.id)
    // },
  },
])

// const onImageRightClick = (event: Event, scoreCard: IScoreCard, index: number) => {
//   menu.value.show(event)
//   event.stopPropagation()
//   event.preventDefault()
//   selectedCard.value = scoreCard
//   selectedCardIndex.value = index
// }
</script>

<template>
  <h1 class="text-3xl font-semibold mb-4">
    Courses
  </h1>

  <section v-if="courses">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <CourseInfoCard
        v-for="course in courses"
        :key="course.id"
        :course="course"
      />

      <ContextMenu
        ref="menu"
        :model="items"
      />
    </div>
  </section>
</template>

<style scoped>

</style>
