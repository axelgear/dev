<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" @click.self="$emit('close')">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Search Novels</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="mb-6">
        <div class="relative">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search by title, author, or genre..." 
            class="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            @input="search"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div v-if="searchResults.length > 0" class="max-h-96 overflow-y-auto">
        <div v-for="novel in searchResults" :key="novel.id" class="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
          <NuxtImg 
            :src="novel.coverImage" 
            :alt="novel.title" 
            class="w-16 h-24 object-cover rounded-md"
            width="64"
            height="96"
          />
          <div class="ml-4">
            <NuxtLink :to="`/novel/${novel.id}`" class="font-medium text-primary-600 dark:text-primary-400 hover:underline" @click="$emit('close')">
              {{ novel.title }}
            </NuxtLink>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ novel.author }}</p>
            <div class="flex flex-wrap mt-1">
              <span v-for="genre in novel.genres.slice(0, 3)" :key="genre" class="text-xs bg-gray-200 dark:bg-gray-600 rounded-full px-2 py-1 mr-1 mb-1">
                {{ genre }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="searchQuery && !isLoading" class="text-center py-8">
        <p class="text-gray-500 dark:text-gray-400">No novels found matching your search.</p>
      </div>
      
      <div v-else-if="isLoading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 dark:border-gray-600 border-t-primary-500"></div>
        <p class="mt-2 text-gray-500 dark:text-gray-400">Searching...</p>
      </div>
      
      <div v-else class="text-center py-8">
        <p class="text-gray-500 dark:text-gray-400">Type to search for novels.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useNovelsStore } from '~/stores/novels'

const emit = defineEmits(['close'])
const novelsStore = useNovelsStore()

const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)

// Simple debounce function
let debounceTimer = null
const debouncedSearch = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    if (searchQuery.value.length >= 2) {
      isLoading.value = true
      searchResults.value = novelsStore.searchNovels(searchQuery.value)
      isLoading.value = false
    } else {
      searchResults.value = []
    }
  }, 300)
}

const search = () => {
  debouncedSearch()
}

// Clear search when modal is closed
const closeModal = () => {
  searchQuery.value = ''
  searchResults.value = []
}

onMounted(() => {
  watch(() => emit('close'), () => {
    closeModal()
  })
})
</script>
