<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
    <h3 class="text-lg font-semibold mb-4">Filters</h3>
    
    <div class="space-y-6">
      <div>
        <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
        <div class="relative">
          <input 
            id="search"
            v-model="filters.search" 
            type="text" 
            placeholder="Search by title or author" 
            class="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div>
        <label for="genre" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Genres</label>
        <div class="relative">
          <select 
            id="genre"
            v-model="filters.genre" 
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Genres</option>
            <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
          </select>
        </div>
      </div>
      
      <div>
        <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
        <div class="relative">
          <select 
            id="status"
            v-model="filters.status" 
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="hiatus">Hiatus</option>
          </select>
        </div>
      </div>
      
      <div>
        <label for="sort" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
        <div class="relative">
          <select 
            id="sort"
            v-model="filters.sort" 
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="latest">Latest Update</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rating</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>
      
      <div class="flex space-x-4">
        <button 
          @click="applyFilters" 
          class="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Apply Filters
        </button>
        <button 
          @click="resetFilters" 
          class="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useNovelsStore } from '~/stores/novels'

const emit = defineEmits(['filter'])
const novelsStore = useNovelsStore()

const genres = computed(() => novelsStore.getAllGenres())

const filters = reactive({
  search: '',
  genre: '',
  status: '',
  sort: 'latest'
})

const applyFilters = () => {
  emit('filter', { ...filters })
}

const resetFilters = () => {
  filters.search = ''
  filters.genre = ''
  filters.status = ''
  filters.sort = 'latest'
  emit('filter', { ...filters })
}
</script>
