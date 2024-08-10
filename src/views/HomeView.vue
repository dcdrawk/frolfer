<script setup lang="ts">
</script>

<template>
  <section class="container mx-auto text-center pt-20">
    <p>
      Welcome to
    </p>
    <h1 class="text-5xl font-semibold my-6 flex flex-row justify-center items-center mx-auto max-w-[300px]">
      <img
        src="/frolfer-logo.png"
        width="64"
        class="block h-auto mr-6 drop-shadow-md"
      >
      <span>
        Frolfer
      </span>
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
        label="Score Cards"
        severity="secondary"
        class="mb-4"
      />
      <Button
        as="router-link"
        to="/course/list"
        label="Courses"
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
