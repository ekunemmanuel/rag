<template>
  <div
    class="grid"
    :class="[isLargeScreen ? 'grid-cols-[1fr_450px]' : 'grid-cols-1']"
  >
    <div ref="sectionRef" class="duration-300 h-screen overflow-auto w-full">
      <div class="space-y-2 bg-primary-950/50 min-h-screen p-2">
        <div v-if="!pages" class="grid place-items-center h-screen">
          <UIcon
            name="i-eos-icons:three-dots-loading"
            class="text-primary-900 size-[60px]"
          />
        </div>
        <div
          v-if="renderComponent"
          v-for="page in pages"
          :key="page"
          class="bg-primary-950/50"
        >
          <div>
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
                  class="text-primary-900 size-[60px]"
                />
              </div>
            </VuePDF>
          </div>
        </div>
      </div>
    </div>
    <ChatSidebar v-if="isLargeScreen" />

    <div v-if="!isLargeScreen">
      <div class="absolute top-[calc(30px-15px)] z-10" :class="[isSmallScreen ? 'right-[calc(30px-15px)] ' :'right-[calc(30px-0px)]']">
        <UButton
          icon="i-ic:round-chat-bubble"
          label="Chat"
          @click="isOpen = true"
        />
      </div>

      <USlideover v-model="isOpen" prevent-close>
        <div
          class="flex items-center justify-between p-2 border-l dark:border-white border-gray-900"
        >
          <UButton
            color="gray"
            variant="ghost"
            icon="i-material-symbols:arrow-back-ios-new-rounded"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>

        <ChatSidebar class="h-[calc(100vh-56px)]" />
      </USlideover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import "@tato30/vue-pdf/style.css";
const isLargeScreen = useLargeScreen();
const isMedScreen = useMediumScreen();
const isSmallScreen = useSmallScreen();

const route = useRouter();
const isOpen = ref(false);
const { getBookDetail } = useBookDetails();
const reloadKey = ref(0);

const id = route.currentRoute.value.params.id;

const book = await getBookDetail(id as string);

const renderComponent = ref(true);

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

const sectionRef = ref(null);
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.target === sectionRef.value) {
        reloadPDF();
      }
    }
  });

  if (sectionRef.value) {
    resizeObserver.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  if (resizeObserver && sectionRef.value) {
    resizeObserver.unobserve(sectionRef.value);
  }
});

useHead({
  title: book.label,
  meta: [
    {
      name: "description",
      content: "This is a book detail page",
    },
  ],
});

// const books = useLinks()

// const notification = useNotification()
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

const src = `${book.href}`;

const { pdf, pages } = usePDF(src);
</script>
