<template>
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
        :to="item.id"
        exactActiveClass="bg-primary-900 dark:bg-primary-400"
        activeClass="text-primary-600 dark:text-primary-400"
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
          <div class="size-6 flex items-center justify-center">
            <UIcon
              :name="item.icon"
              color="gray"
              variant="ghost"
              class="size-4 text-white dark:text-gray-900"
            />
          </div>
        </template>

        <span class="truncate"> {{ item.label }}</span>

        <template #trailing>
          <UIcon
            name="i-heroicons-chevron-right-20-solid"
            class="size-4 ms-auto transform transition-transform duration-200"
            :class="[open && 'rotate-90']"
          />
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
              <UButton
                color="gray"
                variant="ghost"
                icon="i-ci:more-horizontal"
              />
            </UTooltip>

            <template #panel>
              <div class="p-8">more options</div>
            </template>
          </UPopover>
        </template>
      </UButton>
    </template>
    <template #item="{ item, index, open, close }">
      <div v-if="item.collections" class="">
        <NavItem :nav-items="item.collections" />
      </div>
    </template>
  </UAccordion>
</template>

<script lang="ts" setup>
import type { NavItem } from "~/types";

const props = defineProps<{
  navItems: NavItem[];
}>();
</script>

<style scoped></style>
