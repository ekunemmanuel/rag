<template>
  <!-- <teleport to="body"> -->
  <!-- <div class="z-[100] grid place-items-center min-h-screen">
    <div>
     <p class="">
      Geting the AI to work...
     </p>

      <UIcon name="i-heroicons-light-bulb" />
    </div>
  </div> -->
  <!-- </teleport> -->
  <UModal
    v-model="isOpen"
    prevent-close
    :ui="{
    }"
  >
    <div class="flex justify-center items-center flex-wrap gap-[10px] p-4">
      <UIcon name="file-icons:brainfuck" class="text-[40px]" />
      <span> Preparing the second brain </span>
      <UIcon name="line-md:uploading-loop" class="text-[40px]" />
    </div>
  </UModal>
</template>

<script lang="ts" setup>
const isOpen = ref(true);
</script>

<style scoped></style>
