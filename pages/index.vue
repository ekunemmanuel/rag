<template>
  <div class="grid place-items-center px-[10px]">
    <UCard :ui="{
      body: {
        background: 'w-full',
      },
    }" ref="dropZoneRef"
      class="max-w-[600px] rounded-lg w-full min-h-[200px] border-dashed border dark:border-white border-gray-900 grid place-items-center">
      <div class="flex flex-col gap-[10px] text-center justify-center items-center w-full">
        <UIcon name="i-mdi:cloud-upload" class="text-[40px]" />
        <div class="font-semibold">Drag & Drop PDF Files Here</div>
        <UDivider class="w-full" label="OR" />
        <UButton @click="open()">Choose Files</UButton>
      </div>
    </UCard>
  </div>
  <UModal prevent-close v-model="sending" :ui="{
      background: 'bg-white dark:bg-primary-900',
      width: 'w-max',
      rounded: 'rounded-full',
    }">
    <div class="flex justify-center items-center">
      <UIcon name="i-line-md:uploading-loop" class="text-[40px]" />
    </div>
  </UModal>
  <UModal v-if="isThereFile && files" v-model="isOpen" prevent-close>
    <UCard :ui="{
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Upload
            {{ `${files.length} ${files.length === 1 ? "file" : "files"}` }}
          </h3>
          <UButton color="gray" variant="ghost" icon="i-material-symbols:close-small" class="-my-1"
            @click="clearList" />
        </div>
      </template>

      <div>
        <UInput placeholder="Collection Name" v-if="isMultiple" v-model="collectionName" />
        <div class="mt-[10px]">
          <p v-for="(item, index) in files" :key="index">
            {{ index + 1 }}. {{ item.name }}

            <!--- {{ item.size }} -->
          </p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-[20px]">
          <UButton @click="send()">Upload</UButton>
          <UButton variant="soft" :disabled="!files" @click="clean()">
            Reset
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
const dropZoneRef = ref<HTMLDivElement>();
const { clearList, collectionName, files, isMultiple, isOpen, upload, isThereFile, sending } =
  useBookDetails();

// const sending = ref(false);
function onDrop() {
  isOpen.value = true;
  files.value = incomingDragFiles.value;
}

const { files: incomingDragFiles } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ["application/pdf"],
});

const {
  files: incomingBrowserFiles,
  open,
  reset,
  onChange,
} = useFileDialog({
  accept: "application/pdf",
});

onChange(() => {
  isOpen.value = true;
  files.value = incomingBrowserFiles.value;
});

function clean() {
  isOpen.value = false;
  clearList();
  reset();
}

function send() {
  upload()
}

useHead({
  title: 'Home',
  meta: [
    {
      name: "description",
      content: "This is the home page",
    },
  ],
});
</script>

<style scoped></style>
