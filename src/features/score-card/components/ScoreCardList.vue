<script setup lang="ts">
import router from '../../../router'
import { useCoursesStore } from '../../course/store/useCoursesStore'
import { useScoreCardStore } from '../store/useScoreCardStore'
import { IScoreCard, ScoreCardSortOption } from '../types'

const { scoreCards, delete: deleteScoreCard } = useScoreCardStore()
const { courses } = useCoursesStore()

const selectedCard = ref<IScoreCard | null>(null)

const menu = ref()
const items = ref([
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      if (!selectedCard.value) return

      deleteScoreCard(selectedCard.value.id)
    },
  },
])

const onScoreCardRightClick = (event: Event, scoreCard: IScoreCard) => {
  menu.value.show(event)
  selectedCard.value = scoreCard
}

type ISortDirection = 'asc' | 'desc'

const sortBy = ref<ScoreCardSortOption>(ScoreCardSortOption.DATE)
const sortDirection = ref<ISortDirection>('desc')
const sortIcon = computed(() => sortDirection.value === 'asc' ? 'pi pi-sort-amount-up-alt' : 'pi pi-sort-amount-down-alt')

const toggleSortDirection = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
}

const sortByOptions = [{
  text: 'Date',
  value: ScoreCardSortOption.DATE,
}, {
  text: 'Course Name',
  value: ScoreCardSortOption.COURSE_NAME,
}, {
  text: 'Number of Holes',
  value: ScoreCardSortOption.NUMBER_OF_HOLES,
}, {
  text: 'Number of Players',
  value: ScoreCardSortOption.NUMBER_OF_PLAYERS,
}]

const scoreCardsSorted = computed(() => {
  return scoreCards.slice(0).sort((scoreCardA, scoreCardB) => {
    let compareA: number | string = 0
    let compareB: number | string = 0

    switch (sortBy.value) {
      case ScoreCardSortOption.DATE:
        compareA = new Date(scoreCardA.date).getTime()
        compareB = new Date(scoreCardB.date).getTime()
        break

      case ScoreCardSortOption.COURSE_NAME:
        compareA = scoreCardA.name
        compareB = scoreCardB.name
        break

      case ScoreCardSortOption.NUMBER_OF_HOLES:
        compareA = scoreCardA.holes.length
        compareB = scoreCardB.holes.length
        break

      case ScoreCardSortOption.NUMBER_OF_PLAYERS:
        compareA = scoreCardA.scores.length
        compareB = scoreCardB.scores.length
        break

      default:
        return 0
    }

    if (typeof compareA === 'number' && typeof compareB === 'number') {
      return sortDirection.value === 'asc'
        ? compareA - compareB
        : compareB - compareA
    }

    if (typeof compareA === 'string' && typeof compareB === 'string') {
      return sortDirection.value === 'asc'
        ? compareA.localeCompare(compareB)
        : compareB.localeCompare(compareA)
    }

    return 0
  })
})
</script>

<template>
  <h1 class="text-3xl font-semibold mb-4">
    Score Cards
  </h1>

  <section
    v-if="scoreCards"
    class="relative"
  >
    <div class="flex justify-between flex-wrap items-end gap-2 mb-4">
      <Button
        label="New Score Card"
        as="router-link"
        class="w-full sm:w-auto"
        to="/score-card/new"
      />

      <div class="flex items-end w-full sm:w-auto">
        <span
          class="mt-4 w-full sm:-mt-4 sm:flex sm:justify-end sm:items-center"
        >
          <label class="block text-muted-color text-xs sm:text-base sm:mr-2 mb-2 sm:mb-0">
            Sort By
          </label>
          <Select
            v-model="sortBy"
            :options="sortByOptions"
            option-label="text"
            option-value="value"
            class="!rounded-r-none sm:w-[205px]"
            fluid
          />
        </span>
        <Button
          :icon="sortIcon"
          class="w-full !rounded-l-none"
          severity="secondary"
          @click="toggleSortDirection"
        />
      </div>
    </div>

    <Message
      v-if="!scoreCards.length"
      class="mb-4 w-full"
    >
      You don't have any Score Cards yet. Create one by clicking "New Score Card".
    </Message>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <ScoreCardListCard
        v-for="scoreCard in scoreCardsSorted"
        :key="scoreCard.id"
        :score-card="scoreCard"
        :courses="courses"
        :on-right-click="(event) => onScoreCardRightClick(event, scoreCard)"
        @click="router.push(`/score-card/${scoreCard.id}`)"
      />

      <ContextMenu
        ref="menu"
        :model="items"
      />
    </div>
  </section>
</template>
