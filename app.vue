<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
  <UModals />
  <VuePreloader
    background-color="#091a28"
    color="#ffffff"
    transition-type="fade-up"
    :loading-speed="25"
    :transition-speed="1400"
  >
  </VuePreloader>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { VuePreloader } from "vue-preloader";
import "../node_modules/vue-preloader/dist/style.css";
const isLargeScreen = useMediaQuery("(min-width: 1200px)");
const isMediumScreen = useMediaQuery(
  "(min-width: 768px) and (max-width: 1199px)"
);
const isSmallScreen = useMediaQuery("(max-width: 767px)");

const largeScreen = useLargeScreen();
const medScreen = useMediumScreen();
const smallScreen = useSmallScreen();
const toogleValue = useToogle();

watch(
  [isLargeScreen, isMediumScreen, isSmallScreen],
  ([newLargeVal, newMedVal, newSmallVal]) => {
    largeScreen.value = newLargeVal;
    smallScreen.value = newSmallVal;
    medScreen.value = newMedVal;
    toogleValue.value = newSmallVal;
  },
  {
    immediate: true,
  }
);
</script>
