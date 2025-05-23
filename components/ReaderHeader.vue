<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <NuxtLink :to="`/novel/${novelId}`" class="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Novel</span>
          </NuxtLink>
        </div>
        <div class="flex items-center">
          <button @click="prevChapter" class="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400" :disabled="!hasPrevChapter">
            <span class="sr-only">Previous Chapter</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'opacity-50': !hasPrevChapter }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div class="mx-4 text-sm">
            Chapter {{ chapterId }}
          </div>
          <button @click="nextChapter" class="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400" :disabled="!hasNextChapter">
            <span class="sr-only">Next Chapter</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'opacity-50': !hasNextChapter }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button @click="toggleSettings" class="ml-4 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            <span class="sr-only">Settings</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useReaderStore } from '~/stores/reader'
import { useNovelsStore } from '~/stores/novels'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const readerStore = useReaderStore()
const novelsStore = useNovelsStore()

const novelId = computed(() => route.params.id)
const chapterId = computed(() => route.params.chapterId)

const hasPrevChapter = computed(() => {
  return parseInt(chapterId.value) > 1
})

const hasNextChapter = computed(() => {
  const novel = novelsStore.getNovelById(novelId.value)
  return novel && parseInt(chapterId.value) < novel.chapters.length
})

const prevChapter = () => {
  if (hasPrevChapter.value) {
    router.push(`/novel/${novelId.value}/chapter/${parseInt(chapterId.value) - 1}`)
  }
}

const nextChapter = () => {
  if (hasNextChapter.value) {
    router.push(`/novel/${novelId.value}/chapter/${parseInt(chapterId.value) + 1}`)
  }
}

const toggleSettings = () => {
  readerStore.toggleSettings()
}
</script>
