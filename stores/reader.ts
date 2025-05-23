import { defineStore } from "pinia"

export const useReaderStore = defineStore("reader", {
  state: () => ({
    textSize: "text-base",
    fontFamily: "font-sans",
    bgColor: "bg-white text-gray-900",
    showSettings: false,
  }),
  actions: {
    toggleSettings() {
      this.showSettings = !this.showSettings
    },
    increaseFontSize() {
      const sizes = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl"]
      const currentIndex = sizes.indexOf(this.textSize)
      if (currentIndex < sizes.length - 1) {
        this.textSize = sizes[currentIndex + 1]
      }
    },
    decreaseFontSize() {
      const sizes = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl"]
      const currentIndex = sizes.indexOf(this.textSize)
      if (currentIndex > 0) {
        this.textSize = sizes[currentIndex - 1]
      }
    },
    setFontFamily(fontFamily) {
      this.fontFamily = fontFamily
    },
    setBgColor(bgColor) {
      this.bgColor = bgColor
    },
  },
  persist: true,
})
