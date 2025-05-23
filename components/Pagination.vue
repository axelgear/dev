<template>
  <div class="flex justify-center mt-8">
    <nav class="flex items-center space-x-2">
      <button 
        @click="onPageChange(currentPage - 1)" 
        :disabled="currentPage === 1" 
        class="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <template v-for="page in visiblePages" :key="page">
        <button 
          v-if="page !== '...'"
          @click="onPageChange(page)" 
          :class="[
            'px-3 py-2 rounded-md border',
            currentPage === page 
              ? 'bg-primary-600 text-white border-primary-600' 
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          ]"
        >
          {{ page }}
        </button>
        <span 
          v-else
          class="px-3 py-2 text-gray-500 dark:text-gray-400"
        >
          ...
        </span>
      </template>
      
      <button 
        @click="onPageChange(currentPage + 1)" 
        :disabled="currentPage === totalPages" 
        class="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['page-change'])

const visiblePages = computed(() => {
  const pages = []
  const maxVisiblePages = 5
  
  if (props.totalPages <= maxVisiblePages) {
    // Show all pages if total is less than max visible
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)
    
    // Calculate start and end of visible pages
    let start = Math.max(2, props.currentPage - 1)
    let end = Math.min(props.totalPages - 1, props.currentPage + 1)
    
    // Adjust if at the beginning
    if (props.currentPage <= 3) {
      end = Math.min(props.totalPages - 1, 4)
    }
    
    // Adjust if at the end
    if (props.currentPage >= props.totalPages - 2) {
      start = Math.max(2, props.totalPages - 3)
    }
    
    // Add ellipsis if needed at the beginning
    if (start > 2) {
      pages.push('...')
    }
    
    // Add visible page numbers
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    // Add ellipsis if needed at the end
    if (end < props.totalPages - 1) {
      pages.push('...')
    }
    
    // Always show last page
    pages.push(props.totalPages)
  }
  
  return pages
})

const onPageChange = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}
</script>
