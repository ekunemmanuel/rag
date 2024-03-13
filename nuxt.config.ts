// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
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
    // admin: {
    //   options: {
    //     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    //     projectId: process.env.FIREBASE_PROJECT_ID,
    //     serviceAccountId: process.env.FIREBASE_SERVICE_ACCOUNT_ID,
    //     databaseAuthVariableOverride: {},
    //     databaseURL: "",
    //   },
    // },
  },
  imports: {
    // dirs: ['types']
  },
  runtimeConfig: {
    chatApiUrl: process.env.CHAT_API_URL,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    chatApiKey: process.env.CHAT_API_KEY,
    nitro: {},
    vuefire: {
      // admin: {
      //   options: {},
      // },
    },
  },
});
