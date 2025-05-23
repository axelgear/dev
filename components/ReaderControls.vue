<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg py-2 px-4 flex justify-center items-center space-x-6">
    <button @click="prevChapter" class="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400" :disabled="!hasPrevChapter">
      <span class="sr-only">Previous Chapter</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="{ 'opacity-50': !hasPrevChapter }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button @click="toggleBookmark" class="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
      <span class="sr-only">{{ isBookmarked ? 'Remove Bookmark' : 'Add Bookmark' }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="{ 'fill-primary-500': isBookmarked }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    </button>
    <button @click="nextChapter" class="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400" :disabled="!hasNextChapter">
      <span class="sr-only">Next Chapter</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="{ 'opacity-50': !hasNextChapter }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useNovelsStore } from '~/stores/novels'
import { useBookmarksStore } from '~/stores/bookmarks'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const novelsStore = useNovelsStore()
const bookmarksStore = useBookmarksStore()

const novelId = computed(() => route.params.id)
const chapterId = computed(() => route.params.chapterId)

const hasPrevChapter = computed(() => {
  return parseInt(chapterId.value) > 1
})

const hasNextChapter = computed(() => {
  const novel = novelsStore.getNovelById(novelId.value)
  return novel && parseInt(chapterId.value) < novel.chapters.length
})

const isBookmarked = computed(() => {
  return bookmarksStore.isBookmarked(novelId.value, chapterId.value)
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

const toggleBookmark = () => {
  const novel = novelsStore.getNovelById(novelId.value)
  if (novel) {
    if (isBookmarked.value) {
      bookmarksStore.removeBookmark(novelId.value, chapterId.value)
    } else {
      bookmarksStore.addBookmark({
        novelId: novelId.value,
        chapterId: chapterId.value,
        novelTitle: novel.title,
        chapterTitle: `Chapter ${chapterId.value}`,
        timestamp: new Date().toISOString()
      })
    }
  }
}
</script>
