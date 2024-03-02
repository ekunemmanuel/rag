<template>
  <UAccordion
    :items="navItems"
    :ui="{
      wrapper: 'flex flex-col w-full space-y-[10px]',
      item: {
        padding: 'pt-[0px] pb-0',
      },
    }"
  >
    <template #default="{ item, index, open }">
      <UButton
        v-if="!item.collections"
        variant="ghost"
        color="gray"
        :to="`${item.id}`"
        exactActiveClass="bg-primary-900 dark:bg-primary-400 ring-"
        activeClass="text-primary-600 dark:text-primary-400 ring-2 ring-primary-600 dark:ring-primary-400"
        class="duration-200 hover:dark:!bg-primary-950 hover:!bg-primary-50"
        :ui="{ padding: { sm: 'p-[10px]' } }"
      >
        <span class="truncate">{{ item.label }}</span>
      </UButton>
      <UButton
        v-else
        variant="ghost"
        color="gray"
        class="hover:dark:!bg-primary-950 hover:!bg-primary-50"
        exactActiveClass="bg-primary-900 dark:bg-primary-400 ring-"
        activeClass="text-primary-600 dark:text-primary-400 ring-2 ring-primary-600 dark:ring-primary-400"
        :ui="{ rounded: 'rounded-[10px]', padding: { sm: 'p-[5px]' } }"
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
      <div v-if="item.collections" class="space-y-[10px]">
        <NavItem :nav-items="item.collections" />
      </div>
    </template>
  </UAccordion>
</template>

<script lang="ts" setup>
import type { BookDetails } from "~/types";

const props = defineProps<{
  navItems: BookDetails[];
}>();
</script>

<style scoped></style>
