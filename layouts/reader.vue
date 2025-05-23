<template>
  <div class="min-h-screen flex flex-col" :class="readerStore.bgColor">
    <ReaderHeader />
    <main class="flex-grow container mx-auto px-4 py-6 reader-content" :class="[readerStore.textSize, readerStore.fontFamily]">
      <slot />
    </main>
    <ReaderControls />
    <ReaderSettings v-if="readerStore.showSettings" />
  </div>
</template>

<script setup>
import { useReaderStore } from '~/stores/reader'

const readerStore = useReaderStore()
</script>

<style>
.reader-content {
  max-width: 800px;
  line-height: 1.8;
}
</style>
