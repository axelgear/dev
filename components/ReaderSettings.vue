<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" @click.self="closeSettings">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Reading Settings</h2>
        <button @click="closeSettings" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-medium mb-2">Font Size</h3>
          <div class="flex items-center space-x-4">
            <button @click="decreaseFontSize" class="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <div class="flex-grow text-center">
              {{ fontSizeLabel }}
            </div>
            <button @click="increaseFontSize" class="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-medium mb-2">Font Family</h3>
          <div class="grid grid-cols-2 gap-2">
            <button 
              v-for="font in fontOptions" 
              :key="font.value" 
              @click="setFontFamily(font.value)"
              class="p-2 rounded-md text-center"
              :class="[
                readerStore.fontFamily === font.value 
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border-2 border-primary-500' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              ]"
            >
              {{ font.label }}
            </button>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-medium mb-2">Background Color</h3>
          <div class="grid grid-cols-3 gap-2">
            <button 
              v-for="bg in bgOptions" 
              :key="bg.value" 
              @click="setBgColor(bg.value)"
              class="p-4 rounded-md border"
              :class="[
                bg.previewClass,
                readerStore.bgColor === bg.value ? 'border-primary-500 ring-2 ring-primary-500' : 'border-gray-300 dark:border-gray-600'
              ]"
            >
              <span class="sr-only">{{ bg.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useReaderStore } from '~/stores/reader'
import { computed } from 'vue'

const readerStore = useReaderStore()

const fontOptions = [
  { label: 'Sans Serif', value: 'font-sans' },
  { label: 'Serif', value: 'font-serif' },
  { label: 'Mono', value: 'font-mono' },
  { label: 'System UI', value: 'font-system' }
]

const bgOptions = [
  { label: 'White', value: 'bg-white text-gray-900', previewClass: 'bg-white' },
  { label: 'Sepia', value: 'bg-amber-50 text-amber-900', previewClass: 'bg-amber-50' },
  { label: 'Dark', value: 'bg-gray-900 text-gray-100', previewClass: 'bg-gray-900' },
  { label: 'Black', value: 'bg-black text-gray-200', previewClass: 'bg-black' },
  { label: 'Green', value: 'bg-green-50 text-green-900', previewClass: 'bg-green-50' },
  { label: 'Blue', value: 'bg-blue-50 text-blue-900', previewClass: 'bg-blue-50' }
]

const fontSizeLabel = computed(() => {
  const sizes = {
    'text-sm': 'Small',
    'text-base': 'Medium',
    'text-lg': 'Large',
    'text-xl': 'X-Large',
    'text-2xl': 'XX-Large'
  }
  return sizes[readerStore.textSize] || 'Medium'
})

const decreaseFontSize = () => {
  readerStore.decreaseFontSize()
}

const increaseFontSize = () => {
  readerStore.increaseFontSize()
}

const setFontFamily = (fontFamily) => {
  readerStore.setFontFamily(fontFamily)
}

const setBgColor = (bgColor) => {
  readerStore.setBgColor(bgColor)
}

const closeSettings = () => {
  readerStore.toggleSettings()
}
</script>
