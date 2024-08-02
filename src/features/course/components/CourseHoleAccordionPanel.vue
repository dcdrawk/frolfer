<script setup lang="ts">
import { InputNumberInputEvent } from 'primevue/inputnumber'
import { CourseType } from '../types'
import { parBgColorMap } from '../utils/courseUtils'

const {
  hole,
  name,
} = defineProps<{
  distance?: string
  hole: number
  name?: string
  par: number
  courseType: CourseType
}>()

// const emit = defineEmits(['input-name', 'input-par', 'input-distance'])
const emit = defineEmits<{
  'input-name': [event: Event, hole: number],
  'input-distance': [event: Event, hole: number],
  'input-par': [event: InputNumberInputEvent, hole: number],
}>()
</script>

<template>
  <AccordionPanel
    :key="hole"
    :value="hole.toString()"
  >
    <AccordionHeader>
      <div class="w-full flex justify-between">
        <div>
          Hole {{ hole + 1 }}{{ name ? ` - ${name}` : '' }}
        </div>
        <div class="text-emerald-500 mr-4">
          <Tag
            :value="par ? `Par ${par}` : ''"
            :class="parBgColorMap[par]"
          />
        </div>
      </div>
    </AccordionHeader>

    <AccordionContent>
      <div class="grid gap gap-4 gap-y-8 grid-cols-2 md:max-w-[420px]">
        <FloatLabel class="col-span-2 mt-4">
          <label
            :for="`hole-${hole}-name`"
            class="mb-2 block"
          >
            Hole Name
          </label>
          <InputText
            :id="`hole-${hole}-name`"
            class="w-full"
            :model-value="name"
            @input="emit('input-name', $event, hole)"
          />
        </FloatLabel>

        <FloatLabel class="col-span-1">
          <InputText
            :id="`hole-${hole}-distance`"
            class="w-full"
            :model-value="distance"
            @input="emit('input-distance', $event, hole)"
          />
          <label
            :for="`hole-${hole}-distance`"
            class="mb-2 block"
          >
            Distance
          </label>
        </FloatLabel>

        <FloatLabel class="col-span-1">
          <label
            :for="`hole-${hole}-par`"
            class="mb-2 block"
          >
            Par
          </label>
          <InputNumber
            class="w-full"
            input-class="w-full"
            :input-id="`hole-${hole}-par`"
            :model-value="par"
            :show-buttons="courseType === CourseType.VARIABLE_PAR"
            :disabled="courseType !== CourseType.VARIABLE_PAR"
            button-layout="horizontal"
            :step="1"
            :min="2"
            :max="6"
            @input="emit('input-par', $event, hole)"
          />
        </FloatLabel>
      </div>
    </AccordionContent>
  </AccordionPanel>
</template>
