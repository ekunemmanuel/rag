<template>
  <UPopover
    :popper="{
      arrow: true,
      placement: 'right',
      offsetDistance: 15,
    }"
  >
    <UTooltip
      text="More"
      :popper="{
        arrow: true,
        placement: 'right',
        offsetDistance: 15,
      }"
    >
      <div class="">
        <UButton color="gray" variant="ghost" icon="i-ci:more-horizontal" />
      </div>
    </UTooltip>

    <template #panel>
      <div class="p-2 flex flex-col space-y-2">
        <UButton
          color="gray"
          variant="ghost"
          class="dark:bg-gray-900 bg-gray-300 hover:!text-gray-400"
          icon="i-material-symbols:edit-rounded"
          label="Rename"
          @click.prevent="renameOption"
        />
        <UButton
          color="gray"
          variant="ghost"
          class="dark:bg-red-900 bg-red-300 hover:!text-red-400"
          icon="i-material-symbols:delete-outline-rounded"
          label="Delete"
          @click.prevent="deleteOption"
        />
      </div>
    </template>
  </UPopover>
</template>

<script lang="ts" setup>
import type { BookDetails } from '~/types';

const props = defineProps<{
  book: BookDetails | BookDetails[]
}>();
function deleteOption() {
  console.log(Array.isArray(props.book) ? props.book[0].id : props.book.id);

  console.log("deleteOption");
}

function renameOption() {
  console.log(props.book);
  console.log("renameOption");
}
</script>

<style scoped></style>
