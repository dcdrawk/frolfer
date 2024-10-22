<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const emit = defineEmits(['menuButtonClick'])

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})

const toggleDark = useToggle(isDark)

const darkModeToggleIcon = computed(() => {
  return isDark.value ? 'pi pi-moon' : 'pi pi-sun'
})
</script>

<template>
  <Toolbar
    class="bg-emerald-600 sticky top-0 z-50 shadow"
    unstyled
  >
    <template
      #start
    >
      <div class="container mx-auto flex items-center justify-between">
        <span class="flex">
          <Button
            class="!bg-transparent !border-0 !rounded-none w-12 h-12 mr-2 !text-white"
            icon="pi pi-bars"
            text
            plain
            @click="emit('menuButtonClick')"
          />
          <h3 class="text-xl font-semibold flex items-center drop-shadow text-white">
            <img
              class="mr-2"
              src="/frolfer-logo.png"
              width="32"
            >
            Frolfer
          </h3>
        </span>
        <span>
          <Button
            class="!bg-transparent !border-0 !rounded-none w-12 h-12 !text-white"
            :icon="darkModeToggleIcon"
            text
            plain
            @click="() => toggleDark()"
          />
        </span>
      </div>
    </template>
  </Toolbar>
</template>
