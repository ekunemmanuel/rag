import { collection, doc, setDoc, type DocumentData } from "firebase/firestore";
import { ref as storageRef } from "firebase/storage";
export const useMyFirebase = () => {
  const db = useFirestore();
  const storage = useFirebaseStorage();
  const bookRef = storageRef(storage, "userId/library/");

  const todos = useCollection(collection(db, "books"));
  const someTodo = useDocument(doc(collection(db, "books"), "someId"));

  async function addBookDetails<T extends DocumentData>(id: string, data: T) {
    await setDoc(doc(db, "userId/library/books", id), data);
  }

  async function getBookDetails<T>() {
    const {
      // rename the Ref to something more meaningful
      data,
      // is the subscription still pending?
      pending,
      // did the subscription fail?
      error,
      // A promise that resolves or rejects when the initial state is loaded
      promise,
    } = useCollection(collection(db, "userId/library/books"));

    await promise.value;
    if (pending.value == false && error.value == undefined) {
      return data.value as T;
    }
    return [] as T;
  }

  function uploadFile(file: File) {
    const data = file;
    const {
      url,
      // gives you a percentage between 0 and 1 of the upload progress
      uploadProgress,
      uploadError,
      // firebase upload task
      uploadTask,
      upload,
      refresh,
    } = useStorageFile(storageRef(storage, `userId/library/${file.name}`));
    if (data) {
      refresh();
      upload(data);
      console.log(url.value);
    }
  }
  return {
    addBookDetails,
    getBookDetails,
    uploadFile,
  };
};

// TODO look into the upload file how to get the url quickly