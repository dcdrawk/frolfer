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

    <Button
      as="router-link"
      to="/score-card/new"
      label="Start a Score Card"
    />

    <span class="block my-4">
      Or
    </span>

    <Button
      as="router-link"
      to="/score-card/list"
      label="View Score Cards"
      severity="secondary"
    />

    <!-- <h2>
      Select from your
    </h2> -->
  </section>
</template>

<style scoped></style>
