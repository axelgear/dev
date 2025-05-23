<template>
  <footer class="bg-white dark:bg-gray-800 shadow-inner">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">MTL Books</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Your favorite light novel reading platform. Read the latest novels online for free.
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/library" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Library</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/history" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">History</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/bookmarks" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Bookmarks</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Legal</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/terms" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Terms of Service</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Privacy Policy</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/dmca" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">DMCA</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p class="text-center text-gray-500 dark:text-gray-400">
          &copy; {{ new Date().getFullYear() }} MTL Books. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
