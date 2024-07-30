<script setup lang="ts">
import { InputNumberInputEvent } from 'primevue/inputnumber'
import { useCoursesStore } from '../../course/store/useCoursesStore'
import { useScoreCardStore } from '../store/useScoreCardStore'
import { IScore } from '../types'
import { MenuItem } from 'primevue/menuitem'

const scoreCardStore = useScoreCardStore()
const { activeScoreCard } = storeToRefs(scoreCardStore)

const coursesStore = useCoursesStore()
const { activeCourse } = storeToRefs(coursesStore)

const activeRow = ref<number | null>(null)

const scoreData = computed(() => {
  if (!activeScoreCard.value) {
    return []
  }

  return activeScoreCard.value.scores
})

const scoreColumns = computed(() => {
  if (!activeScoreCard.value?.scores.length) {
    const columns = activeCourse.value?.holes.map<string>((_, index) => {
      return String(index + 1)
    })

    columns?.push('total')
    columns?.unshift('name')
    return columns
  }

  const keys = Object.keys(activeScoreCard.value?.scores[0])

  return keys.sort((a, b) => {
    if (a === 'name') return -1
    if (b === 'name') return 1
    if (a === 'total') return 1
    if (b === 'total') return -1
    return a.localeCompare(b)
  })
})

const handleScoreInput = (event: InputNumberInputEvent, rowIndex: number, holeNumber: string) => {
  if (!activeScoreCard.value) return

  activeScoreCard.value.scores[rowIndex][holeNumber] = event.value as number
}

const getRowTotal = (rowData: IScore) => {
  let total = 0

  for (const key in rowData) {
    if (key === 'name' || key === 'total') continue
    if (typeof rowData[key] === 'number') {
      total += rowData[key]
    }
  }

  return total
}

const activeCourseParTotal = computed(() => {
  if (!activeCourse.value) return 0

  return activeCourse.value.holes.reduce((accumulator, currentValue) => accumulator + currentValue.par, 0)
})

const defaultScore = computed(() => {
  const scoreObject: IScore = {
    name: '',
    total: null,
  }

  if (!activeCourse.value) return scoreObject

  for (let i = 1; i < activeCourse.value.numberOfHoles + 1; i++) {
    scoreObject[i] = null
  }
  return scoreObject
})

const handleAddRow = () => {
  if (!activeScoreCard.value) return

  activeScoreCard.value.scores.push({ ...defaultScore.value })
}

const menuRefs = ref<MenuItem>([])

const menuItems = ref([
  {
    label: 'Delete Row',
    icon: 'pi pi-trash',
    command: () => {
      if (!activeRow.value && activeRow.value !== 0) return
      if (window.confirm('Are you sure you want to delete this row?')) {
        activeScoreCard.value?.scores.splice(activeRow.value, 1)
      }
    },
  },
])

const handleMenuClick = (event: Event, rowIndex: number) => {
  menuRefs.value[rowIndex].toggle(event)
  activeRow.value = rowIndex
}

const getHeaderClass = (col: string) => {
  switch (col) {
    case ('name'):
      return 'min-w-[150px] lg:min-w-[250px] !bg-[--p-datatable-header-cell-background] !border-0 !border-r !border-[--p-datatable-row-background]'
    case ('total'):
      return 'min-w-[125px]'
    default:
  }
}

const getBodyClass = (col: string) => {
  switch (col) {
    case 'name':
      return 'outline outline-2 outline-[--p-datatable-header-cell-background]'
    default:
  }
}

</script>

<template>
  <DataTable
    v-if="activeScoreCard && activeCourse"
    :value="scoreData"
    show-gridlines
    scrollable
    style="border-collapse: separate;"
    :pt="{
      table: { style: 'border-collapse: separate;' },
    }"
    class="-mx-4"
    striped-rows
  >
    <Column
      v-for="(col) in scoreColumns"
      :key="col"
      :index="col"
      :field="col.toString()"
      class="text-center"
      :frozen="col === 'name'"
      :header-class="getHeaderClass(col)"
      :body-class="getBodyClass(col)"
    >
      <template #header>
        <span v-if="col === 'name'">
          {{ col }}
        </span>
        <span
          v-else-if="col !== 'total'"
          class=""
        >
          Hole {{ col }}
          <span
            v-if="activeCourse"
            class="block text-muted-color"
          >
            Par {{ activeCourse.holes[parseInt(col) - 1]?.par }}
          </span>
        </span>
        <span
          v-else
          class="w-[50px]"
        >
          Total
          <span
            v-if="activeCourse"
            class="block text-muted-color"
          >
            Par {{ activeCourseParTotal }}
          </span>
        </span>
      </template>
      <template #body="{ data, field, index: rowIndex }">
        <InputText
          v-if="col === 'name'"
          v-model="data[field]"
          autofocus
          class="block min-w-[100px]"
          fluid
        />
        <span
          v-else-if="col !== 'total'"
        >
          <InputNumber
            v-model="data[field]"
            class="block min-w-[50px] m-auto !static"
            input-class="text-center"
            fluid
            :pt="{
              pcInput: {style: 'text-align: center'}
            }"
            @input="handleScoreInput($event, rowIndex, col.toString())"
          />
        </span>
        <span
          v-else
          class="flex flex-row items-center justify-between"
        >
          {{ getRowTotal(data) }}
          <Button
            type="button"
            icon="pi pi-ellipsis-v"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            severity="secondary"
            text
            class="-mr-2 ml-4"
            @click="handleMenuClick($event, rowIndex)"
          />
          <Menu
            :id="`overlay_menu_${rowIndex}`"
            :ref="`menuRefs`"
            popup
            :model="menuItems"
          />
        </span>
      </template>
    </Column>
  </DataTable>

  <div class="flex flex-row gap-4">
    <Button
      label="Add Row"
      class="mt-4 block"
      severity="secondary"
      @click="handleAddRow"
    />
    <Button
      label="Complete Game"
      class="mt-4 block"
      @click="handleAddRow"
    />
  </div>
</template>

<style scoped>

</style>
