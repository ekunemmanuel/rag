<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

interface NavItem {
  label: string;
  href: string;
  icon?: string;
  active?: boolean;
  // content?: string;
  collections?: NavItem[];
}

const navItems: NavItem[] = [
  {
    href: "#",
    label: "Collection A",
    icon: "i-heroicons-folder-20-solid",
    collections: [
      { label: "Collection 1", icon: "", href: "#" },
      { label: "Collection 2", icon: "", href: "#" },
      { label: "Collection 3", icon: "", href: "#" },
    ],
    active: true,
  },
  {
    href: "#",
    label: "Collection B",
    icon: "i-heroicons-folder-20-solid",
    collections: [
      { label: "Collection 1", icon: "", href: "#" },
      { label: "Collection 2", icon: "", href: "#" },
      { label: "Collection 3", icon: "", href: "#" },

      {
        href: "#",
        label: "Collection B1",
        icon: "i-heroicons-folder-20-solid",
        collections: [
          {
            label: "Collection 1",
            icon: "",
            href: "#",
          },
          {
            label: "Collection 2A",
            icon: "i-heroicons-folder-20-solid",

            href: "#",
            collections: [
              {
                label: "Collection 1",
                icon: "",
                href: "#",
              },
              {
                label: "Collection 2",
                icon: "",
                href: "#",
              },
              {
                label: "Collection 3",
                icon: "",
                href: "#",
              },
            ],
          },
          {
            label: "Collection 3",
            icon: "",
            href: "#",
          },
        ],
        active: true,
      },
    ],
    active: true,
  },

  {
    href: "#",
    label: "Collection C",
    icon: "i-heroicons-folder-20-solid",
  },
];
</script>
<template>
  <div>
    <nav>
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

      <NavItem :navItems="navItems" />
    </nav>
  </div>
</template>
