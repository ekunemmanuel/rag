<script setup lang="ts">
import type { BookDetails } from '~/types';

const { getBookDetails } = useBookDetails()

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const links = useLinks()

const data = await getBookDetails()
links.value = data


// const navItems: BookDetails[] = [
//   {
//     label: "Collection A",
//     icon: "i-heroicons-folder-20-solid",
//     collections: [
//       { label: "Anattendancesystemforexamsusingfacerecognition 1", icon: "", href: "./Anattendancesystemforexamsusingfacerecognition.pdf", id: "Anattendancesystemforexamsusingfacerecognition.pdf1", alias: "" },
//       { label: "Anattendancesystemforexamsusingfacerecognition.pdf 2", icon: "", href: "./Anattendancesystemforexamsusingfacerecognition.pdf", id: "Anattendancesystemforexamsusingfacerecognition.pdf2", alias: "" },
//       { label: "Anattendancesystemforexamsusingfacerecognition.pdf 3", icon: "", href: "./Anattendancesystemforexamsusingfacerecognition.pdf", id: "Anattendancesystemforexamsusingfacerecognition3", alias: "", },
//     ],
//     active: true,
//     id: "", alias: "",
//   },
//   {
//     label: "Collection B",
//     icon: "i-heroicons-folder-20-solid",
//     collections: [
//       { label: "Anattendancesystemforexamsusingfacerecognition", icon: "", href: "./Anattendancesystemforexamsusingfacerecognition.pdf", id: "Anattendancesystemforexamsusingfacerecognition", alias: "" },
//       { label: "Design 2", icon: "", href: "./design.pdf", id: "design2", alias: "" },
//       { label: "Design 3", icon: "", href: "./design.pdf", id: "design3", alias: "" },
//     ],
//     active: true, id: "", alias: ""
//   },

//   {
//     href: "./6.pdf",
//     label: "6.pdf",
//     icon: "i-heroicons-folder-20-solid", id: "6", alias: "6"
//   },
// ];

// links.value = navItems

// i want to update the width of the sidenav when the button is clicked
const emits = defineEmits(["width"]);
const toogle = ref(false);
function toogleWidth() {
  toogle.value = !toogle.value;

  emits("width", toogle.value);

}

</script>

<template>
  <div class="border-r dark:border-white border-gray-900 h-screen overflow-auto p-[10px]">
    <nav class="space-y-[10px]">
      <ClientOnly>
        <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
          " variant="ghost" aria-label="Theme" @click="isDark = !isDark" />
        <template #fallback>
          <div class="w-8 h-8" />
        </template>
      </ClientOnly>
      <br />
      <div class="flex justify-between gap-[10px] w-full">
        <UButton v-if="!toogle" class="flex-1" to="/"
          :ui="{ rounded: 'rounded-[5px]', padding: { sm: 'p-[5px] px-[10px]' } }">
          <span class="truncate">Home</span>
        </UButton>
        <UButton @click="toogleWidth"
          :icon="!toogle ? 'i-material-symbols:arrow-back-ios-new-rounded' : 'i-material-symbols:arrow-forward-ios-rounded'"
          variant="ghost" />
      </div>
      <NavItem v-if="!toogle" :navItems="links" />
    </nav>
  </div>
</template>
