<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useThemeStore } from '~/stores/theme'
import { onMounted, watch, ref } from 'vue'

const themeStore = useThemeStore()
const isDarkRef = ref(themeStore.isDark)

// Initialize theme from localStorage on client side
onMounted(() => {
  themeStore.initTheme()
})

// Watch for theme changes and apply them
watch(isDarkRef, (newVal) => {
  if (newVal) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
