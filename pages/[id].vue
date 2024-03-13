<template>
  <div>
    <div
      v-if="pages"
      class="grid"
      :class="[isLargeScreen ? 'grid-cols-[1fr_550px]' : '']"
    >
      <div ref="el" class="duration-300 h-screen overflow-y-auto">
        <div class="space-y-2 bg-gray-700/30 dark:bg-gray-900/90 p-2">
          <div
            v-if="renderComponent"
            v-for="page in pages"
            :key="page"
            class=""
          >
            <VuePDF
              text-layer
              ref="vuePDFRef"
              :pdf="pdf"
              fit-parent
              :page="page"
            >
              <div class="grid place-items-center h-screen">
                <UIcon
                  name="i-eos-icons:three-dots-loading"
                  class="text-primary-400 text-[100px]"
                />
              </div>
            </VuePDF>
          </div>
        </div>
      </div>
      <div v-if="isLargeScreen">
        <ChatSidebar
          v-if="!loadChat"
          :chatId="book.chatId!"
          :sourceId="book.sourceId!"
        />
      </div>

      <div v-else class="">
        <div
          class="fixed top-[10px] z-10"
          :class="[
            isSmallScreen
              ? 'right-[calc(30px-15px)] '
              : 'right-[calc(30px-0px)]',
          ]"
        >
          <UButton
            icon="i-ic:round-chat-bubble"
            label="Chat"
            @click="isOpen = true"
          />
        </div>

        <USlideover v-model="isOpen" prevent-close class="">
          <div
            class="flex items-center justify-between p-2 border-l dark:border-white border-gray-900 dark:bg-[#121212] bg-white"
          >
            <UButton
              color="gray"
              variant="ghost"
              icon="i-material-symbols:arrow-back-ios-new-rounded"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>

          <ChatSidebar
            v-if="!loadChat"
            :chatId="book.chatId!"
            :sourceId="book.sourceId!"
            class="h-[calc(100vh-56px)]"
          />
        </USlideover>
      </div>
    </div>
    <div v-else class="grid place-items-center h-[calc(100vh-20px)]">
      <UIcon
        name="i-eos-icons:three-dots-loading"
        class="text-primary-900 text-[100px]"
      />
    </div>  <div>
    <UModal v-model="openErrorPage" fullscreen>
      <div class="min-h-screen grid place-items-center">
        <UButton label="Reload" @click="retry" />
      </div>
    </UModal>
  </div>
  </div>

</template>

<script lang="ts" setup>
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import "@tato30/vue-pdf/style.css";

const isLargeScreen = useLargeScreen();
const isSmallScreen = useSmallScreen();
const book = useBookDetail();
const { hiddingNextPage } = useNotification();

const isOpen = ref(false);
hiddingNextPage();
const loadChat = computed(() => {
  console.log(book.value.sourceId, book.value.chatId);
  return false;
});

const pageKey = ref(true);

const renderComponent = ref(true);
const loaded = ref(false);

const toogleValue = useToogle();

watch(toogleValue, () => {
  reloadPDF();
});

const forceRender = async () => {
  // Here, we'll remove MyComponent
  renderComponent.value = false;

  // Then, wait for the change to get flushed to the DOM
  await nextTick();

  // Add MyComponent back in
  renderComponent.value = true;
};

function reloadPDF() {
  forceRender();
  // reloadKey.value++;
}

const el = ref(null);

useResizeObserver(el, (entries) => {
  reloadPDF();
});

useHead({
  title: book.value.label,
  meta: [
    {
      name: "description",
      content: "This is a book detail page",
    },
  ],
});

// const books = useLinks()

// const {notification} = useNotification()
// const book = await getBookDetail(id as string)

// async function getBookDetail(id: string) {

//     if (!books.value) {
//       notification({
//         id: "no_data",
//         description: "There was an error getting the data",
//         title: "No Data",
//       });
//       return {} as BookDetails;
//     }

//     let foundBook: BookDetails | undefined;

//     for (const book of books.value) {
//       if (book.collections && book.collections.length > 0) {
//         foundBook = book.collections.find((b) => b.id === id);
//         console.log(foundBook);

//         if (foundBook) {
//           break; // Exit the loop if the book is found within a collection
//         }
//       } else if (book.id === id) {
//         foundBook = book;
//         break; // Exit the loop if the book is found directly
//       }
//     }

//     if (!foundBook) {
//       notification({
//         id: id,
//         description: "There was an error getting the book",
//         title: "No Book",
//       });
//       return {} as BookDetails;
//     }
//     return foundBook;
//   }

const src = `${book.value.href}`;

const openErrorPage = ref(false);

const { pdf, pages } = usePDF(src, {
  onProgress: (e) => {
    loaded.value = e.loaded === e.total;
  },
  async onError(e) {
    // console.log(e);
    openErrorPage.value = true;
  },
});

async function retry() {
  // Here, we'll remove MyComponent
  pageKey.value = false;

  // Then, wait for the change to get flushed to the DOM
  await nextTick();

  // Add MyComponent back in
  pageKey.value = true;
  openErrorPage.value = false;
  window.location.reload()
  // await refreshNuxtData();
}

definePageMeta({
  middleware: ["source-id"],
});
</script>
