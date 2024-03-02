<template>
  <div class="grid place-items-center">
    <div
      ref="dropZoneRef"
      class="size-[500px] bg-primary-600 border-dashed border grid place-items-center"
    >
      Drop files here
      {{ isOverDropZone }}
      <div>
        <p v-for="(item, index) in files" :key="index">
          {{ item.name }}
          {{ item.size }}
        </p>
      </div>
    </div>
    <!-- <button type="button" @click="open()">Choose files</button>
    <button type="button" :disabled="!incomingBrowserFiles" @click="reset()">Reset</button>
    <template v-if="incomingBrowserFiles">
      <p>
        You have selected:
        <b>{{ `${incomingBrowserFiles.length} ${incomingBrowserFiles.length === 1 ? "file" : "files"}` }}</b>
      </p>
      <li v-for="file of incomingBrowserFiles" :key="file.name">
        {{ file.name }}
      </li>
    </template> -->
  </div>
</template>

<script lang="ts" setup>
const dropZoneRef = ref<HTMLDivElement>();

function onDrop(files: File[] | null) {
  // called when files are dropped on zone
  console.log(files);
}

const { isOverDropZone, files: incomingFiles } = useDropZone(dropZoneRef, {
  onDrop,
  // specify the types of data to be received.
  dataTypes: ["application/pdf"],
});

const {
  files: incomingBrowserFiles,
  open,
  reset,
  onChange,
} = useFileDialog({
  accept: "application/pdf", // Set to accept only image files
});

onChange((files) => {
  /** do something with files */
});

const files = ref<File[]>([]);
watch([incomingFiles, incomingBrowserFiles], ([newFiles, f]) => {
  if (!newFiles) return;
  if (!f) return;
  console.log(f);
  
  files.value = newFiles;
});
</script>

<style scoped></style>
