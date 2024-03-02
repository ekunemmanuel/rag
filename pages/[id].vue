<template>
  <div class="grid grid-cols-[1fr,minmax(50px,350px)]">
    <!-- <iframe :src="src" frameborder="0" width="100%" height="100%"></iframe> -->
    <div class="h-screen overflow-auto w-full">
      <div class="space-y-2 bg-primary-950/50 p-2">
        <div v-for="page in pages" :key="page" class="bg-primary-950/50">
          <div>
          <VuePDF text-layer :pdf="pdf" fit-parent :page="page">
            <div class="grid place-items-center h-full">
              <UIcon  name="i-eos-icons:three-dots-loading" class="text-primary-900 size-[60px]" />
            </div>
          </VuePDF>
        </div>
        </div>
      </div>

    </div>
    <ChatSidebar />

  </div>
</template>

<script lang="ts" setup>
// import type { BookDetails } from '~/types';
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import '@tato30/vue-pdf/style.css';

const route = useRouter();

const { getBookDetail } = useBookDetails();
// const notification = useNotification()

const id = route.currentRoute.value.params.id;

const book = await getBookDetail(id as string);

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


const { pdf, pages, info } = usePDF(src)

console.log(info.value);


</script>

<style></style>
