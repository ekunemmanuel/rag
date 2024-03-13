
<script setup lang="ts">
const { getBookDetails } = useBookDetails();
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const links = useLinks();

const data = await getBookDetails();
links.value = data;

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
const toogleValue = useToogle();
const toogle = ref(toogleValue.value);

function toogleWidth() {
  toogle.value = !toogle.value;
  toogleValue.value = toogle.value;
}

watch(toogleValue, (newVal) => {
  toogle.value = newVal;
});

const elFooter = ref(null);
const elHeader = ref(null);
const { height: footerHeight } = useElementSize(elFooter);
const { height: headerHeight } = useElementSize(elHeader);

const newHeight = computed(() => {
  return `h-[calc(100vh-${footerHeight.value + headerHeight.value}px)]`;
});
</script>

<template>
  <div
    class="border-r dark:border-white border-gray-900 overflow-y-auto flex flex-col z-50 dark:bg-[#121212] bg-white"
  >
    <nav class="mb-auto">
      <div ref="elHeader">
        <div
          class="p-[10px] flex justify-between gap-[10px] w-full"
          :class="[toogle ? 'flex-col' : 'flex-row']"
        >
          <UButton
            v-if="!toogle"
            class="flex-1 min-w-0"
            to="/"
            :ui="{
              rounded: 'rounded-[5px]',
              padding: { sm: 'px-[10px]' },
            }"
          >
            <span class="truncate">Home</span>
          </UButton>

          <UButton v-else to="/" icon="material-symbols:home-rounded" />

          <UButton
            @click="toogleWidth"
            :icon="
              !toogle
                ? 'i-material-symbols:arrow-back-ios-new-rounded'
                : 'i-material-symbols:arrow-forward-ios-rounded'
            "
            variant="ghost"
          />
        </div>
      </div>

      <div
        :class="[
          'overflow-y-auto px-[10px] py-[10px]',
          !toogle ? 'h-[calc(100vh-104px)]' : 'h-[calc(100vh-179px)]',
        ]"
      >
        <NavItem v-if="!toogle" :navItems="links" />
      </div>
    </nav>

    <div ref="elFooter" class="dark:bg-[#121212]">
      <div
        class="p-[10px] flex items-center"
        :class="[toogle ? 'flex-col' : 'flex-row']"
      >
        <div class="mr-auto flex-grow min-w-0">
          <nuxt-link class="space-x-2 flex items-center" to="profile">
            <UAvatar alt="Benjamin Canac" />
            <span v-if="!toogle" class="truncate">Emmanuel Apabiekn</span>
          </nuxt-link>
        </div>
        <ClientOnly>
          <UButton
            :icon="
              isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
            "
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
          />
          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
