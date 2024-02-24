<template>
  <div class="grid grid-cols-[minmax(50px,250px)1fr] min-h-screen">
    <!-- <Sidenav class="hover:w-full w-[50px] duration-300" /> -->
    <Sidenav />
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
