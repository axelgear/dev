import { defineStore } from "pinia"

export interface HistoryItem {
  novelId: string
  chapterId: string
  timestamp: string
  progress?: number
}

export const useHistoryStore = defineStore("history", {
  state: () => ({
    history: [] as HistoryItem[],
  }),
  getters: {
    getHistory: (state) => {
      return [...state.history].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    },
    getNovelHistory: (state) => (novelId: string) => {
      return state.history
        .filter((item) => item.novelId === novelId)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    },
    getLastRead: (state) => (novelId: string) => {
      const items = state.history
        .filter((item) => item.novelId === novelId)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      return items.length > 0 ? items[0] : null
    },
  },
  actions: {
    addToHistory(item: HistoryItem) {
      // Remove existing entry for the same chapter if exists
      this.history = this.history.filter((h) => !(h.novelId === item.novelId && h.chapterId === item.chapterId))

      // Add new entry
      this.history.push(item)

      // Keep history limited to last 100 items
      if (this.history.length > 100) {
        this.history = this.history.slice(-100)
      }
    },
    removeFromHistory(novelId: string, chapterId: string) {
      this.history = this.history.filter((item) => !(item.novelId === novelId && item.chapterId === chapterId))
    },
    clearHistory() {
      this.history = []
    },
    clearNovelHistory(novelId: string) {
      this.history = this.history.filter((item) => item.novelId !== novelId)
    },
  },
  persist: {
    storage: typeof window !== "undefined" ? localStorage : undefined,
  },
})
