<script setup lang="ts">
import { InputNumberInputEvent } from 'primevue/inputnumber'
import { useScoreCardStore } from '../store/useScoreCardStore'
import { IScore } from '../types'
import { MenuItem } from 'primevue/menuitem'
import { DataTablePassThroughMethodOptions } from 'primevue/datatable'

const scoreCardStore = useScoreCardStore()
const { activeScoreCard } = storeToRefs(scoreCardStore)

const activeRow = ref<number | null>(null)

const scoreData = computed(() => {
  if (!activeScoreCard.value) {
    return []
  }

  return activeScoreCard.value.scores
})

const scoreColumns = computed(() => {
  if (!activeScoreCard.value?.scores.length) {
    const columns = activeScoreCard.value?.holes.map<string>((_, index) => {
      return String(index + 1)
    }).sort((a, b) => parseInt(a) - parseInt(b))

    columns?.push('total')
    columns?.unshift('name')
    return columns
  }

  const keys = Object.keys(activeScoreCard.value?.scores[0]).sort((a, b) => parseInt(a) - parseInt(b))

  return keys.sort((a, b) => {
    if (a === 'name') return -1
    if (b === 'name') return 1
    if (a === 'total') return 1
    if (b === 'total') return -1
    return parseInt(a) - parseInt(b)
  })
})

const handleScoreInput = (event: InputNumberInputEvent, rowIndex: number, holeNumber: string) => {
  if (!activeScoreCard.value) return

  activeScoreCard.value.scores[rowIndex][holeNumber] = event.value as number
}

const handleNameInput = (event: Event, rowIndex: number, holeNumber: string) => {
  if (!activeScoreCard.value) return

  const { value } = event.target as HTMLInputElement

  activeScoreCard.value.scores[rowIndex][holeNumber] = value
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

const activeScoreCardParTotal = computed(() => {
  if (!activeScoreCard.value) return 0

  return activeScoreCard.value.holes.reduce((accumulator, currentValue) => accumulator + currentValue.par, 0)
})

const defaultScore = computed(() => {
  const scoreObject: IScore = {
    name: '',
    total: null,
  }

  if (!activeScoreCard.value) return scoreObject

  for (let i = 1; i < activeScoreCard.value.holes.length + 1; i++) {
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
  menuRefs.value.forEach((menu: MenuItem) => {
    menu.hide()
  })
  menuRefs.value[rowIndex]?.toggle(event)
  activeRow.value = rowIndex
}

const getHeaderClass = (col: string) => {
  switch (col) {
    case ('name'):
      return 'capitalize min-w-[140px] lg:min-w-[250px] !bg-[--p-datatable-header-cell-background] !border-0 !border-r !border-[--p-datatable-row-background]'
    case ('total'):
      return 'min-w-[125px]'
    default:
      return 'min-w-[95px]'
  }
}

const getBodyClass = (col: string) => {
  switch (col) {
    case 'name':
      return 'outline outline-2 outline-[--p-datatable-header-cell-background] max-w-[140px] truncate'
    case 'total':
      return 'pointer-events-none'
    default:
      return 'md:max-w-[64px]'
  }
}

</script>

<template>
  <DataTable
    v-if="activeScoreCard"
    :value="scoreData"
    show-gridlines
    scrollable
    style="border-collapse: separate;"
    :pt="{
      table: { style: 'border-collapse: separate;' },
      column: {
        bodycell: ({ state }: DataTablePassThroughMethodOptions) => ({
          class: [{ 'pt-0 pb-0': state['d_editing'] }]
        })
      }
    }"
    class="-mx-4 md:mx-0"
    striped-rows
    edit-mode="cell"
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
            v-if="activeScoreCard"
            class="block text-muted-color"
          >
            Par {{ activeScoreCard.holes[parseInt(col) - 1]?.par }}
          </span>
        </span>
        <span
          v-else
          class="min-w-[50px]"
        >
          Total
          <span
            v-if="activeScoreCard"
            class="block text-muted-color"
          >
            Par {{ activeScoreCardParTotal }}
          </span>
        </span>
      </template>
      <template #body="{ data, field, index: rowIndex }">
        <span
          v-if="col !== 'total'"
          :class="{
            'block text-center': col !== 'name'
          }"
        >
          {{ data[field] }}
          <span
            v-if="col === 'name' && !data[field]"
            class="text-muted-color"
          >
            Player Name
          </span>
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
            class="-mr-2 ml-4 pointer-events-auto"
            size="small"
            @click.stop="handleMenuClick($event, rowIndex)"
          />
          <Menu
            :id="`overlay_menu_${rowIndex}`"
            ref="menuRefs"
            popup
            :model="menuItems"
          />
        </span>
      </template>

      <template #editor="{ data, field, index: rowIndex }">
        <InputText
          v-if="col === 'name'"
          v-model="data[field]"
          autofocus
          class="!block min-w-[100px] max-w-[200px] -my-2"
          fluid
          @input="handleNameInput($event, rowIndex, col.toString())"
        />
        <span
          v-else-if="col !== 'total'"
          class="block max-w-[100px]"
        >
          <InputNumber
            v-model="data[field]"
            class="!block min-w-[50px] max-w-[100px] !static -my-2"
            input-class="text-center !w-full"
            fluid
            :pt="{
              pcInput: {style: 'text-align: center'}
            }"
            @input="handleScoreInput($event, rowIndex, col.toString())"
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
  </div>
</template>
