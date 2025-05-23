import { defineNuxtConfig } from "nuxt/config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "MTL Books - Light Novel Reading Platform",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Read the latest light novels online for free" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/image", "@nuxtjs/seo", "@nuxtjs/sitemap", "@nuxtjs/robots"],
  css: ["~/assets/css/main.css"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  imports: {
    dirs: ["stores"],
  },
  tailwindcss: {
    config: {
      content: [],
      theme: {
        extend: {
          colors: {
            primary: {
              50: "#f0f9ff",
              100: "#e0f2fe",
              200: "#bae6fd",
              300: "#7dd3fc",
              400: "#38bdf8",
              500: "#0ea5e9",
              600: "#0284c7",
              700: "#0369a1",
              800: "#075985",
              900: "#0c4a6e",
              950: "#082f49",
            },
          },
        },
      },
      plugins: [require("@tailwindcss/typography")],
    },
  },
  image: {
    provider: "ipx",
  },
  ssr: true,
  nitro: {
    preset: "vercel",
  },
})
