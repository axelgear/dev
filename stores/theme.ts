import { defineStore } from "pinia"

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDark: false,
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      this.updateDocumentClass()
      if (process.client) {
        localStorage.setItem("theme", this.isDark ? "dark" : "light")
      }
    },
    initTheme() {
      if (process.client) {
        // Check for saved theme preference or use system preference
        const savedTheme = localStorage.getItem("theme")
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches

        this.isDark = savedTheme === "dark" || (savedTheme === null && systemDark)
        this.updateDocumentClass()
      }
    },
    updateDocumentClass() {
      if (process.client) {
        if (this.isDark) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }
    },
  },
  persist: true,
})
