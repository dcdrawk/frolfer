<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  open: boolean
}>()

const visible = ref(false)
const emit = defineEmits(['close'])

watch(props, (newValue) => {
  if (newValue.open) {
    visible.value = true
  }
})

const handleHide = () => {
  emit('close')
}
</script>

<template>
  <Drawer
    v-model:visible="visible"
    class="!border-0"
    dismissable
    @hide="handleHide"
  >
    <template #container="{ closeCallback }">
      <div class="flex flex-col h-full">
        <div class="bg-emerald-700 flex items-center justify-between px-6 shrink-0">
          <span class="flex items-center justify-start drop-shadow">
            <img
              class="mr-2"
              src="/frolfer-logo.png"
              width="32"
            >
            <span class="font-semibold text-xl text-white">
              Frolfer
            </span>
          </span>
          <span class="-mr-6">
            <Button
              class="!border-0 !rounded-none !bg-transparent text-white h-12"
              type="button"
              icon="pi pi-times"
              plain
              text
              @click="closeCallback"
            />
          </span>
        </div>
        <ul class="list-none p-0 m-0 overflow-hidden">
          <li>
            <router-link
              v-ripple
              class="flex items-center cursor-pointer p-4 text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
              to="/"
              @click="closeCallback"
            >
              <i class="pi pi-home mr-3" />
              <span class="font-medium">
                Home
              </span>
            </router-link>
          </li>
          <li>
            <router-link
              v-ripple
              class="flex items-center cursor-pointer p-4 text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
              to="/score-card/list"
              @click="closeCallback"
            >
              <i class="pi pi-table mr-3" />
              <span class="font-medium">
                Score Cards
              </span>
            </router-link>
          </li>
          <li>
            <router-link
              v-ripple
              class="flex items-center cursor-pointer p-4 text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
              to="/course/list"
              @click="closeCallback"
            >
              <i class="pi pi-flag-fill mr-3" />
              <span class="font-medium">
                Courses
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </template>
  </Drawer>
</template>
