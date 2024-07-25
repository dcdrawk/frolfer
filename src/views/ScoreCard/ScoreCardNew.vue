
<script setup lang="ts">
import { InputNumberInputEvent } from 'primevue/inputnumber'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import { SelectChangeEvent } from 'primevue/select'

enum CourseType {
  PAR_THREE,
  PAR_FOUR,
  VARIABLE_PAR
}

const courseName = ref(undefined)
const courseType = ref<CourseType>(CourseType.PAR_THREE)
const numberOfHoles = ref(9)

const courseTypes = [{
  text: 'Par 3',
  value: CourseType.PAR_THREE
},
{
  text: 'Par 4',
  value: CourseType.PAR_FOUR
},
{
  text: 'Variable Par',
  value: CourseType.VARIABLE_PAR
}]

const holeTemplate = {
  par: 3
}

interface IHole {
  expanded?: boolean
  par: number
  name?: string
  distance?: string
}

interface IState {
  holes: IHole[]
}

const state = reactive<IState>({
  holes: new Array(numberOfHoles.value).fill({
    par: 3
  }).map(item => ({
    ...item
  }))
})

watch(numberOfHoles, (newValue, oldValue) => {
  if (!oldValue) return

  if (newValue > oldValue) {
    state.holes = state.holes
      .slice(0, newValue)
      .concat([...new Array(newValue - oldValue)
        .fill(holeTemplate, 0, newValue - oldValue).map((hole => ({
          ...hole
        })))]
      )
  } else {
    state.holes = state.holes
      .slice(0, newValue)
  }
}, {
  immediate: true
})

interface CourseTypeChangeEvent extends SelectChangeEvent {
  value: CourseType
}

const handleCourseTypeInput = (event: CourseTypeChangeEvent) => {
  const {
    value
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
      par
    }
  })
}

const handleHoleNameInput = (event: Event, holeNumber: number) => {
  const {
    value
  } = event.target as HTMLInputElement

  state.holes[holeNumber].name = value
}

const handleHoleDistanceInput = (event: Event, holeNumber: number) => {
  const {
    value
  } = event.target as HTMLInputElement

  state.holes[holeNumber].distance = value
}

const handleHoleParInput = (event: InputNumberInputEvent, holeNumber: number) => {
  state.holes[holeNumber].par = event.value as number
}
// const handleHoleDistanceInput = (event: InputNumberInputEvent, holeNumber: number) => {
//   state.holes[holeNumber].distance = event.value as number
// }
</script>

<template>
  <section class="container mx-auto py-12">
    <h2 class="text-4xl font-semibold mb-8">
      New Score Card
    </h2>

    <Message severity="info">
      Your Course List is empty, start by adding a New Course.
    </Message>

    <form class="mt-8">
      <div class=" max-w-[420px]">
        <h3 class="text-2xl font-semibold mb-8">
          New Course
        </h3>
        <div class="flex flex-wrap">
          <FloatLabel class="mb-8 w-full">
            <label
              for="courseName"
            >
              Course Name
            </label>
            <InputText
              id="courseName"
              v-model="courseName"
              fluid
            />
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
                id="numberOfHoles"
                v-model="numberOfHoles"
                show-buttons
                button-layout="horizontal"
                :step="1"
                :min="1"
                fluid
              />
            </div>

            <div class="mb-4 w-1/2">
              <label class="block mb-2">
                Course Type
              </label>
              <Select
                id="course-type"
                :model-value="courseType"
                :options="courseTypes"
                option-label="text"
                option-value="value"
                fluid
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
        <AccordionPanel
          v-for="i in state.holes.length"
          :key="i"
          :value="i.toString()"
        >
          <AccordionHeader>
            <div class="w-full flex justify-between">
              <div>
                Hole {{ i }}{{ state.holes[i - 1].name ? ` - ${state.holes[i - 1].name}` : '' }}
              </div>
              <div class=" text-emerald-500 mr-4">
                {{ state.holes[i - 1].par ? `Par ${state.holes[i - 1].par}` : '' }}
              </div>
            </div>
          </AccordionHeader>

          <AccordionContent>
            <div class="flex items-center">
              <FloatLabel class="my-4 mr-4">
                <label
                  :for="`hole-${i}-name`"
                  class="mb-2 block"
                >
                  Hole Name
                </label>
                <InputText
                  :id="`hole-${i}-name`"
                  :model-value="state.holes[i - 1].name"
                  @input="handleHoleNameInput($event, i - 1)"
                />
              </FloatLabel>

              <FloatLabel class="my-4 mr-4">
                <InputText
                  :id="`hole-${i}-distance`"
                  :model-value="state.holes[i - 1].distance"
                  @input="handleHoleDistanceInput($event, i - 1)"
                />
                <label
                  :for="`hole-${i}-distance`"
                  class="mb-2 block"
                >
                  Distance
                </label>
              </FloatLabel>

              <FloatLabel class="my-4 mr-4">
                <label
                  :for="`hole-${i}-par`"
                  class="mb-2 block"
                >
                  Par
                </label>
                <InputNumber
                  :id="`hole-${i}-par`"
                  :model-value="state.holes[i - 1].par"
                  :show-buttons="courseType === CourseType.VARIABLE_PAR"
                  :disabled="courseType !== CourseType.VARIABLE_PAR"
                  button-layout="horizontal"
                  :step="1"
                  :min="1"
                  @input="handleHoleParInput($event, i - 1)"
                />
              </FloatLabel>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>

      <Button label="Start Scoring!" />
    </form>
  </section>
</template>

<style scoped>

</style>