<script setup lang="ts">
const emit = defineEmits(['menuButtonClick'])
</script>

<template>
  <Toolbar
    class="border-b border-neutral-600 bg-emerald-700 sticky top-0 z-50 shadow"
    unstyled
  >
    <template
      #start
    >
      <div class="container mx-auto pr-4 flex items-center">
        <Button
          class="!bg-transparent !border-0 !rounded-none w-12 h-12 mr-2"
          icon="pi pi-bars"
          text
          plain
          @click="emit('menuButtonClick')"
        />
        <h3 class="text-xl font-semibold flex items-center drop-shadow">
          <img
            class="mr-2"
            src="/frolfer-logo.png"
            width="32"
          >
          Frolfer
        </h3>
      </div>
    </template>
  </Toolbar>
</template>
