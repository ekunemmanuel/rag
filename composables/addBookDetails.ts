import type { NavItem } from "~/types";
import { v4 as uuidv4 } from "uuid";
export const useAddBookDetails = () => {
  const config = useRuntimeConfig();
  const notification = useNotification();
  const { addBookDetails, uploadFile } = useMyFirebase();
  const files = ref<File[] | FileList | null>();
  const isOpen = ref(false);
  const isMultiple = computed(() => {
    if (files.value instanceof FileList || files.value instanceof Array) {
      return files.value.length > 1;
    }

    return false;
  });
  const collectionName = ref("New Folder");
  const multipleFiles = ref<NavItem>({
    id: "",
    label: "",
    collections: [],
    icon: "i-material-symbols-folder-rounded",
  });
  const singleFile = ref<NavItem>({
    id: "",
    label: "",
    href: "",
  });

  async function upload() {
    if (!files.value) return;

    const fileList =
      files.value instanceof FileList ? Array.from(files.value) : files.value;

    if (isMultiple.value) {
      if (!collectionName.value) {
        notification({
          id: "no_collection_name",
          description: "Your collection must have a title",
          title: "No Collection Name",
        });
        return;
      }
      multipleFiles.value.label = collectionName.value;
      uploadMultipleFiles(fileList);
      // links.value.push(multipleFiles.value);
    } else {
      uploadSingleFile(fileList[0]);
      // links.value.push(singleFile.value);
    }

    // const data: NavItem[] = getBookDetails();
    // links.value = data;

    clearList();
  }
  const bookPath = "userId/library/books";

  async function uploadSingleFile(file: File) {
    const id = uuidv4();
    if (!file) return;
    singleFile.value.href = href(file.name);
    singleFile.value.label = file.name;
    singleFile.value.id = id;
    uploadFile(file);

    addBookDetails(id, singleFile.value);
  }

  function uploadMultipleFiles(fileList: File[]) {
    for (let file of fileList) {
      if (!file || !collectionName.value) return;
      const bookId = uuidv4();
      multipleFiles.value.collections!.push({
        id: bookId,
        href: href(file.name),
        label: file.name,
      });
      uploadFile(file);
    }
    const id = uuidv4();
    multipleFiles.value.id = uuidv4();

    addBookDetails(id, multipleFiles.value);
  }

  function clearList() {
    isOpen.value = false;
    files.value = [];
    collectionName.value = "New Folder";
    multipleFiles.value = {
      id: "",
      label: "",
      collections: [],
      icon: "i-material-symbols-folder-rounded",
    };
    singleFile.value = {
      id: "",
      label: "",
    };
  }

  function href(name: string) {
    return `https://firebasestorage.googleapis.com/v0/b/${config.public.vuefire.config.projectId}/o/${bookPath}/${name}`;
  }

  return {
    collectionName,
    multipleFiles,
    singleFile,
    isOpen,
    files,
    isMultiple,
    upload,
    clearList,
  };
};
