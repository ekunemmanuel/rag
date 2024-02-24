// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr:false,
  modules: ["@nuxt/ui", "@vueuse/nuxt", "@pinia/nuxt", "nuxt-vuefire"],
  vuefire: {
    auth: true,
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      appId: process.env.FIREBASE_APP_ID,
      // there could be other properties depending on the project
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    },
  },
});
