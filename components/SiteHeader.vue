<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <span class="text-xl font-bold text-primary-600 dark:text-primary-400">MTL Books</span>
          </NuxtLink>
          <nav class="hidden md:ml-10 md:flex space-x-8">
            <NuxtLink to="/" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Home</NuxtLink>
            <NuxtLink to="/library" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Library</NuxtLink>
            <NuxtLink to="/history" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">History</NuxtLink>
            <NuxtLink to="/bookmarks" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Bookmarks</NuxtLink>
          </nav>
        </div>
        <div class="flex items-center">
          <button @click="openSearch" class="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            <span class="sr-only">Search</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button @click="toggleTheme" class="ml-4 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            <span class="sr-only">Toggle theme</span>
            <svg v-if="themeStore.isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <button @click="toggleMobileMenu" class="md:hidden ml-4 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            <span class="sr-only">Open menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 space-y-2">
        <NuxtLink to="/" class="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Home</NuxtLink>
        <NuxtLink to="/library" class="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Library</NuxtLink>
        <NuxtLink to="/history" class="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">History</NuxtLink>
        <NuxtLink to="/bookmarks" class="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Bookmarks</NuxtLink>
      </div>
    </div>
    
    <SearchModal v-if="searchOpen" @close="closeSearch" />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useThemeStore } from '~/stores/theme'

const themeStore = useThemeStore()
const mobileMenuOpen = ref(false)
const searchOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const openSearch = () => {
  searchOpen.value = true
}

const closeSearch = () => {
  searchOpen.value = false
}
</script>
