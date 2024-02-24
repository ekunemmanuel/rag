<template>
  <div>
    <!-- 
        -->
    <UAccordion
      :items="navItems"
      :ui="{
        wrapper: 'flex flex-col w-full',
        item: {
          padding: 'pt-0 pb-0',
        },
      }"
    >
      <template #default="{ item, index, open }">
        <UButton
          v-if="!item.collections"
          color="gray"
          variant="ghost"
          :to="item.href"
          class=""
          :ui="{ rounded: 'rounded-none', padding: { sm: 'p-[10px]' } }"
        >
          <span class="truncate">{{ item.label }}</span>
        </UButton>
        <UButton
          v-else
          color="gray"
          variant="ghost"
          class=""
          :ui="{ rounded: 'rounded-none', padding: { sm: 'p-[10px]' } }"
        >
          <template #leading>
            <div
              class="w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 flex items-center justify-center -my-1"
            >
              <UIcon
                :name="item.icon"
                class="w-4 h-4 text-white dark:text-gray-900"
              />
            </div>
          </template>

          <span class="truncate"> {{ item.label }}</span>

          <template #trailing>
            <UIcon
              name="i-heroicons-chevron-right-20-solid"
              class="w-5 h-5 ms-auto transform transition-transform duration-200"
              :class="[open && 'rotate-90']"
            />
            <UPopover
                :popper="{
                  arrow: true,
                  placement: 'right',
                  offsetDistance: 15,
                }"
              >
                <UButton trailing-icon="i-heroicons-sun-20-solid" />

                <template #panel>
                  <div class="p-8">more options</div>
                </template>
              </UPopover>
          </template>
        </UButton>
      </template>
      <template #item="{ item, index, open, close }">
        <div v-if="item.collections" class="pl-4">
          <NavItem :nav-items="item.collections" />
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  navItems: NavItem[];
}>();

interface NavItem {
  href: string;
  icon?: string;
  active?: boolean;
  label: string;
  // content?: string;
  collections?: NavItem[];
}
</script>

<style scoped></style>
