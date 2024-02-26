<template>
  <div>
    {{ route.currentRoute.value.params.label }}
   

  </div>
</template>

<script lang="ts" setup>
const route = useRouter();

</script>

<style></style>
