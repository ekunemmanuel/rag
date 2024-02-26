<script setup lang="ts">
import type { NavItem } from "~/types";

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const { getBookDetails } = useMyFirebase();
const links = useLinks();

const data = (await getBookDetails()) as NavItem[];
links.value = data;

// const navItems: NavItem[] = [
//   {
//     href: "#",
//     label: "Collection A",
//     icon: "i-heroicons-folder-20-solid",
//     collections: [
//       { label: "Collection 1", icon: "", href: "#" },
//       { label: "Collection 2", icon: "", href: "#" },
//       { label: "Collection 3", icon: "", href: "#" },
//     ],
//     active: true,
//   },
//   {
//     href: "#",
//     label: "Collection B",
//     icon: "i-heroicons-folder-20-solid",
//     collections: [
//       { label: "Collection 1", icon: "", href: "#" },
//       { label: "Collection 2", icon: "", href: "#" },
//       { label: "Collection 3", icon: "", href: "#" },

//       {
//         href: "#",
//         label: "Collection B1",
//         icon: "i-heroicons-folder-20-solid",
//         collections: [
//           {
//             label: "Collection 1",
//             icon: "",
//             href: "#",
//           },
//           {
//             label: "Collection 2A",
//             icon: "i-heroicons-folder-20-solid",

//             href: "#",
//             collections: [
//               {
//                 label: "Collection 1",
//                 icon: "",
//                 href: "#",
//               },
//               {
//                 label: "Collection 2",
//                 icon: "",
//                 href: "#",
//               },
//               {
//                 label: "Collection 3",
//                 icon: "",
//                 href: "#",
//               },
//             ],
//           },
//           {
//             label: "Collection 3",
//             icon: "",
//             href: "#",
//           },
//         ],
//         active: true,
//       },
//     ],
//     active: true,
//   },

//   {
//     href: "#",
//     label: "Collection C",
//     icon: "i-heroicons-folder-20-solid",
//   },
// ];

// const links = useState<NavItem[]>('links')

</script>
<template>
  <div
    class="border-r dark:border-white border-gray-900 h-screen overflow-auto px-4"
  >
    <nav class="space-y-4">
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
      <br />
      <UButton
        class="w-full"
        to="/"
        :ui="{ rounded: 'rounded-none', padding: { sm: 'p-[10px]' } }"
      >
        <span class="truncate">Home</span>
      </UButton>
      <NavItem :navItems="links" />
    </nav>
  </div>
</template>
