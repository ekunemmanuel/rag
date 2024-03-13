<template>
  <div class="grid place-items-center px-[10px]">
    <UCard
      :ui="{
        body: {
          background: 'w-full',
        },
      }"
      ref="dropZoneRef"
      class="max-w-[600px] rounded-lg w-full min-h-[200px] border-dashed border dark:border-white border-gray-900 grid place-items-center"
    >
      <div
        class="flex flex-col gap-[10px] text-center justify-center items-center w-full"
      >
        <UIcon name="i-mdi:cloud-upload" class="text-[40px]" />
        <div class="font-semibold">Drag & Drop PDF Files Here</div>
        <UDivider class="w-full" label="OR" />
        <UButton @click="open()">Choose Files</UButton>
      </div>
    </UCard>
  </div>
  <UModal
    prevent-close
    v-model="sending"
    :ui="{
      background: 'bg-white dark:bg-primary-900',
      width: 'w-max',
      rounded: 'rounded-full',
    }"
  >
    <div class="flex justify-center items-center">
      <UIcon name="i-line-md:uploading-loop" class="text-[40px]" />
    </div>
  </UModal>
  <UModal v-if="isThereFile && files" v-model="isOpen" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Upload
            {{ `${files.length} ${files.length === 1 ? "file" : "files"}` }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-material-symbols:close-small"
            class="-my-1"
            @click="clearList"
          />
        </div>
      </template>
      <div v-if="isMultiple">
        <UInput
          v-model="collectionName"
          color="primary"
          variant="outline"
          placeholder="Collection name"
        />
      </div>
      <template v-if="files">
        <p>
          You have selected:
          <b>{{
            `${files.length} ${files.length === 1 ? "file" : "files"}`
          }}</b>
        </p>
        <li v-for="file of files" :key="file.name">
          {{ file.name }}
        </li>
      </template>
      <template #footer>
        <div class="flex items-center gap-[10px] justify-end">
          <UButton label="Upload" class="-my-1" @click="send" />
          <UButton
            color="gray"
            variant="ghost"
            label="Reset"
            class="-my-1"
            @click="clean"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
const dropZoneRef = ref<HTMLDivElement>();
const { notification } = useNotification();
const {
  clearList,
  collectionName,
  files,
  isMultiple,
  isOpen,
  upload,
  isThereFile,
  sending,
} = useBookDetails();

const { files: incomingDragFiles } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ["application/pdf"],
});

// const sending = ref(false);
function onDrop() {
  isOpen.value = true;

  files.value = incomingDragFiles.value
    ? [incomingDragFiles.value[0]].filter((file) => {
        if (file.size > 6 * 1024 * 1024) {
          notification({
            title: "File large",
            description: "File is Larger than 3MB",
          });
          return false;
        }
        return true;
      })
    : [];
  notification({
    id: "large-file",
    title: "Large File",
    description: "File is Larger than 6MB",
  });
}

const {
  files: incomingBrowserFiles,
  open,
  reset,
  onChange,
} = useFileDialog({
  accept: "application/pdf",
  multiple: false,
});

onChange(() => {
  isOpen.value = true;

  files.value = incomingBrowserFiles.value
    ? [incomingBrowserFiles.value[0]].filter((file) => {
        if (file.size > 6 * 1024 * 1024) {
          notification({
            id: "large-file",
            title: "Large File",
            description: "File is Larger than 6MB",
          });
          return false;
        }
        return true;
      })
    : [];
});

function clean() {
  isOpen.value = false;
  clearList();
  reset();
}

function send() {
  upload();
}

useHead({
  title: "Home",
  meta: [
    {
      name: "description",
      content: "This is the home page",
    },
  ],
});
</script>

<style scoped></style>
