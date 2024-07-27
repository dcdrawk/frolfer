<script setup lang="ts">
import { useCoursesStore } from '../../course/store/useCoursesStore'
import { useScoreCardStore } from '../store/useScoreCardStore'

// const route = useRoute()
const scoreCardStore = useScoreCardStore()
// const { activeId: activeScoreCardId, setActiveId: setActiveScoreCardId } = scoreCardStore
const { activeScoreCard } = storeToRefs(scoreCardStore)

const coursesStore = useCoursesStore()
// const { activeId: activeCourseId, setActiveId: setActiveCourseId } = coursesStore
const { activeCourse } = storeToRefs(coursesStore)

// const scoreData = computed(() => {
//   if (!activeScoreCard.value) {
//     return {}
//   }

//   return activeScoreCard.value.scores
//   //
// })

// console.log(scoreData)
</script>

<template>
  <DataTable
    v-if="activeScoreCard && activeCourse"
    :value="Object.values(activeScoreCard.scores)"
    edit-mode="cell"
  >
    <!-- @cell-edit-complete="onCellEditComplete" -->
    <Column
      v-for="col in activeCourse.numberOfHoles"
      :key="col"
      :index="col"
      :header="`Hole ${col.toString()}`"
    >
      <template #body="{ index }">
        {{ index }}
        <!-- {{ field === 'price' ? formatCurrency(data[field]) : data[field] }} -->
      </template>
      <!-- <template #editor="{ data, field }">
        <template v-if="field !== 'price'">
          <InputText
            v-model="data[field]"
            autofocus
            fluid
          />
        </template>
        <template v-else>
          <InputNumber
            v-model="data[field]"
            mode="currency"
            currency="USD"
            locale="en-US"
            autofocus
            fluid
          />
        </template>
      </template> -->
    </Column>
  </DataTable>
</template>

<style scoped>

</style>
