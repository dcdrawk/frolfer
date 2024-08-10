<script setup lang="ts">
import { useCoursesStore } from '../../course/store/useCoursesStore'
import { CourseSortOption, ICourse } from '../types'
import { courseSortByOptions } from '../utils'
const { courses, delete: deleteCourse } = useCoursesStore()
const router = useRouter()

const selectedCourse = ref<ICourse | null>(null)

const menu = ref()
const items = ref([
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      if (!selectedCourse.value) return

      deleteCourse(selectedCourse.value.id)
    },
  },
])

const handleCourseClick = (course: ICourse) => {
  router.push(`/course/${course.id}`)
}

const handleCourseRightClick = (event: Event, course: ICourse) => {
  menu.value.show(event)
  selectedCourse.value = course
}

type ISortDirection = 'asc' | 'desc'

const sortBy = ref<CourseSortOption>(CourseSortOption.COURSE_NAME)
const sortDirection = ref<ISortDirection>('desc')
const sortIcon = computed(() => sortDirection.value === 'asc' ? 'pi pi-sort-amount-up-alt' : 'pi pi-sort-amount-down-alt')

const toggleSortDirection = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
}

const coursesSorted = computed(() => {
  return courses.slice(0).sort((scoreCardA, scoreCardB) => {
    let compareA: number | string = 0
    let compareB: number | string = 0

    switch (sortBy.value) {
      case CourseSortOption.COURSE_NAME:
        compareA = scoreCardA.name
        compareB = scoreCardB.name
        break

      case CourseSortOption.COURSE_TYPE:
        compareA = scoreCardA.courseType
        compareB = scoreCardB.courseType
        break

      case CourseSortOption.NUMBER_OF_HOLES:
        compareA = scoreCardA.holes.length
        compareB = scoreCardB.holes.length
        break

      default:
        return 0
    }

    if (typeof compareA === 'number' && typeof compareB === 'number') {
      return sortDirection.value === 'asc'
        ? compareA - compareB
        : compareB - compareA
    }

    if (typeof compareA === 'string' && typeof compareB === 'string') {
      return sortDirection.value === 'asc'
        ? compareA.localeCompare(compareB)
        : compareB.localeCompare(compareA)
    }

    return 0
  })
})
</script>

<template>
  <h1 class="text-3xl font-semibold mb-4">
    Courses
  </h1>

  <section v-if="courses">
    <AppSortBySelect
      v-model="sortBy"
      :icon="sortIcon"
      :options="courseSortByOptions"
      @toggle-sort-direction="toggleSortDirection"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <CourseListCard
        v-for="course in coursesSorted"
        :key="course.id"
        v-ripple
        :course="course"
        clickable
        @click="handleCourseClick(course)"
        @right-click="(event, course) => handleCourseRightClick(event, course)"
      />

      <ContextMenu
        ref="menu"
        :model="items"
      />
    </div>
  </section>
</template>
