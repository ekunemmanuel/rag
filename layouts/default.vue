<template>
  <div
    class=""
    :class="[
      ` grid  min-h-screen duration-200`,
      toogleValue
        ? 'grid-cols-[minmax(50px,50px)1fr]'
        : 'grid-cols-[minmax(50px,250px)1fr]',
    ]"
  >
    <!-- <Sidenav class="hover:w-full w-[50px] duration-300" /> -->
    <Sidenav class="" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
const toogleValue = useToogle()




</script>

<style scoped></style>
