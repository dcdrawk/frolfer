<script setup lang="ts">
import { MenuItem } from 'primevue/menuitem'

interface IAppBreadcrumbsProps {
  items: MenuItem[]
}

const { items } = defineProps<IAppBreadcrumbsProps>()

const home = ref({
  icon: 'pi pi-home',
  route: '/',
})
// const items = ref([
//   { label: 'Components' },
//   { label: 'Form' },
//   { label: 'InputText', route: '/inputtext' },
// ])
</script>

<template>
  <Breadcrumb
    :home="home"
    :model="items"
    class="mb-8"
  >
    <template #item="{ item, props }">
      <router-link
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a
          :href="href"
          v-bind="props.action"
          @click="navigate"
        >
          <span
            v-if="item.icon"
            :class="[item.icon, 'text-color']"
          />
          <span>
            {{ item.label }}
          </span>
        </a>
      </router-link>
      <a
        v-else
        :href="item.url"
        :target="item.target"
        v-bind="props.action"
      >
        <span class="text-surface-700 dark:text-surface-0">
          !Hackers Haven  {{ item.label }}
        </span>
      </a>
    </template>
  </Breadcrumb>
</template>

<style scoped>

</style>
