<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 rounded-lg mb-12">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Welcome to MTL Books</h1>
          <p class="text-xl mb-8">Discover and read the best light novels online for free.</p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink to="/library" class="bg-white text-primary-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg">
              Browse Library
            </NuxtLink>
            <button @click="openSearch" class="bg-transparent hover:bg-primary-700 border-2 border-white font-bold py-3 px-6 rounded-lg">
              Search Novels
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Updates Section -->
    <section class="mb-12">
      <SectionHeading title="Recent Updates" view-all-link="/library?sort=latest" />
      <NovelGrid :novels="recentNovels" />
    </section>

    <!-- Popular Novels Section -->
    <section class="mb-12">
      <SectionHeading title="Popular Novels" view-all-link="/library?sort=popular" />
      <NovelGrid :novels="popularNovels" :show-rank="true" />
    </section>

    <!-- Top Rated Section -->
    <section class="mb-12">
      <SectionHeading title="Top Rated" view-all-link="/library?sort=rating" />
      <NovelGrid :novels="topRatedNovels" />
    </section>

    <!-- Genres Section -->
    <section class="mb-12">
      <SectionHeading title="Browse by Genre" />
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <NuxtLink 
          v-for="genre in genres" 
          :key="genre" 
          :to="`/library?genre=${genre}`"
          class="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shadow-md p-6 text-center transition-colors duration-200"
        >
          <h3 class="font-medium">{{ genre }}</h3>
        </NuxtLink>
      </div>
    </section>

    <!-- Continue Reading Section (if user has history) -->
    <section v-if="hasHistory" class="mb-12">
      <SectionHeading title="Continue Reading" view-all-link="/history" />
      <div class="grid grid-cols-1 gap-4">
        <HistoryItem 
          v-for="item in recentHistory" 
          :key="`${item.novelId}-${item.chapterId}`" 
          :item="item" 
          :show-remove="false"
        />
      </div>
    </section>

    <SearchModal v-if="searchOpen" @close="closeSearch" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useNovelsStore } from '~/stores/novels'
import { useHistoryStore } from '~/stores/history'

const novelsStore = useNovelsStore()
const historyStore = useHistoryStore()

const searchOpen = ref(false)

const recentNovels = computed(() => novelsStore.getRecentNovels)
const popularNovels = computed(() => novelsStore.getPopularNovels)
const topRatedNovels = computed(() => novelsStore.getTopRatedNovels)
const genres = computed(() => novelsStore.getAllGenres)

const hasHistory = computed(() => historyStore.getHistory.length > 0)
const recentHistory = computed(() => historyStore.getHistory.slice(0, 3))

const openSearch = () => {
  searchOpen.value = true
}

const closeSearch = () => {
  searchOpen.value = false
}
</script>
