<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Novel Library</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Filters Sidebar -->
      <div class="lg:col-span-1">
        <NovelFilters @filter="applyFilters" />
      </div>
      
      <!-- Novels Grid -->
      <div class="lg:col-span-3">
        <div v-if="filteredNovels.length > 0">
          <div class="mb-6 flex justify-between items-center">
            <p class="text-gray-600 dark:text-gray-400">
              Showing {{ paginatedNovels.length }} of {{ filteredNovels.length }} novels
            </p>
            <div class="flex items-center">
              <label for="perPage" class="mr-2 text-sm text-gray-600 dark:text-gray-400">Show:</label>
              <select 
                id="perPage"
                v-model="perPage" 
                class="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1"
              >
                <option :value="12">12</option>
                <option :value="24">24</option>
                <option :value="48">48</option>
              </select>
            </div>
          </div>
          
          <NovelGrid :novels="paginatedNovels" />
          
          <Pagination 
            :current-page="currentPage" 
            :total-pages="totalPages" 
            @page-change="changePage" 
          />
        </div>
        
        <div v-else class="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p class="text-xl font-medium text-gray-600 dark:text-gray-400">No novels found</p>
          <p class="text-gray-500 dark:text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNovelsStore } from '~/stores/novels'

const route = useRoute()
const router = useRouter()
const novelsStore = useNovelsStore()

const filters = ref({
  search: '',
  genre: '',
  status: '',
  sort: 'latest'
})

const currentPage = ref(1)
const perPage = ref(24)

// Initialize filters from URL
const initialSearch = route.query.search ? route.query.search.toString() : '';
const initialGenre = route.query.genre ? route.query.genre.toString() : '';
const initialStatus = route.query.status ? route.query.status.toString() : '';
const initialSort = route.query.sort ? route.query.sort.toString() : 'latest';
const initialPage = route.query.page ? parseInt(route.query.page.toString()) : 1;

filters.value.search = initialSearch;
filters.value.genre = initialGenre;
filters.value.status = initialStatus;
filters.value.sort = initialSort;
currentPage.value = initialPage;


// Update URL when filters change
watch(filters, (newFilters) => {
  updateQueryParams()
})

watch(currentPage, () => {
  updateQueryParams()
})

watch(perPage, () => {
  currentPage.value = 1
  updateQueryParams()
})

const updateQueryParams = () => {
  const query = {}
  if (filters.value.search) query.search = filters.value.search
  if (filters.value.genre) query.genre = filters.value.genre
  if (filters.value.status) query.status = filters.value.status
  if (filters.value.sort) query.sort = filters.value.sort
  if (currentPage.value > 1) query.page = currentPage.value
  
  router.push({ query })
}

const filteredNovels = computed(() => {
  return novelsStore.filterNovels(filters.value)
})

const totalPages = computed(() => {
  return Math.ceil(filteredNovels.value.length / perPage.value)
})

const paginatedNovels = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage.value
  return filteredNovels.value.slice(startIndex, startIndex + perPage.value)
})

const applyFilters = (newFilters) => {
  filters.value = { ...newFilters }
  currentPage.value = 1
}

const changePage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
