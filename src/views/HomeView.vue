<script setup lang="ts">
</script>

<template>
  <section class="container mx-auto text-center pt-20">
    <p>
      Welcome to
    </p>
    <h1 class="text-5xl font-semibold my-5">
      Frolfer 🥏
    </h1>
    <p
      class="mb-5"
    >
      Your Friendly Neighbourhood<br>
      <strong>
        Disc Golf Score Card
      </strong>
    </p>

    <div class="flex flex-col w-[300px] mx-auto">
      <Button
        as="router-link"
        to="/score-card/list"
        label="My Score Cards"
        severity="secondary"
        class="mb-4"
      />
      <Button
        as="router-link"
        to="/score-card/list"
        label="My Courses"
        severity="secondary"
        class="mb-4"
      />
      <Button
        as="router-link"
        to="/score-card/new"
        label="New Score Card"
      />
    </div>
  </section>
</template>

<style scoped></style>
