<script setup lang="ts">
import { CourseType } from '../types'

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

const emit = defineEmits(['input-name', 'input-par', 'input-distance'])
</script>

<template>
  <AccordionPanel
    :key="hole"
    :value="hole.toString()"
  >
    <AccordionHeader>
      <div class="w-full flex justify-between">
        <div>
          Hole {{ hole }}{{ name ? ` - ${name}` : '' }}
        </div>
        <div class="text-emerald-500 mr-4">
          {{ par ? `Par ${par}` : '' }}
        </div>
      </div>
    </AccordionHeader>

    <AccordionContent>
      <div class="flex items-center">
        <FloatLabel class="my-4 mr-4">
          <label
            :for="`hole-${hole}-name`"
            class="mb-2 block"
          >
            Hole Name
          </label>
          <InputText
            :id="`hole-${hole}-name`"
            :model-value="name"
            @input="emit('input-name', $event)"
          />
        </FloatLabel>

        <FloatLabel class="my-4 mr-4">
          <InputText
            :id="`hole-${hole}-distance`"
            :model-value="distance"
            @input="emit('input-distance', $event)"
          />
          <label
            :for="`hole-${hole}-distance`"
            class="mb-2 block"
          >
            Distance
          </label>
        </FloatLabel>

        <FloatLabel class="my-4 mr-4">
          <label
            :for="`hole-${hole}-par`"
            class="mb-2 block"
          >
            Par
          </label>
          <InputNumber
            :input-id="`hole-${hole}-par`"
            :model-value="par"
            :show-buttons="courseType === CourseType.VARIABLE_PAR"
            :disabled="courseType !== CourseType.VARIABLE_PAR"
            button-layout="horizontal"
            :step="1"
            :min="1"
            @input="emit('input-par', $event)"
          />
        </FloatLabel>
      </div>
    </AccordionContent>
  </AccordionPanel>
</template>
