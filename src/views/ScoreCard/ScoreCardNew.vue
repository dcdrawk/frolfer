<script setup lang="ts">
</script>

<template>
  <section class="container mx-auto py-12">
    <h2 class="text-4xl font-semibold mb-8">
      New Score Card
    </h2>

    <Message severity="info">
      Your Course List is empty. Start by adding a New Course.
    </Message>

    <CourseForm />
    <!-- <form class="mt-8">
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
    </form> -->
  </section>
</template>

<style scoped>

</style>
