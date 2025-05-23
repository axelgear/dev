<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
    <SiteHeader />
    <main class="flex-grow container mx-auto px-4 py-6">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
