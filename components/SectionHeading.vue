<template>
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ title }}</h2>
    <NuxtLink v-if="viewAllLink" :to="viewAllLink" class="text-primary-600 dark:text-primary-400 hover:underline">
      View All
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  viewAllLink: {
    type: String,
    default: ''
  }
})
</script>
