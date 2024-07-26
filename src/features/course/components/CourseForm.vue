<script setup lang="ts">
import { InputNumberInputEvent } from 'primevue/inputnumber'
import { SelectChangeEvent } from 'primevue/select'
import type { IState } from '../types'
import { CourseType } from '../types'
import { Form, useField } from 'vee-validate'

// const courseName = ref(undefined)
const courseType = ref<CourseType>(CourseType.PAR_THREE)
const numberOfHoles = ref(9)

const courseTypeOptions = [{
  text: 'Par 3',
  value: CourseType.PAR_THREE,
},
{
  text: 'Par 4',
  value: CourseType.PAR_FOUR,
},
{
  text: 'Variable Par',
  value: CourseType.VARIABLE_PAR,
}]

const holeTemplate = {
  par: 3,
}

const state = reactive<IState>({
  holes: new Array(numberOfHoles.value).fill({
    par: 3,
  }).map(item => ({
    ...item,
  })),
})

watch(numberOfHoles, (newValue, oldValue) => {
  if (!oldValue) return

  if (newValue > oldValue) {
    state.holes = state.holes
      .slice(0, newValue)
      .concat([...new Array(newValue - oldValue)
        .fill(holeTemplate, 0, newValue - oldValue).map((hole => ({
          ...hole,
        })))]
      )
  } else {
    state.holes = state.holes
      .slice(0, newValue)
  }
}, {
  immediate: true,
})

interface CourseTypeChangeEvent extends SelectChangeEvent {
  value: CourseType
}

const handleCourseTypeInput = (event: CourseTypeChangeEvent) => {
  const {
    value,
  } = event

  courseType.value = value

  state.holes = state.holes.map((hole) => {
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
  const {
    value,
  } = event.target as HTMLInputElement

  state.holes[holeNumber].name = value
}

const handleHoleDistanceInput = (event: Event, holeNumber: number) => {
  const {
    value,
  } = event.target as HTMLInputElement

  state.holes[holeNumber].distance = value
}

const handleHoleParInput = (event: InputNumberInputEvent, holeNumber: number) => {
  state.holes[holeNumber].par = event.value as number
}

const { value: courseName, errorMessage, validate } = useField<string>('courseName', 'required')

const validationSchema = {
  courseName: 'required',
}

const handleSubmit = async () => {
  const { valid } = await validate()

  if (valid) {
    // console.log('valid!')
  }
  // console.log()
}
</script>

<template>
  <section class="container mx-auto">
    <Form
      class="mt-8"
      :validation-schema="validationSchema"
      @submit="handleSubmit"
      @invalid-submit="handleSubmit"
    >
      <!-- @invalid-submit="handleSubmit" -->
      <!-- @submit="handleSubmit" -->
      <div class=" max-w-[420px]">
        <h3 class="text-2xl font-semibold mb-8">
          New Course
        </h3>
        <div class="flex flex-wrap">
          <FloatLabel class="mb-8 w-full">
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

          <div class="w-full flex gap-4">
            <div class="mb-4 w-1/2">
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
                fluid
              />
            </div>

            <div class="mb-4 w-1/2">
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
          </div>
        </div>
      </div>

      <Divider />

      <Accordion
        :value="['0']"
        multiple
        class="mb-8"
      >
        <CourseHoleAccordionPanel
          v-for="i in state.holes.length"
          :key="i"
          :hole="i"
          :par="state.holes[i - 1].par"
          :course-type="courseType"
          :distance="state.holes[i - 1].distance"
          :name="state.holes[i - 1].name"
          @input-name="handleHoleNameInput($event, i - 1)"
          @input-par="handleHoleParInput($event, i - 1)"
          @input-distance="handleHoleDistanceInput($event, i - 1)"
        />
      </Accordion>

      <Button
        label="Start Scoring!"
        type="submit"
      />
    </Form>
  </section>
</template>../../../components/course/course-types../../../components/course/course-types
