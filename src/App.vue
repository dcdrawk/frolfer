<script setup lang="ts">
</script>

<template>
  <main>
    <AppShell>
      <RouterView />
    </AppShell>
  </main>
</template>

<style>
html.app-dark {
  @apply bg-zinc-950;
}

html.app-light {
  @apply bg-slate-100;
}
</style>
