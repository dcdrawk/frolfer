
<script setup lang="ts">
const courseName = ref(undefined)
const numberOfHoles = ref(9)

const computedNumberOfHoles = computed(() => {
  return Math.max(numberOfHoles.value, 0)
})

const holeTemplate = {
  expanded: true,
  par: 3,
  name: '',
  distance: '',
  disanceType: 'feet'
}

</script>

<template>
  <section class="container mx-auto mt-10">
    <h2 class=" text-4xl  font-semibold">
      New Score Card
    </h2>

    <form class="mt-8">
      <FloatLabel class="mb-8">
        <label
          for="courseName"
        >
          Course Name
        </label>
        <InputText
          id="courseName"
          v-model="courseName"
        />
      </FloatLabel>

      <div class="mb-4">
        <label
          for="numberOfHoles"
          class="mb-2 block"
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
        >
          <template #incrementicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
      </div>

      <div
        v-for="i in computedNumberOfHoles"
        :key="i"
      >
        <Panel
          toggleable
          class="mb-4"
        >
          <template #header>
            <div class="flex items-center gap-2">
              <p class="text-xl">
                Hole {{ i }}
              </p>
            </div>
          </template>
          <template #toggleicon="{ collapsed }">
            <Button
              :icon="collapsed ? 'pi pi-angle-down' : 'pi pi-angle-up'"
              severity="secondary"
              rounded
              text
            />
          </template>
          <div class="mb-4">
            <label
              for="numberOfHoles"
              class="mb-2 block"
            >
              Par
            </label>
            <InputNumber
              id="numberOfHoles"
              v-model="numberOfHoles"
              show-buttons
              button-layout="horizontal"
              :step="1"
              :min="1"
            >
              <template #incrementicon>
                <span class="pi pi-plus" />
              </template>
              <template #decrementicon>
                <span class="pi pi-minus" />
              </template>
            </InputNumber>
          </div>
        </Panel>
      </div>
    </form>
  </section>
</template>

<style scoped>

</style>