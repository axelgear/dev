import { defineStore } from "pinia"

export interface BookmarkItem {
  novelId: string
  chapterId: string
  novelTitle: string
  chapterTitle: string
  timestamp: string
}

export const useBookmarksStore = defineStore("bookmarks", {
  state: () => ({
    bookmarks: [] as BookmarkItem[],
  }),
  getters: {
    getBookmarks: (state) => {
      return [...state.bookmarks].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    },
    getNovelBookmarks: (state) => (novelId: string) => {
      return state.bookmarks
        .filter((item) => item.novelId === novelId)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    },
    isBookmarked: (state) => (novelId: string, chapterId: string) => {
      return state.bookmarks.some((item) => item.novelId === novelId && item.chapterId === chapterId)
    },
  },
  actions: {
    addBookmark(bookmark: BookmarkItem) {
      // Check if already bookmarked
      if (!this.isBookmarked(bookmark.novelId, bookmark.chapterId)) {
        this.bookmarks.push(bookmark)
      }
    },
    removeBookmark(novelId: string, chapterId: string) {
      this.bookmarks = this.bookmarks.filter((item) => !(item.novelId === novelId && item.chapterId === chapterId))
    },
    clearBookmarks() {
      this.bookmarks = []
    },
    clearNovelBookmarks(novelId: string) {
      this.bookmarks = this.bookmarks.filter((item) => item.novelId !== novelId)
    },
  },
  persist: {
    storage: typeof window !== "undefined" ? localStorage : undefined,
  },
})
