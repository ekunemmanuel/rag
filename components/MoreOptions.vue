<template>
  <UPopover
    :popper="{
      arrow: true,
      placement: 'right',
      offsetDistance: 15,
    }"
    v-model:open="popover"
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
          class="dark:bg-red-900 bg-red-300 hover:!text-red-400"
          icon="i-material-symbols:delete-outline-rounded"
          label="Delete"
          @click.prevent="deleteOption"
        />
      </div>
    </template>
  </UPopover>

  <!-- <UButton
    color="gray"
    variant="ghost"
    class="dark:bg-red-900 bg-red-300 hover:!text-red-400"
    icon="i-material-symbols:delete-outline-rounded"
    @click.prevent="deleteOption"
  /> -->

  <UModal v-model="isOpen" prevent-close :ui="{}">
    <div class="flex justify-center items-center flex-wrap gap-[10px] p-4">
      <span> Deleting your file </span>
      <UIcon name="line-md:uploading-loop" class="text-[40px]" />
    </div>
  </UModal>
</template>

<script lang="ts" setup>
import type { BookDetails } from "~/types";
const { deleteBookDetails, deleteFromChatPdfApi, deleteFileInStorage } =
  useBookDetails();
const { deleteChat } = useChats();
const props = defineProps<{
  book: BookDetails;
}>();
const isOpen = ref(false);
const book = props.book;
const popover = ref(false);
async function deleteOption() {
  popover.value = false;
  // The block is to delete all the files in a folder
  // if this is a folder
  if (book.collections) {
    // console.log(`Folder`, book.id);

    isOpen.value = true; // Open the modal

    Promise.all(
      book.collections.map(async (file) => {
        try {
          // file in folder
          await deleteBookAndRelatedData(
            book.id,
            file.alias,
            file.chatId,
            file.sourceId
          );
        } catch (error) {
          console.log(error);
        }
      })
    ).finally(() => {
      isOpen.value = false; // Close the modal when all operations are complete
    });
  }
  // This block is to delete a single file
  // if this is a file
  else {
    // console.log(`Single File`, book);

    try {
      isOpen.value = true;
      await deleteBookAndRelatedData(
        book.id,
        book.alias,
        book.chatId,
        book.sourceId
      );
      isOpen.value = false;
    } catch (error) {
      console.log(error);
      isOpen.value = false;
    }
  }
}

// TypeScript

async function deleteBookAndRelatedData(
  id: string,
  alias: string,
  chatId?: string,
  sourceId?: string
) {
  if (sourceId) {
    await deleteFromChatPdfApi(sourceId);
    // console.log(`Single File sourceID `, sourceId);
  }

  if (!chatId) return;
  await deleteFileInStorage(alias);
  // console.log(`Single File in storage`, alias);

  await deleteChat(chatId);
  // console.log(`Single File chatID`, chatId);

  await deleteBookDetails(id);
  // console.log(`Single File ID`, id);
}

function renameOption() {
  console.log(props.book);
  console.log("renameOption");
}
</script>

<style scoped></style>
