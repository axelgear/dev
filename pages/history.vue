<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Reading History</h1>
      <button 
        v-if="history.length > 0"
        @click="confirmClearHistory" 
        class="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
      >
        Clear History
      </button>
    </div>
    
    <div v-if="history.length > 0" class="space-y-4">
      <HistoryItem 
        v-for="item in history" 
        :key="`${item.novelId}-${item.chapterId}`" 
        :item="item" 
        @remove="removeFromHistory"
      />
    </div>
    
    <div v-else class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-xl font-medium text-gray-600 dark:text-gray-400">No reading history</p>
      <p class="text-gray-500 dark:text-gray-500 mt-2">Your reading history will appear here</p>
      <NuxtLink to="/library" class="inline-block mt-4 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md">
        Browse Library
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useHistoryStore } from '~/stores/history'

const historyStore = useHistoryStore()

const history = computed(() => historyStore.getHistory)

const removeFromHistory = (item) => {
  historyStore.removeFromHistory(item.novelId, item.chapterId)
}

const confirmClearHistory = () => {
  if (confirm('Are you sure you want to clear your reading history?')) {
    historyStore.clearHistory()
  }
}
</script>
