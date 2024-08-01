<script setup lang="ts">
import type { InputNumberInputEvent } from 'primevue/inputnumber'
import type { SelectChangeEvent } from 'primevue/select'
import type { ICourse, IHole } from '../types'
import { CourseType } from '../types'
import { Form } from 'vee-validate'
import { holeTemplate, courseTypeOptions } from '../utils/courseUtils'

const { course, title, submitLabel } = defineProps<{
  course?: ICourse
  submitLabel?: string
  title?: string
}>()

const emit = defineEmits<{
  submit: [ICourse]
}>()

const courseRef = toRef(course)

const { value: courseName, errorMessage, validate } = useField<string>('courseName', 'required')

watch(courseRef, (newValue) => {
  if (!course?.id) return
  if (newValue?.name) courseName.value = newValue.name
}, { immediate: true })

const numberOfHoles = toRef(course?.numberOfHoles ?? 9)
const courseType = toRef(course?.courseType ?? CourseType.PAR_THREE)
const holes = toRef<IHole[]>(course?.holes ?? new Array(numberOfHoles.value).fill({
  par: 3,
}).map(item => ({
  ...item,
})))

watch(numberOfHoles, (newValue, oldValue) => {
  if (!oldValue || !newValue) return

  if (newValue > oldValue) {
    holes.value = holes?.value
      .slice(0, newValue)
      .concat([...new Array(newValue - oldValue)
        .fill(holeTemplate, 0, newValue - oldValue)
        .map((hole => ({
          ...hole,
        })))]
      )
  } else {
    holes.value = holes.value
      .slice(0, newValue)
  }
}, {
  immediate: true,
})

interface CourseTypeChangeEvent extends SelectChangeEvent {
  value: CourseType
}

const handleCourseTypeInput = (event: CourseTypeChangeEvent) => {
  const { value } = event

  courseType.value = value

  holes.value = holes.value.map((hole) => {
    let par = hole.par

    switch (value) {
      case CourseType.PAR_FOUR:
        par = 4
        break
      case CourseType.PAR_THREE:
        par = 3
        break
      case CourseType.VARIABLE_PAR:
      default:
    }

    return {
      ...hole,
      par,
    }
  })
}

const handleHoleNameInput = (event: Event, holeNumber: number) => {
  const { value } = event.target as HTMLInputElement

  holes.value[holeNumber].name = value
}

const handleHoleDistanceInput = (event: Event, holeNumber: number) => {
  const { value } = event.target as HTMLInputElement

  holes.value[holeNumber].distance = value
}

const handleHoleParInput = (event: InputNumberInputEvent, holeNumber: number) => {
  holes.value[holeNumber].par = event.value as number
}

const validationSchema = {
  courseName: 'required',
}

const handleSubmit = async () => {
  const { valid } = await validate()

  if (valid) {
    emit('submit', {
      courseType: courseType.value,
      holes: holes.value,
      id: course?.id ?? '',
      name: courseName.value,
      numberOfHoles: numberOfHoles.value,
    })
  }
}
</script>

<template>
  <section class="container mx-auto">
    <Form
      :validation-schema="validationSchema"
      @submit="handleSubmit"
      @invalid-submit="handleSubmit"
    >
      <div class="max-w-[420px]">
        <h3
          v-if="title"
          class="text-3xl font-semibold mb-10"
        >
          {{ title }}
        </h3>
        <div class="grid grid-cols-2 gap-4">
          <FloatLabel class="w-full col-span-2">
            <label
              for="courseName"
            >
              Course Name*
            </label>
            <InputText
              id="courseName"
              v-model="courseName"
              name="courseName"
              fluid
              :invalid="!!errorMessage"
            />
            <small
              v-if="!!errorMessage"
              class="absolute -bottom-6 left-1 text-red-300"
            >
              Course Name is Required
            </small>
          </FloatLabel>

          <div class="col-span-1">
            <label
              id="course-type"
              class="block mb-2"
            >
              Course Type
            </label>
            <Select
              label-id="course-type"
              :model-value="courseType"
              :options="courseTypeOptions"
              option-label="text"
              option-value="value"
              fluid
              aria-labelledby="course-type"
              @change="handleCourseTypeInput"
            />
          </div>

          <div class="col-span-1">
            <label
              for="numberOfHoles"
              class="block mb-2"
            >
              Number of Holes
            </label>

            <InputNumber
              v-model="numberOfHoles"
              input-id="numberOfHoles"
              show-buttons
              button-layout="horizontal"
              :step="1"
              :min="1"
              :max="50"
              fluid
            />
          </div>
        </div>
      </div>

      <CourseHoleAccordion
        :holes="holes"
        :course-type="courseType"
        @input-name="(event, hole) => handleHoleNameInput(event, hole)"
        @input-par="(event, hole) => handleHoleParInput(event, hole)"
        @input-distance="(event, hole) => handleHoleDistanceInput(event, hole)"
      />

      <Button
        :label="submitLabel"
        type="submit"
      />
    </Form>
  </section>
</template>
