<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

const isLargeScreen = useMediaQuery("(min-width: 1200px)");
const isMediumScreen = useMediaQuery(
  "(min-width: 768px) and (max-width: 1199px)"
);
const isSmallScreen = useMediaQuery("(max-width: 767px)");

const largeScreen = useLargeScreen();
const medScreen = useMediumScreen();
const smallScreen = useSmallScreen();

watch(
  [isLargeScreen, isMediumScreen, isSmallScreen],
  ([newLargeVal, newMedVal, newSmallVal]) => {
    largeScreen.value = newLargeVal;
    smallScreen.value = newSmallVal;
    medScreen.value = newMedVal;
  },
  {
    immediate: true,
  }
);
</script>
