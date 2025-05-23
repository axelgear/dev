<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Bookmarks</h1>
      <button 
        v-if="hasBookmarks"
        @click="confirmClearBookmarks" 
        class="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
      >
        Clear All Bookmarks
      </button>
    </div>
    
    <div v-if="hasBookmarks" class="space-y-4">
      <div 
        v-for="bookmark in bookmarks" 
        :key="`${bookmark.novelId}-${bookmark.chapterId}`" 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-start"
      >
        <NuxtImg 
          :src="getNovelCover(bookmark.novelId)" 
          :alt="bookmark.novelTitle" 
          class="w-16 h-24 object-cover rounded-md"
          width="64"
          height="96"
        />
        <div class="ml-4 flex-grow">
          <div class="flex justify-between items-start">
            <div>
              <NuxtLink :to="`/novel/${bookmark.novelId}`" class="font-medium text-primary-600 dark:text-primary-400 hover:underline">
                {{ bookmark.novelTitle }}
              </NuxtLink>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ getNovelAuthor(bookmark.novelId) }}</p>
            </div>
            <button @click="removeBookmark(bookmark)" class="text-gray-500 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="mt-2">
            <NuxtLink :to="`/novel/${bookmark.novelId}/chapter/${bookmark.chapterId}`" class="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              {{ bookmark.chapterTitle }}
            </NuxtLink>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Bookmarked on {{ formatDate(bookmark.timestamp) }}
            </p>
          </div>
          <div class="mt-2">
            <NuxtLink :to="`/novel/${bookmark.novelId}/chapter/${bookmark.chapterId}`" class="text-sm text-white bg-primary-600 hover:bg-primary-700 px-3 py-1 rounded-md">
              Read Now
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      <p class="text-xl font-medium text-gray-600 dark:text-gray-400">No bookmarks</p>
      <p class="text-gray-500 dark:text-gray-500 mt-2">Your bookmarks will appear here</p>
      <NuxtLink to="/library" class="inline-block mt-4 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md">
        Browse Library
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBookmarksStore } from '~/stores/bookmarks'
import { useNovelsStore } from '~/stores/novels'

const bookmarksStore = useBookmarksStore()
const novelsStore = useNovelsStore()

const bookmarks = computed(() => bookmarksStore.getBookmarks)
const hasBookmarks = computed(() => bookmarks.value.length > 0)

const getNovelCover = (novelId) => {
  const novel = novelsStore.getNovelById(novelId)
  return novel ? novel.coverImage : '/placeholder.svg?height=450&width=300'
}

const getNovelAuthor = (novelId) => {
  const novel = novelsStore.getNovelById(novelId)
  return novel ? novel.author : 'Unknown Author'
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const removeBookmark = (bookmark) => {
  bookmarksStore.removeBookmark(bookmark.novelId, bookmark.chapterId)
}

const confirmClearBookmarks = () => {
  if (confirm('Are you sure you want to clear all your bookmarks?')) {
    bookmarksStore.clearBookmarks()
  }
}
</script>
