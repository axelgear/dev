<template>
  <div v-if="chapter" class="prose dark:prose-invert max-w-none">
    <h1 class="text-2xl font-bold mb-6">{{ novel.title }} - Chapter {{ chapter.id }}</h1>
    
    <div v-html="sanitizedContent"></div>
  </div>
  <div v-else class="text-center py-12">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 dark:border-gray-600 border-t-primary-500"></div>
    <p class="mt-2 text-gray-500 dark:text-gray-400">Loading chapter...</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNovelsStore } from '~/stores/novels'
import { useHistoryStore } from '~/stores/history'

const route = useRoute()
const novelsStore = useNovelsStore()
const historyStore = useHistoryStore()

definePageMeta({
  layout: 'reader'
})

const novel = computed(() => {
  return novelsStore.getNovelById(route.params.id)
})

let chapter = computed(() => {
  if (!novel.value) return null
  return novelsStore.getChapter(route.params.id, route.params.chapterId)
})

onMounted(() => {
  chapter = computed(() => {
    if (!novel.value) return null
    return novelsStore.getChapter(route.params.id, route.params.chapterId)
  })
})

const sanitizedContent = computed(() => {
  if (!chapter.value) return ''
  
  // Create paragraphs from content
  const paragraphs = chapter.value.content.split('\n\n')
  const formattedContent = paragraphs.map(p => `<p>${p}</p>`).join('')
  
  // Simple HTML escaping for security
  return formattedContent.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&lt;p&gt;/g, '<p>').replace(/&lt;\/p&gt;/g, '</p>')
})

onMounted(() => {
  // Add to reading history
  if (novel.value && chapter.value) {
    historyStore.addToHistory({
      novelId: route.params.id,
      chapterId: route.params.chapterId,
      timestamp: new Date().toISOString()
    })
  }
})
</script>
