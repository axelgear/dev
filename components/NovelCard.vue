<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-lg">
    <NuxtLink :to="`/novel/${novel.id}`">
      <div class="relative pb-[150%]">
        <NuxtImg 
          :src="novel.coverImage" 
          :alt="novel.title" 
          class="absolute inset-0 w-full h-full object-cover"
          width="300"
          height="450"
        />
        <div v-if="showRank" class="absolute top-0 left-0 bg-primary-500 text-white px-2 py-1 text-sm font-bold">
          #{{ rank }}
        </div>
      </div>
      <div class="p-4">
        <h3 class="font-bold text-gray-900 dark:text-gray-100 line-clamp-2">{{ novel.title }}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ novel.author }}</p>
        <div class="flex items-center mt-2">
          <div class="flex items-center text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="ml-1 text-sm">{{ novel.rating.toFixed(1) }}</span>
          </div>
          <span class="mx-2 text-gray-400">•</span>
          <span class="text-sm text-gray-600 dark:text-gray-400">{{ novel.chapters.length }} chapters</span>
        </div>
        <div class="flex flex-wrap mt-2">
          <span v-for="genre in novel.genres.slice(0, 2)" :key="genre" class="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1 mr-1 mb-1">
            {{ genre }}
          </span>
          <span v-if="novel.genres.length > 2" class="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1 mr-1 mb-1">
            +{{ novel.genres.length - 2 }}
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  novel: {
    type: Object,
    required: true
  },
  rank: {
    type: Number,
    default: null
  },
  showRank: {
    type: Boolean,
    default: false
  }
})
</script>
