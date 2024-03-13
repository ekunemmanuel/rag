import type { BookDetails } from "~/types";
import { v4 as uuidv4 } from "uuid";
export const useBookDetails = () => {
  const { notification } = useNotification();
  const { addData, uploadFile, getAllData, deleteData, deleteFile } = useMyFirebase();
  const files = ref<File[] | FileList | null>();
  const isOpen = ref(false);
  const collectionName = ref("New Folder");
  const sending = ref(false);
  const multipleFiles = ref<BookDetails>({
    id: "",
    label: "",
    collections: [],
    icon: "i-material-symbols-folder-rounded",
    alias: "",
  });
  const singleFile = ref<BookDetails>({
    id: "",
    label: "",
    href: "",
    alias: "",
  });
  const links = useLinks();

  const isThereFile = computed(() => {
    return files.value && files.value.length > 0;
  });
  const isMultiple = computed(() => {
    if (files.value instanceof FileList || files.value instanceof Array) {
      return files.value.length > 1;
    }

    return false;
  });

  async function upload() {
    if (!files.value) return;

    const fileList =
      files.value instanceof FileList ? Array.from(files.value) : files.value;

    // sending.value = true;
    if (isMultiple.value) {
      if (!collectionName.value) {
        notification({
          id: "no_collection_name",
          description: "Your collection must have a title",
          title: "No Collection Name",
        });
        return;
      }
      uploadMultipleFiles(fileList);
    } else {
      uploadSingleFile(fileList[0]);
    }
  }
  const filePath = "userId/library/files";
  const chatPath = "userId/library/chats";

  async function uploadSingleFile(file: File) {
    const id = uuidv4();
    const chatId = uuidv4();
    const alias = uuidv4();
    if (!file) return;
    sending.value = true;
    uploadFile(file, alias, filePath)
      .then((url) => {
        if (!url) {
          notification({
            id: "no_url",
            description: "There was an error uploading the file",
            title: "No URL",
          });
          return;
        }
        singleFile.value.href = url;
        singleFile.value.label = file.name;
        singleFile.value.id = id;
        singleFile.value.alias = alias;
        singleFile.value.chatId = chatId;
        addData(
          chatId,
          {
            messages: [],
          },
          chatPath
        );

        addData<BookDetails>(id, singleFile.value, filePath);
      })
      .then(async () => {
        links.value = await getBookDetails();

        clearList();
      });
  }

  async function uploadMultipleFiles(fileList: File[]) {
    const collectionNameValue = collectionName.value;
    if (!collectionNameValue) return;

    sending.value = true;

    const uploadPromises = fileList.map((file) => {
      if (!file) return Promise.resolve();
      const bookId = uuidv4();
      const alias = uuidv4();
      const chatId = uuidv4();

      return uploadFile(file, alias, filePath).then((url) => {
        if (!url) {
          notification({
            id: "no_url",
            description: "There was an error uploading the file",
            title: "No URL",
          });
          return;
        }
        const data: BookDetails = {
          id: bookId,
          label: file.name,
          alias,
          href: url,
          chatId,
        };

        addData(
          chatId,
          {
            messages: [],
          },
          chatPath
        );
        uploadToChatPdfApi("userId", bookId);

        multipleFiles.value.collections!.push(data);
      });
    });

    await Promise.all(uploadPromises);

    const id = uuidv4();
    multipleFiles.value.id = id;
    multipleFiles.value.label = collectionNameValue;
    multipleFiles.value.alias = collectionNameValue;
    addData<BookDetails>(id, multipleFiles.value, filePath).finally(() => {
      clearList();
    });
  }

  async function getBookDetail(id: string) {
    const data = await getAllData<BookDetails[]>(filePath);

    // await updateData(filePath, id, { label: "Research" });

    if (!data) {
      notification({
        id: "no_data",
        description: "There was an error getting the data",
        title: "No Data",
      });
      return {} as BookDetails;
    }

    let foundBook: BookDetails | undefined;

    for (const book of data) {
      if (book.collections && book.collections.length > 0) {
        foundBook = book.collections.find((b) => b.id === id);

        if (foundBook) {
          break; // Exit the loop if the book is found within a collection
        }
      } else if (book.id === id) {
        foundBook = book;
        break; // Exit the loop if the book is found directly
      }
    }

    if (!foundBook) {
      notification({
        id: id,
        description: "There was an error getting the book",
        title: "No Book",
      });
      navigateTo("/");
      return {} as BookDetails;
    }

    return foundBook;
  }

  function clearList() {
    isOpen.value = false;
    sending.value = false;
    files.value = [];
    collectionName.value = "New Folder";
    multipleFiles.value = {
      id: "",
      label: "",
      collections: [],
      icon: "i-material-symbols-folder-rounded",
      alias: "",
    };
    singleFile.value = {
      id: "",
      label: "",
      href: "",
      alias: "",
    };
  }

  async function getBookDetails() {
    const data = await getAllData<BookDetails[]>(filePath);
    if (!data) return [];
    data.sort((a, b) => {
      let dateA = a.createdAt!.toDate();
      let dateB = b.createdAt!.toDate();

      return dateB!.getTime() - dateA!.getTime();
    });

    return data;
  }

  async function uploadToChatPdfApi(userId: string, fileId: string) {
    try {
      await $fetch<{
        status: number;
        message: string;
        data: BookDetails;
      }>("/api/pdfApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          fileId,
          userId,
        },
        retry: 3,
      });
      await refreshNuxtData();
      return true;
    } catch (error) {
      return false;
    }
  }

  async function deleteFromChatPdfApi(sourceId: string) {
    try {
      const data = await $fetch("/api/pdfApi", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          sourceId,
        },
      });
      // console.log(data);

      return true;
    } catch (error) {
      return false;
    }
  }

  async function deleteBookDetails(id: string) {
    const data = await deleteData(filePath, id);

    // console.log(data);

    if (!data) {
      notification({
        id: "no_data",
        description: "There was an error deleting the data",
        title: "No Data",
      });
      return;
    }

    links.value = await getBookDetails();
    navigateTo("/");
  }

  async function deleteFileInStorage(alias:string) {
    try {
      await deleteFile(alias, filePath);
    } catch (error) {
      console.log(error);
      
    }
  }

  return {
    collectionName,
    multipleFiles,
    singleFile,
    isOpen,
    files,
    isMultiple,
    isThereFile,
    sending,
    upload,
    deleteFileInStorage,
    clearList,
    getBookDetails,
    getBookDetail,
    uploadToChatPdfApi,
    deleteFromChatPdfApi,
    deleteBookDetails,
  };
};
