<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-start">
    <NuxtImg 
      :src="novel.coverImage" 
      :alt="novel.title" 
      class="w-16 h-24 object-cover rounded-md"
      width="64"
      height="96"
    />
    <div class="ml-4 flex-grow">
      <div class="flex justify-between items-start">
        <div>
          <NuxtLink :to="`/novel/${novel.id}`" class="font-medium text-primary-600 dark:text-primary-400 hover:underline">
            {{ novel.title }}
          </NuxtLink>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ novel.author }}</p>
        </div>
        <button v-if="showRemove" @click="removeItem" class="text-gray-500 hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="mt-2">
        <NuxtLink :to="`/novel/${novel.id}/chapter/${item.chapterId}`" class="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
          Chapter {{ item.chapterId }}
        </NuxtLink>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {{ formatDate(item.timestamp) }}
        </p>
      </div>
      <div class="mt-2 flex justify-between items-center">
        <div class="text-xs text-gray-500 dark:text-gray-400">
          {{ progressText }}
        </div>
        <NuxtLink :to="`/novel/${novel.id}/chapter/${item.chapterId}`" class="text-sm text-white bg-primary-600 hover:bg-primary-700 px-3 py-1 rounded-md">
          Continue Reading
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNovelsStore } from '~/stores/novels'
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  showRemove: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['remove'])
const novelsStore = useNovelsStore()

const novel = computed(() => {
  return novelsStore.getNovelById(props.item.novelId) || {}
})

const progressText = computed(() => {
  if (!novel.value || !novel.value.chapters) return ''
  
  const totalChapters = novel.value.chapters.length
  const currentChapter = parseInt(props.item.chapterId)
  const percentage = Math.round((currentChapter / totalChapters) * 100)
  
  return `${currentChapter} of ${totalChapters} chapters (${percentage}%)`
})

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const removeItem = () => {
  emit('remove', props.item)
}
</script>
