<script setup lang="ts">
const drawerVisible = ref(false)
</script>

<template>
  <AppToolbar @menu-button-click="drawerVisible = true" />
  <AppDrawer
    :visible="drawerVisible"
    @close="drawerVisible = false"
  />
  <slot />
</template>

<style scoped>

</style>
