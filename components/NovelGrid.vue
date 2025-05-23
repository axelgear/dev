<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
    <NovelCard 
      v-for="(novel, index) in novels" 
      :key="novel.id" 
      :novel="novel" 
      :rank="startRank + index + 1" 
      :show-rank="showRank"
    />
  </div>
</template>

<script setup>
defineProps({
  novels: {
    type: Array,
    required: true
  },
  showRank: {
    type: Boolean,
    default: false
  },
  startRank: {
    type: Number,
    default: 0
  }
})
</script>
