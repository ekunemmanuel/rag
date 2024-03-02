<template>
  <div class=""
    :class="[` grid  min-h-screen duration-200`, toogle ? 'grid-cols-[minmax(50px,50px)1fr]' : 'grid-cols-[minmax(50px,250px)1fr]']">
    <!-- <Sidenav class="hover:w-full w-[50px] duration-300" /> -->
    <Sidenav @width=data />
    <slot />
  </div>
</template>

<script lang="ts" setup>

const toogle = ref(false);
function data(value: boolean) {
  toogle.value = value;
}

</script>

<style scoped></style>
