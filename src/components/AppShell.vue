<script setup lang="ts">
const drawerVisible = ref(false)
</script>

<template>
  <AppToolbar @menu-button-click="drawerVisible = !drawerVisible" />
  <AppDrawer
    :foo="drawerVisible"
    @close="drawerVisible = false"
  />
  <slot />
</template>

<style scoped>

</style>
