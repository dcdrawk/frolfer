
<script setup lang="ts">
const courseName = ref(undefined)
</script>

<template>
  <section class="container mx-auto mt-10">
    <h2 class=" text-4xl  font-semibold">
      New Score Card
    </h2>

    <form class="mt-8">
      <div>
        <label
          id="test"
          for="username"
        >Course Name</label>
        <InputText
          id="username"
          v-model="courseName"
          aria-describedby="username-help"
        />
      </div>
    </form>
  </section>
</template>

<style scoped>

</style>