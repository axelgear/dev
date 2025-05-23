<template>
  <div v-if="novel">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Novel Cover and Info -->
      <div class="md:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div class="relative pb-[150%]">
            <NuxtImg 
              :src="novel.coverImage" 
              :alt="novel.title" 
              class="absolute inset-0 w-full h-full object-cover"
              width="400"
              height="600"
            />
          </div>
          <div class="p-4">
            <div class="flex items-center mb-2">
              <div class="flex items-center text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="ml-1 font-bold">{{ novel.rating.toFixed(1) }}</span>
              </div>
              <span class="mx-2 text-gray-400">•</span>
              <span class="text-gray-600 dark:text-gray-400">{{ novel.views.toLocaleString() }} views</span>
            </div>
            <div class="flex flex-wrap mt-2">
              <span v-for="genre in novel.genres" :key="genre" class="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1 mr-1 mb-1">
                {{ genre }}
              </span>
            </div>
            <div class="mt-4">
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Status:</span>
                <span class="ml-2 text-sm capitalize" :class="{
                  'text-green-600 dark:text-green-400': novel.status === 'ongoing',
                  'text-blue-600 dark:text-blue-400': novel.status === 'completed',
                  'text-yellow-600 dark:text-yellow-400': novel.status === 'hiatus'
                }">
                  {{ novel.status }}
                </span>
              </div>
              <div class="flex items-center mt-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Chapters:</span>
                <span class="ml-2 text-sm">{{ novel.chapters.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Novel Details -->
      <div class="md:col-span-2">
        <h1 class="text-3xl font-bold mb-2">{{ novel.title }}</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">by {{ novel.author }}</p>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4">Synopsis</h2>
          <p class="text-gray-700 dark:text-gray-300">{{ novel.description }}</p>
        </div>
        
        <!-- Continue Reading / Start Reading Button -->
        <div class="mb-6">
          <NuxtLink 
            :to="`/novel/${novel.id}/chapter/${lastReadChapter || '1'}`" 
            class="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            {{ lastReadChapter ? 'Continue Reading' : 'Start Reading' }}
          </NuxtLink>
          <span v-if="lastReadChapter" class="ml-3 text-sm text-gray-600 dark:text-gray-400">
            Last read: Chapter {{ lastReadChapter }}
          </span>
        </div>
        
        <!-- Chapters List -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Chapters</h2>
            <div class="flex items-center">
              <label for="chapterSort" class="mr-2 text-sm text-gray-600 dark:text-gray-400">Sort:</label>
              <select 
                id="chapterSort"
                v-model="chapterSort" 
                class="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1"
              >
                <option value="asc">Oldest First</option>
                <option value="desc">Newest First</option>
              </select>
            </div>
          </div>
          
          <div class="space-y-2 max-h-96 overflow-y-auto">
            <NuxtLink 
              v-for="chapter in sortedChapters" 
              :key="chapter.id" 
              :to="`/novel/${novel.id}/chapter/${chapter.id}`"
              class="block p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex justify-between items-center"
              :class="{ 'bg-gray-100 dark:bg-gray-700': chapter.id === lastReadChapter }"
            >
              <span>Chapter {{ chapter.id }}</span>
              <span v-if="isBookmarked(novel.id, chapter.id)" class="text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-12">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 dark:border-gray-600 border-t-primary-500"></div>
    <p class="mt-2 text-gray-500 dark:text-gray-400">Loading novel...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNovelsStore } from '~/stores/novels'
import { useHistoryStore } from '~/stores/history'
import { useBookmarksStore } from '~/stores/bookmarks'

const route = useRoute()
const novelsStore = useNovelsStore()
const historyStore = useHistoryStore()
const bookmarksStore = useBookmarksStore()

const chapterSort = ref('asc')
const novel = ref(null)

onMounted(() => {
  novel.value = novelsStore.getNovelById(route.params.id)
})


const sortedChapters = computed(() => {
  if (!novel.value) return []
  
  const chapters = [...novel.value.chapters]
  return chapterSort.value === 'asc' 
    ? chapters.sort((a, b) => parseInt(a.id) - parseInt(b.id))
    : chapters.sort((a, b) => parseInt(b.id) - parseInt(a.id))
})

const lastReadChapter = computed(() => {
  const lastRead = historyStore.getLastRead(route.params.id)
  return lastRead ? lastRead.chapterId : null
})

const isBookmarked = (novelId, chapterId) => {
  return bookmarksStore.isBookmarked(novelId, chapterId)
}
</script>
